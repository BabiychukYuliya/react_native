import { useEffect, useState } from "react";
import { Button, TouchableOpacity } from "react-native";
import { Text, View, StyleSheet, FlatList, Image } from "react-native";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../../firebase/config";
import { EvilIcons } from "@expo/vector-icons";

export default function DefaultScreenPost({ route, navigation }) {
  const [posts, setPosts] = useState([]);

  const getAllPosts = async () => {
    await onSnapshot(collection(db, "posts"), (snapshot) => {
      setPosts(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      
    });
  };

  useEffect(() => {
    getAllPosts();
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        data={posts}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.boxPhoto}>
            <Image source={{ uri: item.photo }} style={styles.photo}></Image>
            <Text>{item.namePost}</Text>

            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                marginTop: 8,
              }}
            >
              <TouchableOpacity onPress={() => navigation.navigate("Comments", {postId: item.id})}>
                <EvilIcons name="comment" size={24} color="#bdbdbd" />
              </TouchableOpacity>

              <TouchableOpacity
                title="Map"
                onPress={() =>
                  navigation.navigate("Map", { location: item.location })
                }
              >
                <EvilIcons name="location" size={30} color="#BDBDBD" />
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: "center",
    backgroundColor: "#fff",
  },

  photo: {
    width: 343,
    height: 240,
    borderRadius: 8,
  },

  boxPhoto: {
    marginBottom: 8,
    alignItems: "center",
  },
});
