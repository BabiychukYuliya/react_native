import { View, StyleSheet } from "react-native";
import MapView, { MapMarker } from 'react-native-maps';
import React from "react";



const MapScreen = ({route})  => {
  console.log("route", route);
  const loc = route.params.location;

  return(
    <View style={styles.container}>
      <MapView style={{flex: 1}} initialRegion={{
    latitude: loc.latitude,
    longitude: loc.longitude,
    latitudeDelta: 0.1,
    longitudeDelta: 0.1,
          }}>
              <MapMarker title='You are here'  coordinate={{ latitude:loc.latitude, longitude:loc.longitude}} />
  </MapView>
    </View>
  )
  
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
})

export default MapScreen;