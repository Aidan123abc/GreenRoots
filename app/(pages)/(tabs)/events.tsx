import React, { useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import MapComponent from '@/components/eventModule/Map';
import EventsList from '@/components/eventModule/EventList';
import ScrollUpOverlay from '@/components/ScrollUp';

const eventsData = [
  {
    id: 1,
    title: 'Save the Rainforest',
    description: 'Join efforts to preserve our rainforests.',
    latitude: 33.4942,
    longitude: -111.9261,
    datePosted: '2024-1-21',
    postAuthor: 'Rainforest Alliance',
    numSpots: 100,
    numSpotsGotten: 80,
    imageLink: '',
    petitionLink: 'https://example.com/save-rainforest',
  },
  {
    id: 2,
    title: 'Protect Ocean Life',
    description: 'Support sustainable ocean policies.',
    latitude: 33.4976,
    longitude: -111.9291,
    datePosted: '2024-12-20',
    postAuthor: 'Marine Life Advocates',
    numSpots: 100,
    numSpotsGotten: 80,
    imageLink: '',
    petitionLink: 'https://example.com/ocean-awareness',
  },
  {
    id: 3,
    title: 'Stop Plastic Pollution',
    description: 'Reduce plastic waste to save the planet.',
    latitude: 33.4927,
    longitude: -111.9228,
    datePosted: '2024-12-18',
    postAuthor: 'Eco Warriors',
    numSpots: 200,
    numSpotsGotten: 150,
    imageLink: '',
    petitionLink: 'https://example.com/tree-planting',
  },
];

const Events = () => {
  const [filteredEvents, setFilteredEvents] = useState(eventsData);

  const handleFilterChange = (fromDate: string, toDate: string) => {
    const filtered = eventsData.filter((event) => {
      const eventDate = new Date(event.datePosted);
      const from = fromDate ? new Date(fromDate) : new Date('1900-01-01');
      const to = toDate ? new Date(toDate) : new Date('2100-12-31');
      return eventDate >= from && eventDate <= to;
    });
    setFilteredEvents(filtered);
  };

  return (
    <View style={styles.container}>
      <MapComponent markers={filteredEvents} />
      <ScrollUpOverlay>
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          nestedScrollEnabled
          keyboardShouldPersistTaps="handled"
        >
          <EventsList eventsData={filteredEvents} onFilterChange={handleFilterChange}  />
        </ScrollView>
      </ScrollUpOverlay>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
  },
});

export default Events;