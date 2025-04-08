import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Discussions from '@/app/(pages)/(tabs)/discussions';
import discussionDetails from './discussionDetails';
import createDiscussion from './createDiscussion';


const Stack = createNativeStackNavigator();

export default function DiscissionStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="DiscussionScreen"
        component={Discussions}
        options={{ headerShown: false }} // Hide header for events list
      />
      <Stack.Screen
        name="DiscussionDetails"
        component={discussionDetails}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="CreateDiscussion"
        component={createDiscussion}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
}
