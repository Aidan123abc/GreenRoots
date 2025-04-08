import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import * as Font from 'expo-font';
import Leaderboard from '@/components/Leaderboard';
import UpcomingEvents from '@/components/UpcomingEvents';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Colors } from '@/constants/Colors';

const HomeScreen = () => {
  const [fontsLoaded, setFontsLoaded] = useState(false);
  const colorScheme = useColorScheme();
  const themeColors = Colors[colorScheme ?? 'light'];

  useEffect(() => {
    const loadFonts = async () => {
      await Font.loadAsync({
        'Playfair-Display': require('@/assets/fonts/PlayfairDisplay-VariableFont_wght.ttf'),
      });
      setFontsLoaded(true);
    };
    loadFonts();
  }, []);

  if (!fontsLoaded) {
    return null; // Or a loading spinner
  }

  return (
    <View style={{ backgroundColor: themeColors.background }}>
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={[styles.welcomeContainer, { backgroundColor: themeColors.background }]}>
        <Text style={[styles.welcomeText, { color: themeColors.welcomeText }]}>Welcome back,</Text>
        <Text style={[styles.userWelcome, { color: themeColors.text }]}>John Doe!</Text>
        <Leaderboard />
        <UpcomingEvents />
      </View>
    </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    paddingBottom: 16,
  },
  welcomeContainer: {
    borderRadius: 8,
    margin: 16,
  },
  welcomeText: {
    fontSize: 20,
    fontFamily: 'Inter',
    fontWeight: '600',
    maxWidth: 200,
  },
  userWelcome: {
    fontFamily: 'Playfair Display',
    fontWeight: '500',
    fontSize: 24,
    marginBottom: 8,
  },
});

export default HomeScreen;
