import React, { useEffect, useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import { RouteProp, useRoute, useNavigation } from '@react-navigation/native';
import { getDiscussionById, createComment, getCurrentUser, deleteComment, updateComment } from '@/lib/appwrite';
import CommentInput from '../commentInput';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import CommentCard from '../CommentCard';

interface DiscussionDetailsRouteParams {
  DiscussionDetails: {
    discussionId: string;
  };
}

type DiscussionDetailsRouteProp = RouteProp<
  DiscussionDetailsRouteParams,
  'DiscussionDetails'
>;

const DiscussionDetails: React.FC = () => {
  const route = useRoute<DiscussionDetailsRouteProp>();
  const navigation = useNavigation();
  const { discussionId } = route.params;

  const [discussion, setDiscussion] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [showCommentInput, setShowCommentInput] = useState(false);
  const [commentText, setCommentText] = useState('');
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [selectedCommentId, setSelectedCommentId] = useState<string | null>(null);
  const [showOptionsModal, setShowOptionsModal] = useState(false);
  const [isEditing, setIsEditingComment] = useState(false);
  const [editingCommentText, setEditingCommentText] = useState('');
  const inputRef = useRef<any>(null);



  useEffect(() => {
    const fetchDiscussion = async () => {
      try {
        const data = await getDiscussionById(discussionId);
        setDiscussion(data);
      } catch (error) {
        console.error('Failed to fetch discussion:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDiscussion();
    fetchUser();
  }, [discussionId]);

  const fetchUser = async () => {
    try {
      const user = await getCurrentUser();
      setCurrentUser(user);
    } catch (err) {
      console.error('Failed to fetch current user:', err);
    }
  };

  const getTimeDifference = (date: string) => {
    const currentDate = new Date();
    const postedDate = new Date(date);
    const diffInSeconds = Math.floor((currentDate.getTime() - postedDate.getTime()) / 1000);

    const timeMap = [
      { unit: 'year', seconds: 31536000 },
      { unit: 'month', seconds: 2592000 },
      { unit: 'week', seconds: 604800 },
      { unit: 'day', seconds: 86400 },
      { unit: 'hour', seconds: 3600 },
      { unit: 'minute', seconds: 60 },
    ];

    for (const { unit, seconds } of timeMap) {
      const diff = Math.floor(diffInSeconds / seconds);
      if (diff >= 1) {
        return `Posted ${diff} ${unit}${diff > 1 ? 's' : ''} ago`;
      }
    }

    return 'Posted just now';
  };

  const handleCommentUpdate = (updatedComment: any) => {
    setDiscussion((prev: any) => ({
      ...prev,
      comments: prev.comments.map((comment: any) =>
        comment.$id === updatedComment.$id ? updatedComment : comment
      ),
    }));
  };

  const handleDelete = async () => {
    try {
      if (!selectedCommentId) return;

      await deleteComment(selectedCommentId);

      // Remove the comment from local state
      setDiscussion((prev: any) => ({
        ...prev,
        comments: prev.comments.filter(
          (comment: any) => comment.$id !== selectedCommentId
        ),
      }));

      setShowOptionsModal(false);
      setSelectedCommentId(null);
    } catch (error) {
      console.error('Error deleting comment:', error);
    }
  };

  const publishComment = async () => {
    const text = commentText.trim();
    if (!text) return;

    try {
      if (isEditing && selectedCommentId) {
        const updated = await updateComment(selectedCommentId, {
          subject: text,
        });

        setDiscussion((prev: any) => ({
          ...prev,
          comments: prev.comments.map((comment: any) =>
            comment.$id === updated.$id ? updated : comment
          ),
        }));
      } else {
        const newComment = await createComment({
          discussionId: discussion.$id,
          subject: text,
        });

        setDiscussion((prev: any) => ({
          ...prev,
          comments: [newComment, ...prev.comments],
        }));
      }

      // Reset input state
      setCommentText('');
      setIsEditingComment(false);
      setSelectedCommentId(null);
      Keyboard.dismiss();
    } catch (err) {
      console.error('Error publishing comment:', err);
    }
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#037A6A" />
      </View>
    );
  }

  if (!discussion) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Discussion not found</Text>
      </View>
    );
  }

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 135 : 0}
    >
      <View style={styles.container}>
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
        >
          <Image
            source={
              discussion.imageLink
                ? { uri: discussion.imageLink }
                : require('@/public/default_profile.jpg')
            }
            style={styles.image}
          />
          <Text style={styles.title}>{discussion.title}</Text>
          <Text style={styles.author}>Posted by: {discussion.postAuthor}</Text>
          <Text style={styles.date}>
            Posted: {getTimeDifference(discussion.datePosted || discussion.posted)}
          </Text>
          <Text style={styles.description}>
            {discussion.description || discussion.content}
          </Text>

          <Text style={styles.commentsTitle}>Comments:</Text>
          {discussion.comments.length === 0 ? (
            <Text style={styles.noComments}>No comments yet.</Text>
          ) : (
            discussion.comments
              .sort(
                (a: any, b: any) =>
                  new Date(b.datePosted).getTime() - new Date(a.datePosted).getTime()
              )
              .map((comment: any) => (
                <CommentCard
                  key={comment.$id}
                  comment={comment}
                  currentUser={currentUser}
                  getTimeDifference={getTimeDifference}
                  onOptionsPress={(id) => {
                    setSelectedCommentId(id);
                    setShowOptionsModal(true);
                  }}
                  onCommentUpdate={handleCommentUpdate}
                />
              )))}
        </ScrollView>

        <TouchableOpacity style={styles.floatingButtonReturn} onPress={() => navigation.goBack()}>
          <Text style={styles.buttonText}>Return</Text>
        </TouchableOpacity>

        {/* Modular Comment Input */}
        <CommentInput
          ref={inputRef}
          visible={true}
          value={commentText}
          onChange={setCommentText}
          onSubmit={publishComment}
          onClose={() => Keyboard.dismiss()}
        />
        {showOptionsModal && (
          <View style={styles.modalOverlay}>
            <View style={styles.modalContainer}>
              <TouchableOpacity
                style={styles.modalButton}
                onPress={() => {
                  const commentToEdit = discussion.comments.find(
                    (c: any) => c.$id === selectedCommentId
                  );
                  if (commentToEdit) {
                    setEditingCommentText(commentToEdit.subject);
                    setCommentText(commentToEdit.subject);
                    setIsEditingComment(true);
                    setShowOptionsModal(false);

                    // Show keyboard after modal closes
                    setTimeout(() => {
                      inputRef.current?.focus();
                    }, 150);
                  }
                }}
              >
                <Text style={styles.modalButtonText}>Edit</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.modalButton, { borderTopWidth: 1, borderColor: '#ddd' }]}
                onPress={handleDelete}
              >
                <Text style={[styles.modalButtonText, { color: 'red' }]}>Delete</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => setShowOptionsModal(false)}
                style={styles.modalCancel}
              >
                <Text style={styles.modalCancelText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 120,
    flexGrow: 1,
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 8,
    marginBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  author: {
    fontSize: 16,
    color: '#555',
    marginBottom: 4,
  },
  date: {
    fontSize: 14,
    color: '#777',
    marginBottom: 16,
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 16,
  },
  commentsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  noComments: {
    fontStyle: 'italic',
    color: '#888',
    marginBottom: 16,
  },
  floatingButtonReturn: {
    position: 'absolute',
    bottom: 70,
    left: 16,
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 30,
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    backgroundColor: '#037A6A',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  errorText: {
    fontSize: 16,
    color: '#d00',
    textAlign: 'center',
    marginTop: 20,
  },
  modalOverlay: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  modalContainer: {
    backgroundColor: '#fff',
    width: '90%',
    marginBottom: 40,
    borderRadius: 12,
    overflow: 'hidden',
    elevation: 5,
  },
  modalButton: {
    padding: 16,
  },
  modalButtonText: {
    fontSize: 16,
    textAlign: 'center',
  },
  modalCancel: {
    padding: 16,
  },
  modalCancelText: {
    textAlign: 'center',
    color: '#037A6A',
    fontWeight: 'bold',
  },
});

export default DiscussionDetails;
