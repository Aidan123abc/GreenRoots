import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';

type Comment = {
  id: number;
  postAuthor: string;
  comment: string;
  datePosted: string;
};

type DiscussionData = {
  id: number;
  title: string;
  datePosted: string;
  postAuthor: string;
  description: string;
  imageLink?: string; // Optional to allow for default
  numComments: number;
  comments: Comment[];
};

type DiscussionModuleProps = {
  data: DiscussionData;
  onPress: () => void; // Navigation handler
};

const CommentComponent: React.FC<{ comment: Comment }> = ({ comment }) => {
  const getTimeDifference = (date: string) => {
    const currentDate = new Date();
    const postedDate = new Date(date);
    const diffInSeconds = Math.floor((currentDate.getTime() - postedDate.getTime()) / 1000);

    const timeMap = [
      { unit: 'year', seconds: 31536000 },
      { unit: 'month', seconds: 2592000 },
      { unit: 'week', seconds: 604800 },
      { unit: 'day', seconds: 86400 },
    ];

    for (const { unit, seconds } of timeMap) {
      const diff = Math.floor(diffInSeconds / seconds);
      if (diff >= 1) {
        return `${diff} ${unit}${diff > 1 ? 's' : ''} ago`;
      }
    }
    return 'Today';
  };

  return (
    <View style={styles.commentContainer}>
      <Text style={styles.commentAuthor}>{comment.postAuthor}</Text>
      <Text style={styles.commentDate}>{getTimeDifference(comment.datePosted)}</Text>
      <Text style={styles.commentText}>{comment.comment}</Text>
    </View>
  );
};

const DiscussionModule: React.FC<DiscussionModuleProps> = ({ data, onPress }) => {
  const [isCommentsVisible, setIsCommentsVisible] = useState(false);

  const {
    title,
    datePosted,
    postAuthor,
    description,
    imageLink,
    numComments,
    comments,
  } = data;

  const defaultImage = require('@/public/default_profile.jpg');

  const getTimeDifference = (date: string) => {
    const currentDate = new Date();
    const postedDate = new Date(date);
    const diffInSeconds = Math.floor((currentDate.getTime() - postedDate.getTime()) / 1000);

    const timeMap = [
      { unit: 'year', seconds: 31536000 },
      { unit: 'month', seconds: 2592000 },
      { unit: 'week', seconds: 604800 },
      { unit: 'day', seconds: 86400 },
    ];

    for (const { unit, seconds } of timeMap) {
      const diff = Math.floor(diffInSeconds / seconds);
      if (diff >= 1) {
        return `${diff} ${unit}${diff > 1 ? 's' : ''} ago`;
      }
    }
    return 'Today';
  };

  const truncatedTitle = title.length > 29 ? title.substring(0, 26) + '...' : title;
  const truncatedDescription =
    description.length > 100 ? description.substring(0, 97) + '...' : description;

  const timeDifference = getTimeDifference(datePosted);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image
          source={imageLink ? { uri: imageLink } : defaultImage}
          style={styles.image}
        />
        <View style={styles.authorContainer}>
          <Text style={styles.postAuthor}>{postAuthor}</Text>
          <Text style={styles.datePosted}>{timeDifference}</Text>
        </View>
      </View>
      <Text style={styles.title}>{truncatedTitle}</Text>
      <Text style={styles.description}>{truncatedDescription}</Text>
      <View style={styles.footer}>
        <TouchableOpacity
          onPress={() => setIsCommentsVisible((prev) => !prev)} // Toggle comments visibility
        >
          {isCommentsVisible ? <Text style={styles.comments}>HIDE {numComments} COMMENTS</Text> : <Text style={styles.comments}>VIEW {numComments} COMMENTS</Text>}
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={onPress}
        >
          <Text style={styles.buttonText}>View</Text>
        </TouchableOpacity>
      </View>
      {isCommentsVisible && (
        <View style={styles.commentsContainer}>
          {comments.map((comment) => (
            <CommentComponent key={comment.id} comment={comment} />
          ))}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
    padding: 16,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 2,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#ddd',
    marginRight: 12,
  },
  authorContainer: {
    flex: 1,
  },
  postAuthor: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  datePosted: {
    fontSize: 12,
    color: '#666',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  description: {
    fontSize: 14,
    marginBottom: 2,
    color: '#444',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
  },
  comments: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#19708D',
  },
  button: {
    backgroundColor: '#037A6A',
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  commentsContainer: {
    marginTop: 12,
    padding: 12,
    backgroundColor: '#fff',
    borderRadius: 8,
  },
  commentContainer: {
    marginBottom: 8,
    padding: 8,
    backgroundColor: '#fff',
  },
  commentAuthor: {
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  commentDate: {
    fontSize: 12,
    color: '#666',
    marginBottom: 4,
  },
  commentText: {
    fontSize: 14,
    color: '#444',
  },
});

export default DiscussionModule;
