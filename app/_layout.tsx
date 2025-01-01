import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Colors } from '@/constants/Colors';

import TabLayout from './(tabs)/_layout';
import AuthLayout from './(auth)/_layout';
import { SafeAreaView } from 'react-native-safe-area-context';

const Stack = createStackNavigator();

const MainLayout = () => {
  const colorScheme = useColorScheme();
  const themeColors = Colors[colorScheme ?? 'light'];

  const isAuthenticated = false; // Replace with your actual authentication logic

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: themeColors.background}}>
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      {isAuthenticated ? (
        <Stack.Screen name="TabLayout" component={TabLayout} />
      ) : (
        <>
          <Stack.Screen name="AuthLayout" component={AuthLayout} />
          <Stack.Screen name="TabLayout" component={TabLayout} />
        </>
      )}
    </Stack.Navigator>
    </SafeAreaView>
  );
};

export default MainLayout;
