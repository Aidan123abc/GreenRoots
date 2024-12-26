import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Dimensions, Image, Alert } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import { useNavigation } from '@react-navigation/native';

type MarkerData = {
  id: number;
  title: string;
  description: string;
  latitude: number;
  longitude: number;
};

type MapComponentProps = {
  markers: MarkerData[];
};

const MapComponent: React.FC<MapComponentProps> = ({ markers }) => {
  const [userLocation, setUserLocation] = useState<{ latitude: number; longitude: number } | null>(null);
  const navigation = useNavigation();

  useEffect(() => {
    const getLocation = async () => {
      try {
        // Request location permissions
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          Alert.alert('Permission Denied', 'Location permissions are required to center the map.');
          return;
        }

        // Get the user's current location
        const location = await Location.getCurrentPositionAsync({});
        const { latitude, longitude } = location.coords;
        setUserLocation({ latitude, longitude });
      } catch (error) {
        console.error('Error getting location:', error);
        Alert.alert('Error', 'Unable to retrieve location.');
      }
    };

    getLocation();
  }, []);

  const initialRegion = {
    latitude: userLocation?.latitude || 37.78825,
    longitude: userLocation?.longitude || -122.4324,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  };

  return (
    <View style={styles.container}>
      <MapView style={styles.map} region={userLocation ? initialRegion : undefined}>
        {markers.map((marker) => (
          <Marker
            key={marker.id}
            coordinate={{ latitude: marker.latitude, longitude: marker.longitude }}
            title={marker.title}
            description={marker.description}
            onCalloutPress={() => navigation.navigate('EventDetails', { eventId: marker.id })} // Navigate on click
          >
            <Image source={require('@/public/Icon.png')} style={styles.markerIcon} />
          </Marker>
        ))}
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  markerIcon: {
    width: 40,
    height: 40,
    resizeMode: 'contain',
  },
});

export default MapComponent;
