import React from 'react';
import { View, ScrollView, StyleSheet, Text } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import PetitionModule from '@/components/petitionModule/petitionModule';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Colors } from '@/constants/Colors';

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
  const colorScheme = useColorScheme();
  const themeColors = Colors[colorScheme ?? 'light'];

  return (
    <View style={[styles.container, { backgroundColor: themeColors.background }]}>
      <ScrollView style={[styles.scrollContainer, { backgroundColor: themeColors.background }]}>
        <View style={styles.header}>
          <Text style={[styles.title, { color: themeColors.text }]}>Petitions</Text>
          <FontAwesome5 name="pen-nib" size={24} color={themeColors.icon} style={styles.icon} />
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
  },
  icon: {
    marginLeft: 8,
  },
  scrollContainer: {
    flex: 1,
    padding: 16,
  },
});

export default Petitions;
