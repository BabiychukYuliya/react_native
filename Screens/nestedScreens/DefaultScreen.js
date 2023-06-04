import React from "react";
import { useEffect, useState } from "react";
import { TouchableOpacity } from "react-native";
import { Text, View, StyleSheet, FlatList, Image } from "react-native";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../../firebase/config";
import { EvilIcons } from "@expo/vector-icons";
import { useSelector } from "react-redux";


export default function DefaultScreenPost({ route, navigation }) {
  const [posts, setPosts] = useState([]);
  const userName = useSelector((state) => state);

  console.log("Post", posts);

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
      <View style={styles.containerProfile}>
        <Image source={require("../../assets/image/Natalia.jpg")} />
        <View style={styles.boxUserInfo}>
          <Text>{userName.auth.login}</Text>

          <Text> {userName.auth.email} </Text>
        </View>
      </View>

      <FlatList
        data={posts}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.boxPhoto}>
            <Image source={{ uri: item.image }} style={styles.photo}></Image>
            <Text>{item.namePost}</Text>

            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                marginTop: 8,
              }}
            >
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate("Comments", { postId: item.id })
                }
              >
                <EvilIcons name="comment" size={24} color="#bdbdbd" />
              </TouchableOpacity>

              <TouchableOpacity
                title="Map"
                onPress={() =>
                  navigation.navigate("Map", { location: item.locationPost })
                }
              >
                {/* {item.locationPost ? (
                  <View style={{ borderBottomWidth: 1 }}>
                    <EvilIcons name="location" size={30} color="#BDBDBD" />
                    <Text>{item.locationPost}</Text>
                  </View>
                ) : (
                  <View style={{ borderBottomWidth: 1 }}>
                    <EvilIcons name="location" size={30} color="#BDBDBD" />
                    <Text>Location</Text>
                  </View>
                )} */}
<View style={styles.locationBox}>
                <EvilIcons name="location" size={30} color="#BDBDBD" />
                  <Text>Location</Text>
                  </View>
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
    marginRight: 16,
    marginBottom: 32
  },

  containerProfile: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },

  boxUserInfo: {
    display: "flex",
  },

  locationBox: {
    display: "flex",
    flexDirection: "row",
  }
});
