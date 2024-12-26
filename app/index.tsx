import React from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import TabLayout from './_layout'; // Adjust the path to your TabLayout component

export default function Index() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
        <TabLayout />
    </GestureHandlerRootView>
  );
}