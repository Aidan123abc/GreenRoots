import React, { useEffect, useState, useCallback } from 'react';
import { View, ScrollView, StyleSheet, Text, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Colors } from '@/constants/Colors';
import DiscussionModule from '@/components/discussionModule/discussionModule';
import { getAllDiscussions  } from '@/lib/appwrite'; // Import the function to fetch discussions
import { useFocusEffect } from '@react-navigation/native';


const Discussions = () => {
  const [discussions, setDiscussions] = useState([]);
  const [loading, setLoading] = useState(true);

  const colorScheme = useColorScheme();
  const themeColors = Colors[colorScheme ?? 'light'];
  const navigation = useNavigation();

  useFocusEffect(
    useCallback(() => {
      const fetchDiscussions = async () => {
        try {
          const data = await getAllDiscussions();
          setDiscussions(data); // Now each discussion has a `.comments` array
          // console.log("Discussion Data:", JSON.stringify(data, null, 2));
        } catch (error) {
          console.error('Error fetching discussions:', error);
        } finally {
          setLoading(false);
        }
      };

      fetchDiscussions();
    }, [])
  );

  useEffect(() => {
    const fetchDiscussions = async () => {
      try {
        const data = await getAllDiscussions();
        setDiscussions(data); // Now each discussion has a `.comments` array
        // console.log("Discussion Data:", JSON.stringify(data, null, 2));
      } catch (error) {
        console.error('Error fetching discussions:', error);
      } finally {
        setLoading(false);
      }
    };
  
    fetchDiscussions();
  }, []);

  return (
    <View style={[styles.container, { backgroundColor: themeColors.background }]}>
      <ScrollView style={[styles.scrollContainer, { backgroundColor: themeColors.background }]}>
        <View style={styles.header}>
          <Text style={[styles.title, { color: themeColors.text }]}>Discussions</Text>
          <Ionicons name="chatbubbles" size={24} color={themeColors.icon} style={styles.icon} />
        </View>

        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('CreateDiscussion')}
        >
          <Text style={styles.buttonText}>New Discussion</Text>
        </TouchableOpacity>

        {loading ? (
          <ActivityIndicator size="large" color={themeColors.tint} style={styles.loading} />
        ) : discussions.length > 0 ? (
          discussions.map((discussion) => (
            <DiscussionModule
              key={discussion.$id} // Use Appwrite's unique document ID
              data={{
                id: discussion.$id,
                title: discussion.title,
                postAuthor: discussion.postAuthor,
                datePosted: discussion.posted,
                description: discussion.content,
                comments: discussion.comments,
              }}
              onPress={() =>
                navigation.navigate('DiscussionDetails', { discussionId: discussion.$id })
              }
            />
          ))
        ) : (
          <Text style={[styles.noData, { color: themeColors.text }]}>No discussions available.</Text>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  icon: {
    marginLeft: 8,
  },
  scrollContainer: {
    flex: 1,
    padding: 16,
  },
  button: {
    backgroundColor: '#037A6A',
    width: '60%',
    alignSelf: 'center',
    alignItems: 'center',
    marginBottom: 20,
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  loading: {
    marginTop: 50,
  },
  noData: {
    textAlign: 'center',
    marginTop: 50,
    fontSize: 16,
  },
});

export default Discussions;
