import { ScrollView, Text, View, StyleSheet } from "react-native";
import MapView, {MapMarker} from 'react-native-maps';



export default function MapScreen() {

  return(
    <View style={styles.container}>
      <MapView style={{flex: 1}} initialRegion={{
    latitude: 37.78825,
    longitude: -122.4324,
    latitudeDelta: 0.1,
    longitudeDelta: 0.1,
          }}>
              <MapMarker title='You are here'  coordinate={{ latitude: 37.78825, longitude: -122.4324}} />
  </MapView>
    </View>
  )
  
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
})