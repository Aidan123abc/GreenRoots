import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native';

const UpcomingEvents = () => {
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

  const formatMonth = (dateString: string) => {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];
    const date = new Date(dateString);
    return months[date.getMonth()];
  };

  const formatDay = (dateString: string) => {
    const date = new Date(dateString);
    return date.getDate();
  };

  const truncateText = (text: string, maxLength: number) => {
    return text.length > maxLength ? `${text.substring(0, maxLength - 3)}...` : text;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Upcoming Events</Text>
      {eventsData.map((event) => (
        <View key={event.id} style={styles.eventContainer}>
          {/* Date Section */}
          <View style={styles.dateContainer}>
            <Text style={styles.month}>{formatMonth(event.datePosted)}</Text>
            <Text style={styles.day}>{formatDay(event.datePosted)}</Text>
          </View>
          {/* Divider */}
          <View style={styles.divider} />
          {/* Event Info Section */}
          <View style={styles.infoContainer}>
            <View style={styles.textContainer}>
              <Text style={styles.postAuthor}>
                {truncateText(event.postAuthor, 24)}
              </Text>
              <Text style={styles.eventTitle}>
                {truncateText(event.title, 36)}
              </Text>
            </View>
            <View style={styles.detailsContainer}>
              <Text style={styles.timeRange}>
                {event.timeStart} - {event.timeEnd}
              </Text>
              <Text style={styles.location}>{event.location}</Text>
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
    paddingHorizontal: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    fontFamily: 'Inter',
    marginBottom: 16,
  },
  eventContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
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
    color: '#555',
  },
  day: {
    fontSize: 20,
    fontWeight: '700',
    color: '#000',
  },
  divider: {
    width: 1,
    height: '80%',
    backgroundColor: '#ddd',
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
    color: '#19708D',
    marginBottom: 4,
  },
  eventTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#333',
  },
  detailsContainer: {
    flex: 1,
    alignItems: 'flex-end',
  },
  timeRange: {
    fontSize: 14,
    fontWeight: '600',
    color: '#555',
    marginBottom: 4,
  },
  location: {
    fontSize: 14,
    fontWeight: '400',
    color: '#777',
  },
  button: {
    backgroundColor: '#037A6A',
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 20,
    width: 200,
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: 16,
  },
  buttonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
});

export default UpcomingEvents;
