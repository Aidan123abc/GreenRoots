import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Events from '@/app/(pages)/(tabs)/events';
import EventDetails from './EventDetails';

const Stack = createNativeStackNavigator();

export default function EventsStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="EventsScreen"
        component={Events}
        options={{ headerShown: false }} // Hide header for events list
      />
      <Stack.Screen
        name="EventDetails"
        component={EventDetails}
        options={{
          headerShown: false, // Completely hide the header for EventDetails
        }}
      />
    </Stack.Navigator>
  );
}
