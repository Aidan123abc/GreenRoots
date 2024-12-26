import React, { useState } from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  Platform,
  Button,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';
import EventsModule from '@/components/eventModule/eventModule';

interface EventData {
  id: number;
  title: string;
  description: string;
  latitude: number;
  longitude: number;
  datePosted: string;
  postAuthor: string;
  numSpots: number;
  numSpotsGotten: number;
  imageLink: string;
  petitionLink: string;
}

interface EventsListProps {
  eventsData: EventData[];
  onFilterChange: (fromDate: string, toDate: string) => void;
}

const EventsList: React.FC<EventsListProps> = ({ eventsData, onFilterChange }) => {
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [showPicker, setShowPicker] = useState<{ type: 'from' | 'to' | null }>({ type: null });
  const [tempDate, setTempDate] = useState<Date | null>(null);

  const handleFilter = () => {
    onFilterChange(fromDate, toDate);
  };

  const handleConfirm = () => {
    if (showPicker.type === 'from' && tempDate) {
      setFromDate(tempDate.toISOString().split('T')[0]); // Format YYYY-MM-DD
    } else if (showPicker.type === 'to' && tempDate) {
      setToDate(tempDate.toISOString().split('T')[0]);
    }
    setShowPicker({ type: null });
    setTempDate(null);
    handleFilter();
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Events</Text>
        <Ionicons name="calendar" size={24} color="#333" style={styles.icon} />
      </View>

      <View style={styles.filterContainer}>
        {/* From Date */}
        <TouchableOpacity
          style={styles.dateField}
          onPress={() => setShowPicker({ type: 'from' })}
        >
          <Text style={styles.dateText}>
            {fromDate || 'From Date (YYYY-MM-DD)'}
          </Text>
        </TouchableOpacity>

        {/* To Date */}
        <TouchableOpacity
          style={styles.dateField}
          onPress={() => setShowPicker({ type: 'to' })}
        >
          <Text style={styles.dateText}>
            {toDate || 'To Date (YYYY-MM-DD)'}
          </Text>
        </TouchableOpacity>
      </View>

      {/* DateTimePicker */}
      {showPicker.type && (
        <View>
          <DateTimePicker
            value={tempDate || new Date()}
            mode="date"
            display={Platform.OS === 'ios' ? 'inline' : 'default'}
            onChange={(event, selectedDate) => setTempDate(selectedDate || new Date())}
          />
          <Button title="Confirm" onPress={handleConfirm} />
        </View>
      )}

      <ScrollView style={styles.scrollContainer}>
        {eventsData.map((event) => (
          <EventsModule key={event.id} data={event} />
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
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
    color: '#333',
  },
  icon: {
    marginLeft: 8,
  },
  filterContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  dateField: {
    flex: 1,
    marginHorizontal: 8,
    padding: 8,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
  dateText: {
    fontSize: 16,
    color: '#555',
  },
  scrollContainer: {
    padding: 16,
  },
});

export default EventsList;
