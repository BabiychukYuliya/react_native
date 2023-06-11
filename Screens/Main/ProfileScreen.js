import {
  Image,
  Text,
  View,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { db } from "../../firebase/config";
import { collection, query, where, onSnapshot } from "firebase/firestore";
import { EvilIcons, Feather } from "@expo/vector-icons";

const ProfileScreen = ({ navigation, route }) => {
  const { userId } = useSelector((state) => state.auth);
  const [userPosts, setUserPosts] = useState([]);

  useEffect(() => {
    getUserPhoto();
  }, []);

  const getUserPhoto = async () => {
    const q = await query(
      collection(db, "posts"),
      where("userId", "==", userId)
    );

    await onSnapshot(q, (snapshot) => {
      setUserPosts(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }))
      );
    });
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        style={styles.bgImage}
        source={require("../../assets/image/PhotoBG.jpg")}
      >
        <View style={styles.contentBox}>
        <View style={styles.containerFoto}>
          <Image style={{borderRadius:16}} source={require("../../assets/image/Natalia.jpg")} />
        </View>
        <TouchableOpacity>
          <Image
            style={styles.deleteBtn}
            source={require("../../assets/image/delete.png")}
          />
        </TouchableOpacity>
        <Text style={{fontSize:30, textAlign: "center" }}>Natalia Romanova</Text>

        <FlatList
          data={userPosts}
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
                  <EvilIcons name="comment" size={24} color="#FF6C00" />
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate("Likes", { postId: item.id })
                  }
                >
                  <Feather name="thumbs-up" size={24} color="#FF6C00" />
                  <Text>item.likeCounter</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  title="Map"
                  onPress={() =>
                    navigation.navigate("Map", { location: item.locationPost })
                  }
                >
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
      </ImageBackground>
    </View>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#ecf0f1",
  },

  bgImage: {
    flex: 1,
    justifyContent: "flex-end",
  },

  boxPhoto: {
    marginBottom: 8,
    alignItems: "center",
  },
  photo: {
    width: 343,
    height: 240,
    borderRadius: 8,
  },
  contentBox: {
      maxHeight:"70%",
      position:'relative',
      justifyContent: "flex-start",
      backgroundColor: "#ffffff",
      borderBottomLeftRadius: 0,
      borderBottomRightRadius: 0,
      borderTopLeftRadius: 25,
      borderTopRightRadius: 25,
      paddingTop: 32,
  },
  // textName: {
  //     fontFamily: "Roboto-Regular",
  //     fontSize: 30,
  //     color: "#212121",
  //     fontWeight: 500,
  //     lineHeight: 35,
  //     textAlign: "center",
  //     letterSpacing: 0.01,
  //     marginBottom: 32,
  // },

  locationBox: {
    display: "flex",
    flexDirection: "row",
  },

  containerFoto: {
    position: "relative",
    alignSelf: "center",
    marginTop: -92,
    marginBottom: 0,
    backgroundColor: "#F6F6F6",
    borderRadius: 16,
    width: 120,
    height: 120,
  },

  deleteBtn: {
    position: "absolute",
    bottom: -10,
    right: 90,
  },
});

