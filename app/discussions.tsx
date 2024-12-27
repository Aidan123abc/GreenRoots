import React from 'react';
import { View, ScrollView, StyleSheet, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // Importing icon library
import { useNavigation } from '@react-navigation/native'; // Importing navigation
import DiscussionModule from '@/components/discussionModule/discussionModule';


const Discussions = () => {

  const discussionsData = [
    {
      id: 1,
      title: 'Community Recycling Initiative',
      postAuthor: 'EcoWarrior123',
      latitude: 33.4942, // Near Scottsdale, AZ
      longitude: -111.9261, // Near Scottsdale, AZ
      datePosted: '2024-12-20',
      description: 'Let’s discuss how we can improve recycling in our neighborhood.',
      imageLink: 'https://example.com/recycling-initiative.jpg',
      numComments: 3,
      comments: [
        {
          id: 101,
          postAuthor: 'GreenGuru',
          comment: 'Great idea! We could also host a recycling drive every month.',
          datePosted: '2024-12-21',
        },
        {
          id: 102,
          postAuthor: 'EcoNewbie',
          comment: 'I’m in! Can we get bins placed in the park as well?',
          datePosted: '2024-12-22',
        },
        {
          id: 103,
          postAuthor: 'RecycleQueen',
          comment: 'Love this. I can help create posters to spread awareness.',
          datePosted: '2024-12-23',
        },
      ],
    },
    {
      id: 2,
      title: 'Save the Local Pond',
      postAuthor: 'NatureLover89',
      latitude: 33.4976, // Near Scottsdale, AZ
      longitude: -111.9291, // Near Scottsdale, AZ
      datePosted: '2024-12-18',
      description: 'The local pond is getting polluted. Let’s brainstorm solutions.',
      imageLink: 'https://example.com/save-the-pond.jpg',
      numComments: 2,
      comments: [
        {
          id: 201,
          postAuthor: 'CleanWaterAct',
          comment: 'We should report this to the local authorities and get it cleaned.',
          datePosted: '2024-12-19',
        },
        {
          id: 202,
          postAuthor: 'EcoActivist',
          comment: 'How about we organize a cleanup day and invite volunteers?',
          datePosted: '2024-12-20',
        },
      ],
    },
    {
      id: 3,
      title: 'Renewable Energy Options for Our Community',
      postAuthor: 'SolarFanatic',
      latitude: 33.4927, // Near Scottsdale, AZ
      longitude: -111.9228, // Near Scottsdale, AZ
      datePosted: '2024-12-15',
      description: 'What renewable energy options can we explore for our community?',
      imageLink: 'https://example.com/renewable-energy.jpg',
      numComments: 4,
      comments: [
        {
          id: 301,
          postAuthor: 'WindPowerGuru',
          comment: 'We could look into installing wind turbines in open areas.',
          datePosted: '2024-12-16',
        },
        {
          id: 302,
          postAuthor: 'SolarLover',
          comment: 'Solar panels are a great option! They’re becoming more affordable too.',
          datePosted: '2024-12-17',
        },
        {
          id: 303,
          postAuthor: 'GreenEngineer',
          comment: 'Community solar farms could also be an option.',
          datePosted: '2024-12-18',
        },
        {
          id: 304,
          postAuthor: 'RenewableRocks',
          comment: 'Don’t forget about geothermal energy—it’s often overlooked!',
          datePosted: '2024-12-19',
        },
      ],
    },
  ];
  
    const navigation = useNavigation();
  
    return (
      <View style={styles.container}>
        <ScrollView style={styles.scrollContainer}>
          <View style={styles.header}>
            <Text style={styles.title}>Discussions</Text>
            <Ionicons name="chatbubbles" size={24} color="#333" style={styles.icon} />
          </View>
          {discussionsData.map((discussion) => (
            <DiscussionModule
              key={discussion.id}
              data={discussion}
              onPress={() => navigation.navigate('DiscussionDetails', { discussionId: discussion.id })}
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
      backgroundColor: '#fff',
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
      backgroundColor: '#fff',
    },
  });
  
  export default Discussions;