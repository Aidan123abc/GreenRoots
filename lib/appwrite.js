import {
  Account,
  Avatars,
  Client,
  Databases,
  ID,
  Query,
  Storage,
} from "react-native-appwrite";

export const appwriteConfig = {
  endpoint: "https://cloud.appwrite.io/v1",
  platform: "com.greenrootsapp.greenroots",
  projectId: "6774867c0025b7402f51",
  storageId: "677491ca000b2123a9f9",
  databaseId: "67748c8c001887526a58",
  userCollectionId: "67748cd7003d553a2f8f",
  discussionCollectionId: "677d9869001992e2f9ba",
  commentCollectionId: "6778465a001271787890",
};

const client = new Client();

client
  .setEndpoint(appwriteConfig.endpoint)
  .setProject(appwriteConfig.projectId)
  .setPlatform(appwriteConfig.platform);

const account = new Account(client);
const storage = new Storage(client);
const avatars = new Avatars(client);
const databases = new Databases(client);


export async function createUser(email, password, username) {
  try {
    const newAccount = await account.create(
      ID.unique(),
      email,
      password,
      username
    );

    if (!newAccount) throw Error;

    const avatarUrl = avatars.getInitials(username);

    await signIn(email, password);

    const newUser = await databases.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      ID.unique(),
      {
        accountId: newAccount.$id,
        email: email,
        username: username,
        avatar: avatarUrl,
      }
    );

    return newUser;
  } catch (error) {
    throw new Error(error);
  }
}

export async function signIn(email, password) {
  try {
    const session = await account.createEmailPasswordSession(email, password);

    return session;
  } catch (error) {
    throw new Error(error);
  }
}

export async function signOut() {
  try {
    const session = await account.deleteSession("current");

    return session;
  } catch (error) {
    throw new Error(error);
  }
}


export async function getCurrentUser() {
  try {
    const currentAccount = await getAccount();
    if (!currentAccount) throw Error;

    const currentUser = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      [Query.equal("accountId", currentAccount.$id)]
    );

    if (!currentUser) throw Error;

    return currentUser.documents[0];
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function getAccount() {
  try {
    const currentAccount = await account.get();

    return currentAccount;
  } catch (error) {
    throw new Error(error);
  }
}

export async function hasActiveSession() {
  try {
    // Fetch all active sessions for the current user
    const sessions = await account.listSessions();
    // Check if there's at least one active session
    return sessions.sessions.length > 0;
  } catch (error) {
    return false;
  }
}

// Discussion Logic

export async function getAllDiscussions() {
  try {
    const posts = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.discussionCollectionId
    );
    return posts.documents;
  } catch (error) {
    throw new Error(error);
  }
}

export async function getAllDiscussionsWithComments() {
  try {
    const posts = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.discussionCollectionId
    );

    const discussionsWithComments = await Promise.all(
      posts.documents.map(async (discussion) => {
        const comments = await getCommentsByDiscussionId(discussion.$id);
        return {
          ...discussion,
          comments: comments,
        };
      })
    );

    return discussionsWithComments;
  } catch (error) {
    console.error("Error fetching discussions with comments:", error);
    throw new Error(error);
  }
}

export async function createDiscussion(form) {
  try {
    const newDiscussion = await databases.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.discussionCollectionId,
      ID.unique(), // Automatically assign a unique ID for the document
      {
        postAuthor: form.postAuthor,
        title: form.title,
        users: form.userId,
        content: form.content,
        posted: new Date().toISOString(),
      },
    );

    return newDiscussion;
  } catch (error) {
    console.error('Error creating discussion:', error);
    throw new Error(error);
  }
}


export async function getDiscussionById(discussionId) {
  try {
    const discussion = await databases.getDocument(
      appwriteConfig.databaseId,
      appwriteConfig.discussionCollectionId,
      discussionId
    );

    return {
      ...discussion,
    };
  } catch (error) {
    console.error('Error fetching discussion by ID:', error);
    throw new Error(error);
  }
}

export async function createComment({ discussionId, subject }) {
  try {
    const user = await getCurrentUser();
    if (!user) throw new Error('User must be logged in to comment.');

    const newComment = await databases.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.commentCollectionId,
      ID.unique(),
      {
        subject,
        datePosted: new Date().toISOString(),
        likes: 0,
        authorName: user.username,
        users: user.$id,
        discussions: discussionId,
      }
    );

    return newComment;
  } catch (error) {
    console.error('Error creating comment:', error);
    throw new Error(error.message || 'Failed to create comment');
  }
}

export async function deleteComment(commentId) {
  try {
    await databases.deleteDocument(
      appwriteConfig.databaseId,
      appwriteConfig.commentCollectionId,
      commentId
    );
    return true;
  } catch (error) {
    console.error('Error deleting comment:', error);
    throw new Error(error.message || 'Failed to delete comment');
  }
}

export async function updateComment(commentId, updates) {
  try {
    const updatedComment = await databases.updateDocument(
      appwriteConfig.databaseId,
      appwriteConfig.commentCollectionId,
      commentId,
      updates
    );
    return updatedComment;
  } catch (error) {
    console.error('Error updating comment:', error);
    throw new Error(error.message || 'Failed to update comment');
  }
}

export async function toggleLikeOnComment(comment, currentUser) {
  const username = currentUser.username;
  const likedUsers = comment.liked_users || [];
  let updatedLikes = comment.likes || 0;

  const userHasLiked = likedUsers.includes(username);

  let updatedLikedUsers;

  if (userHasLiked) {
    // Unlike: remove username, decrement like count
    updatedLikedUsers = likedUsers.filter((name) => name !== username);
    updatedLikes -= 1;
  } else {
    // Like: add username, increment like count
    updatedLikedUsers = [...likedUsers, username];
    updatedLikes += 1;
  }

  const updated = await updateComment(comment.$id, {
    liked_users: updatedLikedUsers,
    likes: updatedLikes,
  });

  return updated;
}