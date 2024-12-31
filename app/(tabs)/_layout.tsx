import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View, Image, StyleSheet, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FontAwesome5 } from '@expo/vector-icons';

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
  const themeColors = Colors[colorScheme ?? 'light'];
  const borderColor = colorScheme === 'dark' ? themeColors.background : '#d3d3d3'; // Light gray in light mode, background in dark mode

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: themeColors.background }]}>
      {/* Header */}
      <View style={[styles.header, { backgroundColor: themeColors.background, borderBottomColor: borderColor }]}>
        <View style={styles.subheader}>
          <Image source={require('@/public/Icon.png')} style={styles.icon} />
          <Image source={require('@/public/greenroots.png')} style={styles.title} />
        </View>
        <Image source={require('@/public/default_profile.jpg')} style={styles.profileImage} />
      </View>
      {/* Tab Navigator */}
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarActiveTintColor: themeColors.tint,
          tabBarStyle: {
            backgroundColor: themeColors.background,
            height: Platform.OS === 'ios' ? 70 : 60,
            paddingTop: 10,
            borderTopWidth: 1,
            borderTopColor: borderColor, // Light gray in light mode, background in dark mode
          },
        }}
      >
        <Tab.Screen
          name="Home"
          component={HomeScreen}
          options={{
            title: 'Home',
            tabBarIcon: ({ color }) => <FontAwesome5 name="home" size={24} color={color} />,
          }}
        />
        <Tab.Screen
          name="Petitions"
          component={PetitionsStack}
          options={{
            title: 'Petitions',
            tabBarIcon: ({ color }) => <FontAwesome5 name="pen-nib" size={24} color={color} />,
          }}
        />
        <Tab.Screen
          name="Events"
          component={EventsStack}
          options={{
            title: 'Events',
            tabBarIcon: ({ color }) => <FontAwesome5 name="map" size={24} color={color} />,
          }}
        />
        <Tab.Screen
          name="Discussions"
          component={DiscussionsScreen}
          options={{
            title: 'Discussions',
            tabBarIcon: ({ color }) => <FontAwesome5 name="comments" size={24} color={color} />,
          }}
        />
      </Tab.Navigator>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 0,
    height: Platform.OS === 'ios' ? 80 : 60,
    borderBottomWidth: 1, // Border at the bottom of the header
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
