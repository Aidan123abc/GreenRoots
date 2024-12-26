import React from 'react';
import { View, ScrollView, StyleSheet, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // Importing icon library
import { useNavigation } from '@react-navigation/native'; // Importing navigation
import PetitionModule from '@/components/petitionModule/petitionModule';

const petitionsData = [
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
  },
  {
    id: 2,
    title: "Protect Ocean Life",
    datePosted: "2024-12-20",
    postAuthor: "John Smith",
    numSignatures: 5000,
    numSigsGotten: 3500,
    description:
      "Marine life is being destroyed due to overfishing and pollution. Join us in advocating for sustainable ocean policies.",
    imageLink: "",
    petitionLink: "https://example.com/protect-ocean",
  },
  {
    id: 3,
    title: "Stop Plastic Pollution",
    datePosted: "2024-12-18",
    postAuthor: "Eco Warriors",
    numSignatures: 8000,
    numSigsGotten: 6000,
    description:
      "Plastic waste is choking our planet. Help us demand government action to reduce plastic production.",
    imageLink: "",
    petitionLink: "https://example.com/stop-plastic",
  },
];

const Petitions = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollContainer}>
        <View style={styles.header}>
          <Text style={styles.title}>Petitions</Text>
          <Ionicons name="pencil" size={24} color="#333" style={styles.icon} />
        </View>
        {petitionsData.map((petition) => (
          <PetitionModule
            key={petition.id}
            data={petition}
            onPress={() => navigation.navigate('PetitionDetails', { petitionId: petition.id })}
          />
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#f8f9fa',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  icon: {
    marginLeft: 8,
  },
  scrollContainer: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f8f9fa',
  },
});

export default Petitions;
