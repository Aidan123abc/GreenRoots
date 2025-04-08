import React, { useState, useCallback } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Colors } from '@/constants/Colors';
import { useNavigation } from 'expo-router';

type Comment = {
  $id: number;
  postAuthor: string;
  subject: string;
  datePosted: string;
  likes: number;
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
  const colorScheme = useColorScheme();
  const themeColors = Colors[colorScheme ?? 'light'];

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
    <View style={[styles.commentContainer, { backgroundColor: themeColors.cardBackground }]}>
      <Text style={[styles.commentAuthor, { color: themeColors.text }]}>{comment.authorName}</Text>
      <Text style={[styles.commentDate, { color: themeColors.icon }]}>{getTimeDifference(comment.datePosted)}</Text>
      <View style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}>
        <Text style={[styles.commentText, { color: themeColors.text, flex: 1 }]}>{comment.subject}</Text>
        <Text style={{
          color: themeColors.icon, fontSize: 14,
          marginLeft: 8,
        }}>{comment.likes} Likes</Text>
      </View>
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

  const colorScheme = useColorScheme();
  const navigation = useNavigation();
  const themeColors = Colors[colorScheme ?? 'light'];
  const darkGrayBackground = colorScheme === 'dark' ? '#2c2c2c' : themeColors.cardBackground;
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
    <View style={[styles.container, { backgroundColor: darkGrayBackground }]}>
      <View style={styles.header}>
        <Image
          source={imageLink ? { uri: imageLink } : defaultImage}
          style={styles.image}
        />
        <View style={styles.authorContainer}>
          <Text style={[styles.postAuthor, { color: themeColors.text }]}>{postAuthor}</Text>
          <Text style={[styles.datePosted, { color: themeColors.icon }]}>{timeDifference}</Text>
        </View>
      </View>
      <Text style={[styles.title, { color: themeColors.text }]}>{truncatedTitle}</Text>
      <Text style={[styles.description, { color: themeColors.text }]}>{truncatedDescription}</Text>
      <View style={styles.footer}>
        {comments && comments.length > 0 && ( // Render the button only if comments exist
          <TouchableOpacity
            onPress={() => setIsCommentsVisible((prev) => !prev)} // Toggle comments visibility
          >
            {isCommentsVisible ? (
              <Text style={[styles.comments, { color: themeColors.tint }]}>
                HIDE {numComments} COMMENTS
              </Text>
            ) : (
              <Text style={[styles.comments, { color: themeColors.tint }]}>
                VIEW {numComments} COMMENTS
              </Text>
            )}
          </TouchableOpacity>
        )}
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('DiscussionDetails', { discussionId: data.id })}
        >
          <Text style={styles.buttonText}>View</Text>
        </TouchableOpacity>
      </View>
      {isCommentsVisible && comments && comments.length > 0 && (
        <View style={[styles.commentsContainer, { backgroundColor: darkGrayBackground }]}>
          {comments
            .sort((a, b) => (b.likes ?? 0) - (a.likes ?? 0)) // Sort descending by likes
            .slice(0, 3) // Only show top 3
            .map((comment) => (
              <CommentComponent key={comment.$id} comment={comment} />
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
    borderRadius: 8,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 2,
    minHeight: 200,
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
  },
  datePosted: {
    fontSize: 12,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  description: {
    fontSize: 14,
    marginBottom: 2,
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
  },
  button: {
    backgroundColor: '#037A6A',
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 20,
    position: 'absolute',
    right: '8',
  },
  buttonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  commentsContainer: {
    marginTop: 12,
    padding: 12,
    borderRadius: 8,
  },
  commentContainer: {
    marginBottom: 8,
    padding: 8,
    borderRadius: 8,
  },
  commentAuthor: {
    fontWeight: 'bold',
    marginBottom: 4,
  },
  commentDate: {
    fontSize: 12,
    marginBottom: 4,
  },
  commentText: {
    fontSize: 14,
  },
});

export default DiscussionModule;
