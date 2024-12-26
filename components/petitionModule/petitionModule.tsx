import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import ProgressBar from './progressBar';

type PetitionData = {
  id: number;
  title: string;
  datePosted: string;
  postAuthor: string;
  numSignatures: number;
  numSigsGotten: number;
  description: string;
  imageLink?: string; // Optional to allow for default
  petitionLink: string;
};

type PetitionModuleProps = {
  data: PetitionData;
  onPress: () => void; // New prop to handle navigation
};

const PetitionModule: React.FC<PetitionModuleProps> = ({ data, onPress }) => {
  const {
    id,
    title,
    datePosted,
    postAuthor,
    numSignatures,
    numSigsGotten,
    description,
    imageLink,
    petitionLink,
  } = data;

  const defaultImage = require('@/public/default_profile.jpg');

  const getTimeDifference = (date: string) => {
    const currentDate = new Date();
    const postedDate = new Date(date);
    const diffInSeconds = Math.floor((currentDate.getTime() - postedDate.getTime()) / 1000);

    const timeMap = [
      { unit: 'year', seconds: 31536000 },
      { unit: 'month', seconds: 2592000 },
      { unit: 'week', seconds: 604800 },
      { unit: 'day', seconds: 86400 },
    ];

    for (const { unit, seconds } of timeMap) {
      const diff = Math.floor(diffInSeconds / seconds);
      if (diff >= 1) {
        return `${diff} ${unit}${diff > 1 ? 's' : ''} ago`;
      }
    }
    return 'Today';
  };

  const truncateText = (text: string, maxLength: number) => {
    return text.length > maxLength ? text.substring(0, maxLength - 3) + '...' : text;
  };

  const truncatedPostAuthor = truncateText(postAuthor, 26);
  const truncatedTitle = truncateText(title, 29);
  const truncatedDescription = truncateText(description, 100);

  const timeDifference = getTimeDifference(datePosted);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image
          source={imageLink ? { uri: imageLink } : defaultImage}
          style={styles.image}
        />
        <View style={styles.authorContainer}>
          <Text style={styles.postAuthor}>{truncatedPostAuthor}</Text>
          <Text style={styles.datePosted}>{timeDifference}</Text>
        </View>
      </View>
      <Text style={styles.title}>{truncatedTitle}</Text>
      <ProgressBar numSignatures={numSignatures} numSigsGotten={numSigsGotten} />
      <Text style={styles.description}>{truncatedDescription}</Text>
      <View style={styles.footer}>
        <Text style={styles.signatures}>{numSigsGotten} SIGNATURES</Text>
        <View style={styles.buttons}>
          <TouchableOpacity
            style={styles.secondaryButton}
            onPress={onPress} // Use the onPress prop here
          >
            <Text style={styles.secondaryButtonText}>View</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              console.log(`Navigating to: ${petitionLink}`);
            }}
          >
            <Text style={styles.buttonText}>Sign</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
    padding: 16,
    backgroundColor: '#fff',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 2,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#ddd', // Fallback background color
    marginRight: 12,
  },
  authorContainer: {
    flex: 1,
  },
  postAuthor: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  datePosted: {
    fontSize: 12,
    color: '#666',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  description: {
    fontSize: 14,
    marginBottom: 2,
    color: '#444',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
  },
  signatures: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#19708D',
  },
  button: {
    backgroundColor: '#037A6A',
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 20,
  },
  secondaryButton: {
    backgroundColor: '#fff',
    paddingHorizontal: 18,
    paddingVertical: 6,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: '#037A6A',
    marginRight: 8,
  },
  buttonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  secondaryButtonText: {
    color: '#037A6A',
    fontSize: 14,
    fontWeight: 'bold',
  },
});

export default PetitionModule;
