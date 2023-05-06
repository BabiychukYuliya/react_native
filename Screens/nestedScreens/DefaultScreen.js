import { useEffect, useState } from "react";
import { Text, View, StyleSheet, FlatList, Image } from "react-native";

export default function DefaultScreenPost({ route }) {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    
    if (route.params) {
      setPosts((prevState) => [route.params, ...prevState]);
    }
  }, [route.params]);

  return (
    <View style={styles.container}>
      <FlatList
        data={posts}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.boxPhoto}>
                <Image source={{ uri: item.photo }} style={styles.photo}></Image>
                <Text>{item.namePhoto }</Text>
          </View>
        )}
          />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#fff",
  },

  photo: {
    width: 343,
    height: 240,
    borderRadius: 8
  },

  boxPhoto: {
    marginBottom: 8,
    alignItems: 'center',
    justifyContent: 'center'
  }
});