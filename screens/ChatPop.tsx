import React ,{useState,useEffect,useLayoutEffect} from "react";
import { Text, TouchableOpacity, Modal,View, ImageBackground,FlatList,Image,TextInput,StyleSheet} from "react-native";
import Icon from "../components/Icon";
import styles, {WHITE} from "../assets/styles";
import { ChatTitle } from "../components"; 
import { Navigation } from '../type';
import Background from '../components/Background';
import LandingBackground from '../components/LandingBackground';
import firebase from "firebase/compat";
import {getDatabase, get,set,ref, update} from "firebase/database";
type Props = {
  navigation: Navigation;

};

const ChatPop = ({navigation}:Props) => {

  const [chatHeader,setChatHeader] = useState("");
  const [userId,setUserId] = useState("");
  const [chats,setChats] = useState([]);
  const [text, setText] = useState("");
  const [currentUserPic,setCurrentUserPic] = useState("");
  const [selectedUserPic,setSelectedUserPic] = useState("");
  useEffect(() => {
    if(chatHeader==""){
      users();
 
    }
    

  },[userId]);

  useEffect(()=>{if(userId!==""){
    onLoading();}
  
  },[userId]);

  const users = async()=>{ 

    const  current  = firebase.auth().currentUser;

    if(current!=null){
      const user = firebase.firestore().collection("chatTitle").doc(current.uid);
      const currentUserdata = firebase.firestore().collection("users").doc(current.uid);
      
      
      const doc = await user.get();
      const currentUserDoc = await currentUserdata.get();
      if (user.empty) {
        console.log('No such document!');
      } else {
          console.log('Document data:', doc.data());
          setUserId(doc.data()['userId']);
          setChatHeader(doc.data()['selectedName']);
          setCurrentUserPic(currentUserDoc.data()['profilePic'])
          
        }  

        return doc;  
      }
  };

  const onLoading = async() => {
    console.log("load");
    try{

      const  current  = firebase.auth().currentUser;
      const data = getDatabase();
      const user  = await findUser(current.uid);
      
      if(user.length!==0){
        setChats(user);
      
      }
    }catch(err){
      console.error(err);
    }

  };

  const findUser = async (uid)=>{

    const data = getDatabase();
    const selectedUserdata = firebase.firestore().collection("users").doc(userId);
    const doc = await selectedUserdata.get();
    setSelectedUserPic(doc.data()['profilePic']);
    const mySnapshot = await get(ref(data, `message`));
    const messageID1 =uid+userId+"";
    const messageID2 = userId+uid+"";
    const messageList=[];
    const res = mySnapshot.forEach(child=>{
    
      if((child.key==messageID1) ||(child.key==messageID2)){
        if(child.val().messageList){
          child.val().messageList.forEach(msg=>{
          messageList.push(msg);
          });
        }
        else{
          return messageList;
        }
        

      }

      
    });
     console.log("message"+messageList.length);
    return messageList;
  };

  const onSend = async(text) => {
    const  current  = firebase.auth().currentUser;
    const data = getDatabase();
    const messageList = {
          messageList:[
            {
              text:text,
              time:Date.now(),
              sender:current.uid,
            },
              ...chats,
          ]
    }
    if(chats){
      const messageID1 =current.uid+userId+"";
      const messageID2 = userId+current.uid+"";
      const mySnapshot = await get(ref(data, `message/${messageID1}`));
      if(mySnapshot.val()){ 
        set(ref(data,`message/${messageID1}`),messageList);
      }
      else{
        set(ref(data,`message/${messageID2}`),messageList);
      }     
    }else{
       try{
          set(ref(data,`message/${current.uid}${userId}`),messageList);    
        }catch(err){
          console.error(err);
        }
    }
    onLoading();
    setText("");
  };
  return (
      

    
    <View style={styles.ChatContainer}>
      <ChatTitle title={chatHeader} goBack={() => navigation.navigate('Tabs')}/>
      <Background>
      <Image source={require('../assets/logo.png')} style={style.image} />
      </Background>
        <FlatList style={styles.ChatList}
        inverted
            data={chats}
            keyExtractor={(_, index) => index.toString()}
            renderItem={(message) => {
                
                const item = message.item;
                const  current  = firebase.auth().currentUser;
                let inMessage = item.sender !== current.uid;
                let profilePic = (item.sender !== current.uid)?selectedUserPic:currentUserPic;
                let itemStyle = inMessage ? styles.chatItemIn : styles.chatItemOut;
                var t = new Date(item.time);
                var newformat = t.getHours() >= 12 ? 'PM' : 'AM'; 
                var time = ('0' + t.getHours()).slice(-2)
    + ':' + ('0' + t.getMinutes()).slice(-2)
    + ' ' + newformat; 
                return (


                 
                <View style={[styles.chatItem, itemStyle]}>
                   {inMessage && <ImageBackground source={{uri:profilePic}} style={[styles.chatAvatar]}
        imageStyle={{borderRadius:150}}/>}
                    {!inMessage }
                    
                    <View style={[styles.chatBalloon]}>

                    <Text style={{color:"#FFFFFF"}}>{item.text}</Text>
                    <Text style={[{color:"#FFFFFF",fontSize:10},itemStyle]}>{time}</Text>
                    </View>

                    {inMessage}
                    {!inMessage && <ImageBackground source={{uri:profilePic}} style={[styles.chatAvatar]}
        imageStyle={{borderRadius:150}}/>}

                </View>

                )
            }}
        />
        
        <View style={[styles.chatFooter]}>
            <View style={styles.chatInputContainer}>
                <TextInput style={styles.chatInputs}
                    placeholder="Write a message..."
                    underlineColorAndroid='transparent'
                    numberOfLines={10}
                    onChangeText={(text) => setText(text)}
                    value={text}
                    />
            </View>

            <TouchableOpacity style={styles.circledButton} onPress={()=>{onSend(text)}}>
                <Icon name="send" size={20} color={WHITE} />
            </TouchableOpacity>
        </View>
      </View>
  );
};

const style = StyleSheet.create({
  image: {
    width: 128,
    height: 128,
    marginBottom: -420,
    opacity: 0.5,
  },
});

export default ChatPop;

