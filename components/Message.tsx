import React from "react";
import { Text, View, ImageBackground } from "react-native";
import { MessageT } from "../types";
import styles from "../assets/styles";

const Message = ({ image, lastMessage, name, time }: MessageT) => (
  <View style={styles.containerMessage}>
    <ImageBackground source={{uri:image}} style={styles.avatar}/>
    <View>
     
      <View style={[{flexDirection: 'row',justifyContent:'space-between', width: 270}]}>
         <Text>{name}</Text>
        <Text style={styles.message}>{time}</Text>
      </View>
      <Text style={styles.message}>{lastMessage}</Text>

    </View>
  </View>
);

export default Message;
