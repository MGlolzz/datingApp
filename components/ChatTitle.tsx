import { View, Text,Image,StyleSheet } from 'react-native'
import React from 'react'
import Icon from "./Icon"
import tw from 'twrnc';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Navigation } from '../type';
import { getStatusBarHeight } from 'react-native-status-bar-height';
type Props = {
  title: string;
  goBack: () => void;
};
const ChatTitle = ({goBack,title}:Props) => {

  return (
    <View style={tw`p-2 flex-row items-center justify-between mt-2`}>
        <View style={tw`flex flex-row items-center`}>
        <TouchableOpacity onPress={goBack} style={tw`p-2`}>
            <Icon name="chevron-back-outline" size={20} color={"#FF5864"} />
        </TouchableOpacity>
            <Text style={tw`text-2xl font-bold pl-2` }>{title}</Text>
            </View>
      
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 10 + getStatusBarHeight(),
    left: 10,
  },
  image: {
    width: 24,
    height: 24,
  },
});


export default ChatTitle