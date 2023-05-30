import { ScrollView, Text,View, StyleSheet } from "react-native";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {db} from "../../firebase/config";
import { collection, query, where, onSnapshot } from "firebase/firestore";

const ProfileScreen = () => {
// const [avatar, setAvatar] = useState(require("../../assets/images/Natalia.jpg"),)
  const [userPosts, setUserPosts] = useState([]); 
  const { userId } = useSelector((state) => state.auth);

  const getUserPosts = async () => {
        const q = await query(
      collection(db, "posts"),
      where("userId", "==", userId)
    );

    await onSnapshot(q, (snapshot) => {
      setUserPosts(snapshot.docs.map((doc) => ({ ...doc.data() })));
      console.log(snapshot.docs.map((doc) => ({...doc.data() })));
    });
  }

  useEffect(() => {
    getUserPosts()
  }, [])


  return(
    <View style={styles.container}>

    <ScrollView>
      <Text>ProfileScreen</Text>
    </ScrollView>
    </View>
  )
  
}

export default ProfileScreen;


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff'
  }
})