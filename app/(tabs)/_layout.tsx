import React, { useState } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View, Image, StyleSheet, Platform, Modal, TouchableOpacity, Text } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Colors } from '@/constants/Colors';

// Importing screens
import HomeScreen from './home';
import EventsStack from '@/components/eventModule/EventsStack';
import DiscussionsScreen from './discussions';
import PetitionsStack from '@/components/petitionModule/petitionStack';

const Tab = createBottomTabNavigator();

const TabLayout = () => {
  const colorScheme = useColorScheme();
  const themeColors = Colors[colorScheme ?? 'light'];
  const borderColor = colorScheme === 'dark' ? themeColors.background : '#d3d3d3';
  const [menuVisible, setMenuVisible] = useState(false);

  const handleProfilePress = () => setMenuVisible((prev) => !prev);

  const handleMenuOption = (option: string) => {
    setMenuVisible(false);
    if (option === 'profile') {
      console.log('Navigating to My Profile...');
      // Add navigation logic here
    } else if (option === 'signOut') {
      console.log('Signing Out...');
      // Add sign-out logic here
    }
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={[styles.header, { backgroundColor: themeColors.background, borderBottomColor: borderColor }]}>
        <View style={styles.subheader}>
          <Image source={require('@/public/Icon.png')} style={styles.icon} />
          <Image source={require('@/public/greenroots.png')} style={styles.title} />
        </View>
        <TouchableOpacity onPress={handleProfilePress}>
          <FontAwesome5 name="user-circle" size={48} color={themeColors.tint} solid />
        </TouchableOpacity>
      </View>

      {/* Profile Menu */}
      <Modal
        transparent={true}
        visible={menuVisible}
        animationType="fade"
        onRequestClose={() => setMenuVisible(false)}
      >
        <TouchableOpacity
          style={styles.overlay}
          onPress={() => setMenuVisible(false)}
          activeOpacity={1}
        >
          <View style={[styles.menuContainer, { backgroundColor: themeColors.background }]}>
            <TouchableOpacity
              style={styles.menuOption}
              onPress={() => handleMenuOption('profile')}
            >
              <Text style={[styles.menuText, { color: themeColors.text }]}>My Profile</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.menuOption}
              onPress={() => handleMenuOption('signOut')}
            >
              <Text style={[styles.menuText, { color: themeColors.text }]}>Sign Out</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>

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
            borderTopColor: borderColor,
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
    </View>
  );
};

export default TabLayout;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    height: Platform.OS === 'ios' ? 80 : 60,
    borderBottomWidth: 1,
  },
  subheader: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  icon: {
    width: 36,
    height: 36,
  },
  title: {
    width: 200,
    height: 28,
  },
  menuContainer: {
    position: 'absolute',
    top: '15%',
    right: 16,
    width: 150,
    borderRadius: 8,
    paddingVertical: 8,
    elevation: 5,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  menuOption: {
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  menuText: {
    fontSize: 16,
    fontWeight: '600',
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    justifyContent: 'flex-start',
  },
});
