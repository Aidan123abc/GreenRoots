import { Text } from 'react-native';
import { useEffect, useState } from 'react';
import { useGlobalContext } from '@/context/GlobalProvider';
import { createStackNavigator } from '@react-navigation/stack';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Colors } from '@/constants/Colors';

import TabLayout from '@/app/(tabs)/_layout';
import AuthLayout from '@/app/(auth)/_layout';
import { SafeAreaView } from 'react-native-safe-area-context';

const Stack = createStackNavigator();

const NavigationLogic = () => {
  const colorScheme = useColorScheme();
  const themeColors = Colors[colorScheme ?? 'light'];

  const { loading, isLogged } = useGlobalContext();
  const [isAuthenticated, setAuthenticated] = useState(false);

  // Update isAuthenticated only when loading is complete or isLogged changes
  useEffect(() => {
    if (!loading) {
      setAuthenticated(isLogged);
    }
  }, [loading, isLogged]);

  // Show a loading indicator while the app determines authentication state
  if (loading) {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: themeColors.background, justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{ color: themeColors.text }}>Loading...</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: themeColors.background }}>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        {isAuthenticated ? (
          <Stack.Screen name="TabLayout" component={TabLayout} />
        ) : (
          <Stack.Screen name="AuthLayout" component={AuthLayout} />
        )}
      </Stack.Navigator>
    </SafeAreaView>
  );
};

export default NavigationLogic;
