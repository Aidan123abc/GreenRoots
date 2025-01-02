import React from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Colors } from '@/constants/Colors';
import { NavigationContainer } from '@react-navigation/native';
import MainLayout from './_layout';

export default function Index() {
  const colorScheme = useColorScheme();
  const themeColors = Colors[colorScheme ?? 'light'];

  return (
    <NavigationContainer>
      <GestureHandlerRootView style={{ flex: 1, backgroundColor: themeColors.background }}>
        <MainLayout />
      </GestureHandlerRootView>
    </NavigationContainer>
  );
}
