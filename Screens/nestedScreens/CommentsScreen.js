import { ScrollView, Text,View, StyleSheet } from "react-native";



export default function CommentsScreen() {

  return(
    <View style={styles.container}>

    <ScrollView>
      <Text>CommentsScreen</Text>
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