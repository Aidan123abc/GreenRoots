import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity } from 'react-native';
import { RouteProp, useRoute, useNavigation } from '@react-navigation/native';

interface EventDetailsRouteParams {
  EventDetails: {
    eventId: number;
  };
}

type EventDetailsRouteProp = RouteProp<EventDetailsRouteParams, 'EventDetails'>;

const EventDetails: React.FC = () => {
  const route = useRoute<EventDetailsRouteProp>();
  const navigation = useNavigation();
  const { eventId } = route.params;

  // Placeholder event details
  const event = {
    id: eventId,
    title: `Event ${eventId}`,
    description: `Details about Event ${eventId}.`,
    imageLink: '',
    postAuthor: 'Author Name',
    datePosted: '2024-12-22',
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
        <Image
          source={event.imageLink ? { uri: event.imageLink } : require('@/public/default_profile.jpg')}
          style={styles.image}
        />
        <Text style={styles.title}>{event.title}</Text>
        <Text style={styles.author}>Posted by: {event.postAuthor}</Text>
        <Text style={styles.date}>Posted on: {event.datePosted}</Text>
        <Text style={styles.description}>{event.description}</Text>
      </ScrollView>

      {/* Return Button */}
      <TouchableOpacity
        style={styles.floatingButtonReturn}
        onPress={() => navigation.goBack()} // Navigate back
      >
        <Text style={styles.buttonText}>Return</Text>
      </TouchableOpacity>

      {/* Floating Sign Button */}
      <TouchableOpacity
        style={styles.floatingButtonSign}
        onPress={() => console.log(`Sign Petition ID: ${eventId}`)}
      >
        <Text style={styles.buttonText}>Sign Petition</Text>
      </TouchableOpacity>
    </View>
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
  },
  floatingButtonReturn: {
    position: 'absolute', // Position relative to the screen
    bottom: 16, // Distance from the bottom edge
    left: 16, // Distance from the left edge
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 30,
    elevation: 3, // Shadow for Android
    shadowColor: '#000', // Shadow for iOS
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    backgroundColor: '#037A6A', // Default button color
  },
  floatingButtonSign: {
    position: 'absolute', // Position relative to the screen
    bottom: 16, // Distance from the bottom edge
    right: 16, // Distance from the right edge
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 30,
    elevation: 3, // Shadow for Android
    shadowColor: '#000', // Shadow for iOS
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    backgroundColor: '#037A6A', // Default button color
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default EventDetails;
