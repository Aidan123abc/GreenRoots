import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { RouteProp, useRoute, useNavigation } from '@react-navigation/native';
import ProgressBar from './progressBar';

type RootStackParamList = {
  PetitionDetails: { petitionId: number };
};

type PetitionDetailsRouteProp = RouteProp<RootStackParamList, 'PetitionDetails'>;

const PetitionDetails: React.FC = () => {
  const route = useRoute<PetitionDetailsRouteProp>();
  const navigation = useNavigation();
  const { petitionId } = route.params;

  // Placeholder petition data
  const petition = 
  {
    id: 1,
    title: "Save the Rainforest Frog that is native to this place",
    datePosted: "2024-12-22",
    postAuthor: "Boston Greenway Initiative Which will help people do x y and z",
    numSignatures: 10000,
    numSigsGotten: 7500,
    description:
      "The Amazon rainforest is under threat from deforestation. Sign this petition to help preserve this vital ecosystem and protect countless species.",
    imageLink: "",
    petitionLink: "https://example.com/sign-petition",
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{petition.title}</Text>
      <Text style={styles.description}>{petition.description}</Text>
      <ProgressBar numSignatures={petition.numSignatures} numSigsGotten={petition.numSigsGotten} />
      <Text style={styles.signatures}>{petition.numSigsGotten} people out of {petition.numSignatures} have signed</Text>

      {/* Return Button */}
      <TouchableOpacity
        style={styles.floatingButtonReturn} // Shared and specific styles
        onPress={() => navigation.goBack()} // Navigate back to the previous screen
      >
        <Text style={styles.buttonText}>Return</Text>
      </TouchableOpacity>

      {/* Floating Sign Button */}
      <TouchableOpacity
        style={[styles.floatingButtonSign]}
        onPress={() => console.log(`Sign Petition ID: ${petitionId}`)}
      >
        <Text style={styles.buttonText}>Sign Petition</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
  },
  signatures: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#19708D',
    alignSelf: 'center',
  },
  floatingButtonReturn: {
    position: 'absolute', // Position relative to the page
    bottom: 16, // Distance from the bottom edge
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 30,
    elevation: 3, // Shadow for Android
    shadowColor: '#000', // Shadow for iOS
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    backgroundColor: '#037A6A', // Default button color
    left: 16,
  },
  floatingButtonSign: {
    position: 'absolute', // Position relative to the page
    bottom: 16, // Distance from the bottom edge
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 30,
    elevation: 3, // Shadow for Android
    shadowColor: '#000', // Shadow for iOS
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    backgroundColor: '#037A6A', // Default button color
    right: 16,
  },

  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default PetitionDetails;
