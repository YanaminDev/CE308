import { useState, useEffect } from 'react';
import { Platform, Text, View, StyleSheet, ActivityIndicator, TouchableOpacity, ScrollView } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Device from 'expo-device';
import * as Location from 'expo-location';

export default function App() {
  const [location, setLocation] = useState<Location.LocationObject | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [mapType, setMapType] = useState<'standard' | 'satellite' | 'hybrid' | 'terrain'>('standard');
  const [is3D, setIs3D] = useState(false);

  useEffect(() => {
    async function getCurrentLocation() {
      if (Platform.OS === 'android' && !Device.isDevice) {
        setErrorMsg('Use real device');
        return;
      }

      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission denied');
        return;
      }

      let loc = await Location.getCurrentPositionAsync({});
      setLocation(loc);

      
      console.log(loc.coords.latitude, loc.coords.longitude);
    }

    getCurrentLocation();
  }, []);

  return (
    <View style={styles.container}>
      {errorMsg ? (
        <Text style={styles.paragraph}>{errorMsg}</Text>
      ) : location ? (
        <>
          <MapView
            style={styles.map}
            mapType={mapType}
            pitchEnabled={true}
            rotateEnabled={true}
            region={{
              latitude: location.coords.latitude,
              longitude: location.coords.longitude,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}
            camera={{
              center: {
                latitude: location.coords.latitude,
                longitude: location.coords.longitude,
              },
              pitch: is3D ? 70 : 0,
              heading: is3D ? 45 : 0,
              altitude: is3D ? 1000 : 0,
              zoom: 15,
            }}
          >
            <Marker
              coordinate={{
                latitude: location.coords.latitude,
                longitude: location.coords.longitude,
              }}
              title="Your Location"
              description={`Lat: ${location.coords.latitude}, Lng: ${location.coords.longitude}`}
            />
          </MapView>
          <View style={styles.buttonGrid}>
            <TouchableOpacity
              style={[styles.circleButton, mapType === 'standard' && styles.activeCircleButton]}
              onPress={() => setMapType('standard')}
            >
              <Text style={styles.buttonEmoji}>🗺️</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.circleButton, mapType === 'satellite' && styles.activeCircleButton]}
              onPress={() => setMapType('satellite')}
            >
              <Text style={styles.buttonEmoji}>🛰️</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.circleButton, mapType === 'hybrid' && styles.activeCircleButton]}
              onPress={() => setMapType('hybrid')}
            >
              <Text style={styles.buttonEmoji}>🔀</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.circleButton, mapType === 'terrain' && styles.activeCircleButton]}
              onPress={() => setMapType('terrain')}
            >
              <Text style={styles.buttonEmoji}>⛰️</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.circleButton, is3D && styles.activeCircleButton]}
              onPress={() => setIs3D(!is3D)}
            >
              <Text style={styles.buttonEmoji}>3D</Text>
            </TouchableOpacity>
          </View>
        </>
      ) : (
        <ActivityIndicator size="large" color="#0000ff" />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
  paragraph: {
    fontSize: 18,
    textAlign: 'center',
    padding: 20,
  },
  buttonGrid: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    flexDirection: 'column',
    gap: 10,
    zIndex: 10,
  },
  circleButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#ffffff',
    borderWidth: 2,
    borderColor: '#e0e0e0',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 3,
    elevation: 3,
  },
  activeCircleButton: {
    backgroundColor: '#0A84FF',
    borderColor: '#0A84FF',
    shadowColor: '#0A84FF',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.35,
    shadowRadius: 5,
    elevation: 5,
  },
  buttonEmoji: {
    fontSize: 24,
  },
});
