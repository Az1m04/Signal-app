import React, { useState, useLayoutEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import { ListItem, Avatar } from "react-native-elements";
import { db, auth } from "../firebase";

const CustomListItem = ({ id, chatName, enterChat }) => {
  const [chatMessages, setChatMessages] = useState([]);
  useLayoutEffect(() => {
    const unsubscribe = db
    .collection("chats")
    .doc(id)
    .collection("messages")
    .orderBy("timestap", "desc")
    .onSnapshot((snapshot) =>
      setChatMessages(
        snapshot.docs.map((doc) =>  doc.data()
        )
      )
    );
  return unsubscribe;
  }, [chatMessages]);
  return (
    <ListItem key={id} onPress={() => enterChat(id, chatName)} bottomDivider>
      <Avatar
        rounded
        source={{
          uri:
            chatMessages?.[0]?.photoURL ||
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQU7vh6d9dU-8YKojjRcLrVnJoWzv-HEYLSpwYymRH4T521wZwzOkdnYBGRXs4ECPITYIM&usqp=CAU",
        }}
      />
      <ListItem.Content>
        <ListItem.Title style={{ fontWeight: "800" }}>
          {chatName}
        </ListItem.Title>
        <ListItem.Subtitle numberOfLines={1} ellipsizeMode="tail">
          {chatMessages?.[0]?.displayName}:{chatMessages?.[0]?.message}
        </ListItem.Subtitle>
      </ListItem.Content>
    </ListItem>
  );
};

export default CustomListItem;

const styles = StyleSheet.create({});
