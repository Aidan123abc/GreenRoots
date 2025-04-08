import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Colors } from '@/constants/Colors';

// Import your screens
import SignIn from './signIn';
import SignUp from './signUp';

const Stack = createStackNavigator();

const AuthLayout = () => {
  const colorScheme = useColorScheme();
  const themeColors = Colors[colorScheme ?? 'light'];

  return (
    <Stack.Navigator
      initialRouteName="SignIn"
      screenOptions={{
        headerShown: false, // Hide headers for both screens
        cardStyle: { backgroundColor: themeColors.background }, // Ensure consistent background color
      }}
    >
      <Stack.Screen name="SignIn" component={SignIn} />
      <Stack.Screen name="SignUp" component={SignUp} />
    </Stack.Navigator>
  );
};

export default AuthLayout;
