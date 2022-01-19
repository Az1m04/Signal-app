import React, { useLayoutEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Button, Input } from "react-native-elements";
import { Icon } from "react-native-vector-icons/FontAwesome";
import { db } from "../../firebase";

const AddChat = ({ navigation }) => {
  const [input, setInput] = useState("");
  useLayoutEffect(() => {
    navigation.setOptions({
      title: "Add a new chat",
    });
  }, [navigation]);

  const createChat = async () => {
    await db
      .collection("chats")
      .add({ chatName: input })
      .then(() => {
        navigation.goBack();
      })
      .catch((error) => alert(error));
  };

  return (
    <View style={styles.container}>
      <Input
        placeholder="Enter a chat name"
        value={input}
        onSubmitEditing={createChat}
        onChangeText={(text) => setInput(text)}
        //   leftIcon={
        //     <Icon name='wechat' type='antdesign' size={24} color='black'
        //     />
        // }
      />
      <Button onPress={createChat} title={"Create new chat"} />
    </View>
  );
};

export default AddChat;

const styles = StyleSheet.create({
  container: { backgroundColor: "white" ,
padding:30,
height:"100%",
},
});
