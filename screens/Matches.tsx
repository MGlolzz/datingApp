import React,{useEffect,useState} from "react";
import {
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
  FlatList,
} from "react-native";
import { CardItem, Icon } from "../components";
import BackButton from "../components/BackButton";
import firebase from "firebase/compat";
import styles, { DARK_GRAY } from "../assets/styles";
import {Navigation} from '../type';
import { useIsFocused } from "@react-navigation/native";
type Props = {
  navigation: Navigation;
};
const Matches = ({navigation}:Props) => {
  const isFocused = useIsFocused();
  const [profile,setProfile]=useState<any[]>([]);
  const [tempProfile,setTempProfile]=useState<any[]>([]);
  const [recoData,setRecoData] = useState<any[]>([]);
  const loadProfile = async (uid,uName,uMatch) => {
       const  current  = firebase.auth().currentUser;
        try{
        if(current!=null){
            firebase.firestore().collection("chatTitle").doc(current.uid)
            .update({
                selectedName: uName,
                userId:uid,
                match:uMatch,
            }); 
            navigation.navigate("Profile");     
        }
        } catch (error:TypeError) {
        console.log(error.toString());
        }
  
    

  };
  useEffect(()=>{
    if(isFocused){

      const  current  = firebase.auth().currentUser;


      const id = current.uid;
        firebase.firestore().collection('users')
      .get()
      .then((querySnapshot) => {
          let temp = [];
          querySnapshot.forEach((snapshot) => {
              
              if(snapshot.id!==id){
              
                let userDetails = {};
                userDetails = snapshot.data();
                userDetails['id'] = snapshot.id;
                temp.push(userDetails);
              }
              
              
          })
          let filtered = [];
          firebase.firestore().collection("chatTitle").doc(current.uid).get().then((querySnapshot) => {
            console.log(querySnapshot.data()['search']);
            if(querySnapshot.data()['filter']){
              temp.forEach((user)=>{
              if((user.age<querySnapshot.data()['search'].minAge) || (user.age>querySnapshot.data()['search'].maxAge)) {
                return;
              }
              if((user.height<querySnapshot.data()['search'].minHeight) || (user.height>querySnapshot.data()['search'].maxHeight)) {
                return;
              }
              if((querySnapshot.data()['search'].education!=="") && (user.education !== querySnapshot.data()['search'].education)){
                return;
              }
              if((querySnapshot.data()['search'].industry!=="") && (user.job !== querySnapshot.data()['search'].industry)){
                return;
              }
              if((querySnapshot.data()['search'].state!=="") &&(user.state !== querySnapshot.data()['search'].state)){
                return;
              }
              if((querySnapshot.data()['search'].status!=="") && (user.status !== querySnapshot.data()['search'].status)){
                return;
              }
              if(querySnapshot.data()['search'].isPress && user.gender=="female"){
                return;
              }
              if(querySnapshot.data()['search'].isPressB && user.gender=="male"){
                return;
              }
              filtered.push(user);
            })
            console.log("filter",filtered);
            setTempProfile(filtered);
            }
            else{
               console.log("non filter",temp);
              setTempProfile(temp);

            }
            
            
            
          });

          
      })
      .then(() => {
      fetch("http://192.168.1.2:5000/api/get", {
        method:'GET', 
        headers:{
            Accept:'application/json', 
            'Content-Type':'application/json'
          }
      })
      .then(res => res.json())
        .then(data => {  
          setRecoData(data)

    })
  .catch((error) =>{
    console.log(error)
  })
    });
    }
    
        
    
      
      
      
    },[isFocused]);

    const addMatches = ()=>{
    let temp = [];
    
        console.log("tempProfile",tempProfile.length);
    console.log("matched",recoData.length);

      tempProfile.forEach((matches)=>{
        recoData.forEach((profile)=>{
        let userData = {};
        userData = matches;
        if(profile.id === matches.id){
          userData['matches'] = profile.matches;
          temp.push(userData);
          
        }
      })
    })

    
    setProfile(temp);
  }

  useEffect(()=>{

      console.log("run here")
      addMatches();
    


  },[tempProfile]);

    return(
  <ImageBackground
    source={require("../assets/evan-tang-IIxQMoT2F7A-unsplash.jpg")}
    style={styles.bg}
  >
    
    <View style={styles.containerMatches}>
      
      <View style={styles.top}>
        <Text style={[styles.title]}>Matches</Text>
        <BackButton goBack={() => {navigation.navigate("Tabs")}}/>
      </View>

      <FlatList
        numColumns={2}
        data={profile}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={()=>{loadProfile(item.id,item.name,item.matches);}}>
            <CardItem
              image={item.profilePic}
              name={item.name}
              matches={item.matches}
              age={item.age}
              height={item.height}
              orientation = {item.orientation}
              status = {item.status}
              hasVariant
            />
          </TouchableOpacity>
        )}
      />
    </View>
  </ImageBackground>
    );
};

export default Matches;
