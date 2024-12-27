import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const Leaderboard = () => {
  return (
    <View style={styles.leaderboardContainer}>
      <View style={styles.leaderboardHeader}>
        <MaterialCommunityIcons name="chart-bar" size={24} color="#555" />
        <Text style={styles.leaderboardTitle}>This Week's Leaderboard</Text>
      </View>
      <View style={styles.cardsContainer}>
        {/* Second Place */}
        <View style={styles.cardSecond}>
          <Text style={styles.secondnum}>2</Text>
          <View style={styles.circle}>
            <MaterialCommunityIcons name="account" size={36} color="#fff" />
          </View>
          <Text style={styles.name}>Alice</Text>
          <Text style={styles.bigNumber}>850</Text>
          <Text style={styles.points}>Points</Text>
        </View>
        {/* First Place */}
        <View style={styles.cardFirst}>
          <Text style={styles.firstnum}>1</Text>
          <View style={styles.circle}>
            <MaterialCommunityIcons name="account" size={36} color="#fff" />
          </View>
          <Text style={styles.name}>Bob</Text>
          <Text style={styles.bigNumber}>1200</Text>
          <Text style={styles.points}>Points</Text>
        </View>
        {/* Third Place */}
        <View style={styles.cardThird}>
          <Text style={styles.thirdnum}>3</Text>
          <View style={styles.circle}>
            <MaterialCommunityIcons name="account" size={36} color="#fff" />
          </View>
          <Text style={styles.name}>Charlie</Text>
          <Text style={styles.bigNumber}>700</Text>
          <Text style={styles.points}>Points</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  leaderboardContainer: {
    backgroundColor: '#f5f5f5',
    borderRadius: 12,
    padding: 16,
    marginTop: 16,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  leaderboardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
    marginBottom: 12,
  },
  leaderboardTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginLeft: 8,
    color: '#333',
    fontFamily: 'Inter',
  },
  cardsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    marginTop: 8,
  },
  cardFirst: {
    height: 180,
    width: '36%',
    backgroundColor: '#FFD94E',
    borderRadius: 12,
    marginHorizontal: 4,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 8,
  },
  cardSecond: {
    height: 150,
    width: '28%',
    backgroundColor: '#5CBDDE',
    borderRadius: 12,
    marginHorizontal: 4,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 8,
  },
  cardThird: {
    height: 150,
    width: '28%',
    backgroundColor: '#F9A134',
    borderRadius: 12,
    marginHorizontal: 4,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 8,
  },
  circle: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#333',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 4,
  },
  name: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
    fontFamily: 'Inter',
  },
  bigNumber: {
    fontSize: 24,
    fontWeight: '700',
    color: '#000',
    marginBottom: 4,
    fontFamily: 'Inter',
  },
  points: {
    fontSize: 12,
    fontWeight: '400',
    color: '#555',
    fontFamily: 'Inter',
  },
  firstnum: {
    position: 'absolute',
    top: 10,
    left: 10,
    color: '#C19804',
    fontSize: 12,
    fontFamily: 'Inter',
    fontWeight: '600',
  },
  secondnum: {
    position: 'absolute',
    top: 10,
    left: 10,
    color: '#19708D',
    fontSize: 12,
    fontFamily: 'Inter',
    fontWeight: '600',
  },
  thirdnum: {
    position: 'absolute',
    top: 10,
    left: 10,
    color: '#AE6912',
    fontSize: 12,
    fontFamily: 'Inter',
    fontWeight: '600',
  },
});

export default Leaderboard;
