import React, { useLayoutEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
  KeyboardAvoidingView,
  ScrollView,
  TextInput,
  Keyboard,
  TouchableWithoutFeedback,
  Platform,
} from "react-native";
import { Avatar } from "react-native-elements";
import { AntDesign, FontAwesome, Ionicons } from "@expo/vector-icons";
import { db, auth } from "../../firebase";
import firebase from "firebase/compat/app";

const Chat = ({ navigation, route }) => {
  const [input, setInput] = useState("");
  const [message, setMessage] = useState([]);
  const sendMessage = () => {
    Keyboard.dismiss();
    db.collection("chats").doc(route.params.id).collection("messages").add({
      timestap: firebase.firestore.FieldValue.serverTimestamp(),
      message: input,
      diaplayName: auth.currentUser.displayName,
      email: auth.currentUser.email,
      photoURL: auth.currentUser.photoURL,
    });
    setInput("");
  };

  useLayoutEffect(() => {
    const unsubscribe = db
      .collection("chats")
      .doc(route.params.id)
      .collection("messages")
      .orderBy("timestap", "desc")
      .onSnapshot((snapshot) =>
        setMessage(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            data: doc.data(),
          }))
        )
      );
    return unsubscribe;
  }, [route]);
  console.log(message);
  useLayoutEffect(() => {
    navigation.setOptions({
      title: "Chat",
      headerBackVisible: false,
      headerTitleAlign: "left",
      headerTitle: () => (
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Avatar
            rounded
            source={{
              uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQU7vh6d9dU-8YKojjRcLrVnJoWzv-HEYLSpwYymRH4T521wZwzOkdnYBGRXs4ECPITYIM&usqp=CAU",
            }}
          />
          <Text style={{ color: "white", marginLeft: 10, fontWeight: "700" }}>
            {route?.params?.chatName}
          </Text>
        </View>
      ),
      headerLeft: () => (
        <TouchableOpacity
          style={{ marginLeft: 10 }}
          onPress={navigation.goBack}
        >
          <AntDesign name="arrowleft" size={24} color="white" />
        </TouchableOpacity>
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
          <TouchableOpacity>
            <FontAwesome name="video-camera" size={24} color="white" />
          </TouchableOpacity>
          <TouchableOpacity>
            <Ionicons name="call" color={"white"} size={24} />
          </TouchableOpacity>
        </View>
      ),
    });
  }, [navigation.message]);
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}
        keyboardVerticalOffset={90}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <>
            <ScrollView contentContainerStyle={{ padding: 15 }}>
              {message.map(({ id, data }) =>
                data.email === auth.currentUser.email ? (
                  <View key={id} style={styles.reciver}>
                    <Avatar
                      rounded
                      size={30}
                      containerStyle={{
                        position: "absolute",
                        right: -5,
                        bottom: -15,
                      }}
                      position="absolute"
                      right={-5}
                      bottom={-15}
                      source={{
                        uri:
                          data?.photoURL ||
                          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQU7vh6d9dU-8YKojjRcLrVnJoWzv-HEYLSpwYymRH4T521wZwzOkdnYBGRXs4ECPITYIM&usqp=CAU",
                      }}
                    />
                    <Text style={styles.reciverText}>{data?.message}</Text>
                  </View>
                ) : (
                  <View  key={id} style={styles.sender}>
                    <Avatar
                      rounded
                      size={30}
                      containerStyle={{
                        position: "absolute",
                        right: -5,
                        bottom: -15,
                      }}
                      position="absolute"
                      right={-5}
                      bottom={-15}
                      source={{
                        uri:
                          data?.photoURL ||
                          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQU7vh6d9dU-8YKojjRcLrVnJoWzv-HEYLSpwYymRH4T521wZwzOkdnYBGRXs4ECPITYIM&usqp=CAU",
                      }}
                    />
                    <Text style={styles.senderText}>{data?.message}</Text>
                    <Text style={styles.senderName}>{data?.diaplayName}</Text>
                  </View>
                )
              )}
            </ScrollView>
            <View  style={styles.footer}>
              <TextInput
                value={input}
                onSubmitEditing={sendMessage}
                onChangeText={(text) => setInput(text)}
                placeholder="Enter message"
                style={styles.textInput}
              />
              <TouchableOpacity onPress={sendMessage} activeOpacity={0.5}>
                <Ionicons name="send" size={24} color={"#2b68e6"} />
              </TouchableOpacity>
            </View>
          </>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default Chat;

const styles = StyleSheet.create({
  container: { flex: 1 },
  footer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
    width: "100%",
  },
  textInput: {
    bottom: 0,
    height: 40,
    marginRight: 15,

    backgroundColor: "#ECECEC",
    flex: 1,
    padding: 10,
    color: "grey",
    borderRadius: 30,
  },
  reciver: {
    padding: 15,
    backgroundColor: "#ECECEC",
    alignSelf: "flex-end",
    borderRadius: 20,
    marginRight: 15,
    marginBottom: 20,
    maxWidth: "80%",
    position: "relative",
  },
  sender: {
    padding: 15,
    backgroundColor: "#2b68e6",
    alignSelf: "flex-start",
    borderRadius: 20,
    marginRight: 15,
    marginBottom: 20,
    maxWidth: "80%",
    position: "relative",
  },
  senderName: { left: 10, paddingRight: 10, fontSize: 10, color: "white" },

  senderText: {
    color: "white",
    fontWeight: "500",
    marginLeft: 10,
    marginBottom: 15,
  },
  reciverText: {
    color: "black",
    fontWeight: "500",
    marginLeft: 10,
  },
});
