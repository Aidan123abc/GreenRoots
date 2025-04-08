import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

type ProgressBarProps = {
  numSignatures: number;
  numSigsGotten: number;
};

const ProgressBar: React.FC<ProgressBarProps> = ({ numSignatures, numSigsGotten }) => {
  const progress = Math.min(numSigsGotten / numSignatures, 1); // Ensure progress does not exceed 100%

  return (
    <View style={styles.container}>
      <View style={styles.progressBar}>
        <View style={[styles.progress, { width: `${progress * 100}%` }]} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 8,
    alignItems: 'center',
  },
  labelContainer: {
    marginBottom: 8,
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    color: '#333',
  },
  progressBar: {
    width: '100%',
    height: 10,
    backgroundColor: '#e0e0e0',
    borderRadius: 10,
    overflow: 'hidden',
  },
  progress: {
    height: '100%',
    backgroundColor: '#82D06F', // Green color for the progress
    borderRadius: 10,
  },
});

export default ProgressBar;