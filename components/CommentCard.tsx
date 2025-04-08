// components/CommentCard.tsx
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { updateComment, deleteComment } from '@/lib/appwrite';

import { toggleLikeOnComment } from '@/lib/appwrite';

interface CommentCardProps {
    comment: any;
    currentUser: any;
    getTimeDifference: (date: string) => string;
    onOptionsPress: (id: string) => void;
    onCommentUpdate?: (updatedComment: any) => void;
    onCommentDelete?: (id: string) => void;
}

const CommentCard: React.FC<CommentCardProps> = ({
    comment,
    currentUser,
    getTimeDifference,
    onOptionsPress,
    onCommentUpdate,
    onCommentDelete,
}) => {
    const [likes, setLikes] = useState(comment.likes || 0);
    const [liked, setLiked] = useState(() => {
        return currentUser && comment?.liked_users?.includes(currentUser.username);
    });

    useEffect(() => {
        if (currentUser && comment?.liked_users) {
          setLiked(comment.liked_users.includes(currentUser.username));
        }
      }, [comment?.liked_users, currentUser?.username]);

    const handleToggleLike = async () => {
        try {
            const updated = await toggleLikeOnComment(comment, currentUser);

            setLiked(updated.liked_users.includes(currentUser.username));
            setLikes(updated.likes);

            if (onCommentUpdate) onCommentUpdate(updated);
        } catch (error) {
            console.error('Error toggling like:', error);
        }
    };

    return (
        <View style={styles.commentContainer}>
            <View style={{ flex: 1 }}>
                <Text style={styles.commentAuthor}>{comment.authorName}</Text>
                <Text style={styles.commentDate}>{getTimeDifference(comment.datePosted)}</Text>
                <Text style={styles.commentText}>{comment.subject}</Text>
            </View>
            <View style={styles.rightCommentCol}>
                <TouchableOpacity onPress={handleToggleLike} style={styles.likebutton}>
                    <FontAwesome
                        name={liked ? 'heart' : 'heart-o'}
                        size={20}
                        color={liked ? '#444' : '#888'}
                    />
                </TouchableOpacity>
                <Text style={styles.commentLikes}>{likes}</Text>

                {currentUser?.$id === comment.users?.$id && (
                    <TouchableOpacity
                        style={styles.optionsButton}
                        onPress={() => onOptionsPress(comment.$id)}
                    >
                        <Text style={styles.optionsText}>⋮</Text>
                    </TouchableOpacity>
                )}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    commentContainer: {
        marginBottom: 16,
        padding: 8,
        backgroundColor: '#f9f9f9',
        borderRadius: 8,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    commentAuthor: {
        fontWeight: 'bold',
        marginBottom: 4,
    },
    commentDate: {
        fontSize: 12,
        color: '#777',
        marginBottom: 4,
    },
    commentText: {
        fontSize: 14,
    },
    rightCommentCol: {
        flexDirection: 'row',
        alignItems: 'flex-end',
        justifyContent: 'flex-end',
        paddingLeft: 12,
        gap: 4,
    },
    likebutton: {
        paddingVertical: 10,
    },
    commentLikes: {
        fontSize: 18,
        color: '#888',
        padding: 8,
    },
    optionsButton: {
        padding: 6,
    },
    optionsText: {
        fontSize: 24,
        color: '#555',
    },
});

export default CommentCard;
