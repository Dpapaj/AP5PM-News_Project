import React, { useState, useEffect, useRef } from 'react';
import { View, StyleSheet } from 'react-native';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import { Appbar } from 'react-native-paper';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

const Maps = () => {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const mapRef = useRef(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let currentLocation = await Location.getCurrentPositionAsync({});
      setLocation(currentLocation);
    })();
  }, []);

  const handlePlaceSelect = (details) => {
    const { location } = details.geometry;
    if (mapRef.current) {
      mapRef.current.animateToRegion({
        latitude: location.lat,
        longitude: location.lng,
        latitudeDelta: 0.00822,
        longitudeDelta: 0.00421,
      });
    }
  };

  return (
    <View style={styles.container}>
      <Appbar.Header>
        <Appbar.Content title="Maps" />
      </Appbar.Header>
      <View style={styles.mapContainer}>
        <MapView
          ref={mapRef}
          style={styles.map}
          initialRegion={{
            latitude: 49.50514195469756,
            longitude: 17.106476055697055,
            latitudeDelta: 0.00822,
            longitudeDelta: 0.00421,
          }}
          showsTraffic={true}
          provider={PROVIDER_GOOGLE}
          customMapStyle={[]}
          showsUserLocation={true}
        >
        </MapView>
        <GooglePlacesAutocomplete
          placeholder="Search"
          onPress={(data, details = null) => {
            handlePlaceSelect(details);
          }}
          query={{
            key: 'AIzaSyCmIVmSPTx5xqbJgcTwWryqnZUmwZZVGCg',
            language: 'en',
          }}
          fetchDetails={true}
          styles={{
            container: {
              position: 'absolute',
              top: 10, 
              width: '80%',
              zIndex: 1,
            },
            listView: {
              backgroundColor: 'white',
            },
          }}
        />
      </View>
    </View>
  );
};

export default Maps;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  mapContainer: {
    flex: 1,
    position: 'relative',
  },
  map: {
    flex: 1,
  },
});
