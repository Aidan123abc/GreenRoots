import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import * as Font from 'expo-font';
import Leaderboard from '@/components/Leaderboard';
import UpcomingEvents from '@/components/UpcomingEvents';

const HomeScreen = () => {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    const loadFonts = async () => {
      await Font.loadAsync({
        'Playfair-Display': require('@/assets/fonts/PlayfairDisplay-VariableFont_wght.ttf'), // Adjust path as needed
      });
      setFontsLoaded(true);
    };
    loadFonts();
  }, []);

  if (!fontsLoaded) {
    return null; // Or a loading spinner
  }

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.welcomeContainer}>
        <Text style={styles.welcomeText}>Welcome back,</Text>
        <Text style={styles.userWelcome}>John Doe!</Text>
        <Leaderboard />
        <UpcomingEvents />
        
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    backgroundColor: '#FFFFFF',
    paddingBottom: 16, // Ensure spacing at the bottom
  },
  welcomeContainer: {
    padding: 16,
    backgroundColor: '#FFFFFF',
  },
  welcomeText: {
    color: 'rgba(249, 161, 52, 1)', // Bright orange color
    fontSize: 20,
    fontFamily: 'Inter', // Specify font family
    fontWeight: '600',
    maxWidth: 200, // Adjust max width for better readability
  },
  userWelcome: {
    fontFamily: 'Playfair Display',
    fontWeight: '500',
    fontSize: 24,
    marginBottom: 16,
  },
});

export default HomeScreen;
