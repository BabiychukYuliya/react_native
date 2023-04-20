import { ScrollView, Text,View, StyleSheet } from "react-native";



export default function ProfileScreen() {

  return(
    <View style={styles.container}>

    <ScrollView>
      <Text>ProfileScreen</Text>
    </ScrollView>
    </View>
  )
  
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff'
  }
})