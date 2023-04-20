import { ScrollView, Text,View, StyleSheet } from "react-native";



export default function PostScreen() {

  return(
    <View style={styles.container}>

    <ScrollView>
      <Text>PostScreen</Text>
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