import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import { createDiscussion } from '@/lib/appwrite'; // Adjust the path if needed
import { useGlobalContext } from '@/context/GlobalProvider'; // Adjust the path if needed
import { useNavigation } from 'expo-router';

const CreateDiscussion = () => {
  const { user } = useGlobalContext(); // Access user from the global context
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const navigation = useNavigation();
  const { loading, isLogged } = useGlobalContext();

  const handleCreateDiscussion = async () => {
    if (!title || !content) {
      Alert.alert('Error', 'Please fill out all fields.');
      return;
    }

    if (!user || !user.$id) {
      Alert.alert('Error', 'User information is unavailable.');
      return;
    }

    try {
      const form = {
        title,
        content,
        postAuthor: user.username, // Username for display
        userId: user.$id, // User ID for linking
      };

      const response = await createDiscussion(form);
      Alert.alert('Success', 'Discussion created successfully!');
      console.log('Created Discussion:', response);

      // Optionally reset the form
      setTitle('');
      setContent('');
      navigation.navigate("DiscussionScreen");
    } catch (error) {
      console.error('Error creating discussion:', error);
      Alert.alert('Error', 'Failed to create discussion. Please try again.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Create a New Discussion</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter Title"
        value={title}
        onChangeText={setTitle}
      />

      <TextInput
        style={[styles.input, styles.textArea]}
        placeholder="Enter Content"
        value={content}
        onChangeText={setContent}
        multiline
        numberOfLines={4}
      />

      <TouchableOpacity
        style={styles.button}
        onPress={handleCreateDiscussion}
      >
        <Text style={styles.buttonText}>Create Discussion</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.floatingButtonReturn}
        onPress={() => navigation.goBack()}
      >
        <Text style={styles.buttonText}>Return</Text>
      </TouchableOpacity>
    </View>
  );
};

export default CreateDiscussion;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 12,
    marginBottom: 15,
    fontSize: 16,
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  button: {
    backgroundColor: '#037A6A',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  floatingButtonReturn: {
    position: 'absolute',
    bottom: 16,
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
});
