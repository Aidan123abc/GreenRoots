import React, { useState } from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  Platform,
  Button,
  Keyboard,
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

  const handleDismissPicker = () => {
    setShowPicker({ type: null }); // Hide the picker
    Keyboard.dismiss(); // Dismiss the keyboard
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Events</Text>
        <Ionicons name="calendar" size={24} color="#333" style={styles.icon} />
      </View>

      <View style={styles.filterContainer}>
        {/* From Date */}
        <TextInput
          style={styles.input}
          placeholder="From Date (YYYY-MM-DD)"
          value={fromDate}
          onFocus={() => setShowPicker({ type: 'from' })}
          onChangeText={(text) => {
            setFromDate(text);
            handleFilter();
          }}
          onSubmitEditing={handleDismissPicker} // Close picker on return
        />

        {/* To Date */}
        <TextInput
          style={styles.input}
          placeholder="To Date (YYYY-MM-DD)"
          value={toDate}
          onFocus={() => setShowPicker({ type: 'to' })}
          onChangeText={(text) => {
            setToDate(text);
            handleFilter();
          }}
          onSubmitEditing={handleDismissPicker} // Close picker on return
        />
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
  input: {
    flex: 1,
    marginHorizontal: 8,
    padding: 8,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    backgroundColor: '#fff',
  },
  scrollContainer: {
    padding: 16,
  },
});

export default EventsList;
