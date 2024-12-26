import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View, Text, Image, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { IconSymbol } from '@/components/ui/IconSymbol';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

// Importing screens from the same directory
import HomeScreen from './home';
import EventsStack from '@/components/eventModule/EventsStack';
import DiscussionsScreen from './discussions';
import PetitionsStack from '@/components/petitionModule/petitionStack';

const Tab = createBottomTabNavigator();

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.header}>
        <View style={styles.subheader}>
          <Image source={require('@/public/Icon.png')} style={styles.icon} />
          <Image source={require('@/public/greenroots.png')} style={styles.title} />
        </View>
        <Image source={require('@/public/default_profile.jpg')} style={styles.profileImage} />
      </View>
      <Tab.Navigator
        screenOptions={{
          headerShown: false, // Disable default headers to use custom one
          tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
          tabBarStyle: {
            backgroundColor: Colors[colorScheme ?? 'light'].background,
          },
          tabBarIconStyle: { marginBottom: -3 },
        }}
      >
        <Tab.Screen
          name="Home"
          component={HomeScreen}
          options={{
            title: 'Home',
            tabBarIcon: ({ color }) => <IconSymbol size={28} name="house.fill" color={color} />,
          }}
        />
        <Tab.Screen
          name="Petitions"
          component={PetitionsStack}
          options={{
            title: 'Petitions',
            tabBarIcon: ({ color }) => <IconSymbol size={28} name="pencil" color={color} />,
          }}
        />
        <Tab.Screen
          name="Events"
          component={EventsStack}
          options={{
            title: 'Events',
            tabBarIcon: ({ color }) => <IconSymbol size={28} name="map" color={color} />,
          }}
        />
        <Tab.Screen
          name="Discussions"
          component={DiscussionsScreen}
          options={{
            title: 'Discussions',
            tabBarIcon: ({ color }) => <IconSymbol size={28} name="bubble.left.and.bubble.right.fill" color={color} />,
          }}
        />
      </Tab.Navigator>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  subheader: {
    flexDirection: 'row',
    alignItems: 'baseline',
    justifyContent: 'space-between',
  },
  icon: {
    width: 36,
    height: 36,
  },
  title: {
    width: 200,
    height: 28,
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#ddd',
  },
});
