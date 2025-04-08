import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Colors } from '@/constants/Colors';

const UpcomingEvents = () => {
  const colorScheme = useColorScheme();
  const themeColors = Colors[colorScheme ?? 'light'];
  const darkGrayBackground = colorScheme === 'dark' ? '#2c2c2c' : themeColors.cardBackground;

  const eventsData = [
    {
      id: 1,
      title: 'Save the Rainforest and Protect Biodiversity Across the Globe',
      description: 'Join efforts to preserve our rainforests.',
      latitude: 33.4942,
      longitude: -111.9261,
      datePosted: '2024-01-21',
      postAuthor: 'Rainforest Alliance and Global Partners for Sustainability',
      numSpots: 100,
      numSpotsGotten: 80,
      imageLink: '',
      petitionLink: 'https://example.com/save-rainforest',
      location: 'Central Park',
      timeStart: '09:00',
      timeEnd: '13:00',
    },
    {
      id: 2,
      title: 'Protect Ocean Life and Advocate for Sustainable Policies',
      description: 'Support sustainable ocean policies.',
      latitude: 33.4976,
      longitude: -111.9291,
      datePosted: '2024-12-20',
      postAuthor: 'Marine Life Advocates Organization',
      numSpots: 100,
      numSpotsGotten: 80,
      imageLink: '',
      petitionLink: 'https://example.com/ocean-awareness',
      location: 'Beachfront Hall',
      timeStart: '11:00',
      timeEnd: '15:00',
    },
    {
      id: 3,
      title: 'Stop Plastic Pollution and Save the Environment',
      description: 'Reduce plastic waste to save the planet.',
      latitude: 33.4927,
      longitude: -111.9228,
      datePosted: '2024-12-18',
      postAuthor: 'Eco Warriors',
      numSpots: 200,
      numSpotsGotten: 150,
      imageLink: '',
      petitionLink: 'https://example.com/tree-planting',
      location: 'Town Square',
      timeStart: '10:00',
      timeEnd: '16:00',
    },
  ];

  const formatMonth = (dateString) => {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];
    const date = new Date(dateString);
    return months[date.getMonth()];
  };

  const formatDay = (dateString) => {
    const date = new Date(dateString);
    return date.getDate();
  };

  const truncateText = (text, maxLength) => {
    return text.length > maxLength ? `${text.substring(0, maxLength - 3)}...` : text;
  };

  return (
    <View style={[styles.container, { backgroundColor: darkGrayBackground }]}>
      <Text style={[styles.title, { color: themeColors.text }]}>Upcoming Events</Text>
      {eventsData.map((event) => (
        <View key={event.id} style={[styles.eventContainer, { borderBottomColor: themeColors.icon }]}>
          {/* Date Section */}
          <View style={styles.dateContainer}>
            <Text style={[styles.month, { color: themeColors.text }]}>{formatMonth(event.datePosted)}</Text>
            <Text style={[styles.day, { color: themeColors.text }]}>{formatDay(event.datePosted)}</Text>
          </View>
          {/* Divider */}
          <View style={[styles.divider, { backgroundColor: themeColors.icon }]} />
          {/* Event Info Section */}
          <View style={styles.infoContainer}>
            <View style={styles.textContainer}>
              <Text style={[styles.postAuthor, { color: themeColors.tint }]}>
                {truncateText(event.postAuthor, 24)}
              </Text>
              <Text style={[styles.eventTitle, { color: themeColors.text }]}>
                {truncateText(event.title, 36)}
              </Text>
            </View>
            <View style={styles.detailsContainer}>
              <Text style={[styles.timeRange, { color: themeColors.icon }]}>
                {event.timeStart} - {event.timeEnd}
              </Text>
              <Text style={[styles.location, { color: themeColors.icon }]}>{event.location}</Text>
            </View>
          </View>
        </View>
      ))}
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          console.log(`Navigating to: ${petitionLink}`);
        }}
      >
        <Text style={styles.buttonText}>Add Event</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 16,
    padding: 16,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    fontFamily: 'Inter',
    marginBottom: 16,
  },
  eventContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
  },
  dateContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
    width: 50,
  },
  month: {
    fontSize: 14,
    fontWeight: '600',
  },
  day: {
    fontSize: 20,
    fontWeight: '700',
  },
  divider: {
    width: 1,
    height: '80%',
    marginHorizontal: 8,
  },
  infoContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  textContainer: {
    flex: 2,
    marginRight: 8,
  },
  postAuthor: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 4,
  },
  eventTitle: {
    fontSize: 16,
    fontWeight: '700',
  },
  detailsContainer: {
    flex: 1,
    alignItems: 'flex-end',
  },
  timeRange: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 4,
  },
  location: {
    fontSize: 14,
    fontWeight: '400',
  },
  button: {
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 20,
    width: 200,
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: 16,
    backgroundColor: '#037A6A',
  },
  buttonText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#fff',
  },
});

export default UpcomingEvents;
