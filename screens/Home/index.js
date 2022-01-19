import React, { useLayoutEffect, useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  SafeAreaView,
  View,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { Avatar } from "react-native-elements";
import CustomListItem from "../../components/CustomListItem";
import { auth, db } from "../../firebase";
import { AntDesign, SimpleLineIcons } from "@expo/vector-icons";

const Home = ({ navigation }) => {
  const [chats, setChats] = useState([]);

  const signOutUser = () => {
    auth.signOut().then(() => {
      navigation.replace("Login");
    });
  };
  useLayoutEffect(() => {
    navigation.setOptions({
      title: "Signal",
      headerStyle: { backgroundColor: "#fff" },
      headerTitleStyle: { color: "black" },
      headerTitleColor: "black",
      headerLeft: () => (
        <View style={{ marginLeft: 20, flexDirection: "row" }}>
          <TouchableOpacity onPress={signOutUser} activeOpacity={0.5}>
            <Avatar
              rounded
              source={{
                uri:
                  auth?.currentUser?.photoURL ||
                  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQU7vh6d9dU-8YKojjRcLrVnJoWzv-HEYLSpwYymRH4T521wZwzOkdnYBGRXs4ECPITYIM&usqp=CAU",
              }}
            />
          </TouchableOpacity>
          <View style={{ marginLeft: 15 }}>
            <Text style={{ fontSize: "20px", fontWeight: "bold" }}>
              {auth?.currentUser?.displayName}
            </Text>
          </View>
        </View>
      ),
      headerRight: () => (
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            width: 80,
            marginRight: 20,
          }}
        >
          <TouchableOpacity activeOpacity={0.5}>
            <AntDesign name="camerao" size={24} color={"black"} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate("AddChat")}
            activeOpacity={0.5}
          >
            <SimpleLineIcons name="pencil" size={20} color={"black"} />
          </TouchableOpacity>
        </View>
      ),
    });
  }, [navigation]);
  useEffect(() => {
    const unsubscrib = db.collection("chats").onSnapshot((snapshot) => {
      setChats(
        snapshot?.docs.map((doc) => ({
          id: doc?.id,
          data: doc?.data(),
        }))
      );
    });

    return unsubscrib;
  }, []);
  const enterChat = (id, chatName) => {
    navigation.navigate("Chat", {
      id,
      chatName,
    });
  };
  return (
    <SafeAreaView>
      <ScrollView style={styles.container}>
        {chats?.map(({ id, data: { chatName } }) => (
          <CustomListItem
            key={id}
            enterChat={enterChat}
            id={id}
            chatName={chatName}
          />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    height: "100%",
  },
});
