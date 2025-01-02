import React from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Colors } from '@/constants/Colors';
import MainLayout from './_layout';
import { NavigationContainer } from '@react-navigation/native';
import GlobalProvider from '@/context/GlobalProvider';

export default function Index() {
  const colorScheme = useColorScheme();
  const themeColors = Colors[colorScheme ?? 'light'];

  return (
    <GlobalProvider>
    <NavigationContainer>
    <GestureHandlerRootView style={{ flex: 1, backgroundColor: themeColors.background }}>
      <MainLayout />
    </GestureHandlerRootView>
    </NavigationContainer>
    </GlobalProvider>
  );
}
