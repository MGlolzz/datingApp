import React,{useState,useEffect} from "react";
import {
  ScrollView,
  Text,
  TouchableOpacity,
  ImageBackground,
  View,
  FlatList,
} from "react-native";
import { Icon, Message } from "../components";
import {data} from "../assets/data/demo";
import firebase from "firebase/compat";
import styles, { DARK_GRAY } from "../assets/styles";
import {getDatabase, get,set,ref, update} from "firebase/database";
import { useIsFocused } from "@react-navigation/native";

type Props = {
  navigation: Navigation;

};
const Messages = ({navigation}:Props): void => {
  const isFocused = useIsFocused();
  const [chats,setChats] = useState([]);


  const loadChat = async (uid,uName) => {
       const  current  = firebase.auth().currentUser;
        try{
        if(current!=null){
            firebase.firestore().collection("chatTitle").doc(current.uid)
            .update({
                selectedName: uName,
                userId:uid,
            });      
        }
        } catch (error:TypeError) {
        console.log(error.toString());
        }
  
    

  };
  
      useEffect(() => {
        if(isFocused){
            onLoading();
        }    
    }, [isFocused]);
  const onLoading = async() => {
    console.log("load");
    try{

      const  current  = firebase.auth().currentUser;
      const data = getDatabase();
      const user  = await findUser(current.uid);
      
      if(user){
         setChats(user);
      
      }
    }catch(err){
      console.error(err);
    }

  };

  const findUser = async (uid)=>{
    const data = getDatabase();
    const mySnapshot = await get(ref(data, `message`));
    const messageList =[];
    mySnapshot.forEach(child=>{
      let snapKey  = child.key+"";
      if(snapKey.includes(uid)){
        if(child.val().messageList){
          let chatSender = {};
          chatSender = child.val().messageList[0];
          chatSender['id'] =snapKey.replace(uid,"");
          messageList.push(chatSender);
        }
        else{
          return messageList;
        }
      }
    });
    try{
      for(msg of messageList){
      const selectedUserdata = firebase.firestore().collection("users").doc(msg.id);
      const doc =await selectedUserdata.get();
      console.log(doc);
      msg['sender'] = doc.data()['name'];
      msg['pic'] = doc.data()['profilePic'];
      var t = new Date(msg.time);
      var newformat = t.getHours() >= 12 ? 'PM' : 'AM'; 
      var time = ('0' + t.getHours()).slice(-2)+ ':' + ('0' + t.getMinutes()).slice(-2)+ ' ' + newformat; 
      msg['time'] = time;
      
    }
    }catch(err){
      console.error(err);
    }
    return messageList;
  };

  
  return (
  <ImageBackground
    source={require("../assets/evan-tang-IIxQMoT2F7A-unsplash.jpg")}
    style={styles.bg}
  >
    <View style={styles.containerMessages}>
      <View style={styles.top}>
        <Text style={styles.title}>Messages</Text>
        <TouchableOpacity>
          <Icon name="ellipsis-vertical" color={DARK_GRAY} size={20} />
        </TouchableOpacity>
      </View>

      <FlatList
        data={chats}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={()=>{loadChat(item.id,item.sender); navigation.navigate("ChatPop");}}>
            <Message
              image={item.pic}
              name={item.sender}
              lastMessage={item.text}
              time={item.time}
            />
          </TouchableOpacity>
        )}
      />
    </View>
  </ImageBackground>
  );
};

export default Messages;
