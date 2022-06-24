import React, { useState,useEffect } from "react";
import { View, ImageBackground,TouchableOpacity } from "react-native";
import CardStack, { Card } from "react-native-card-stack-swiper";
import { City, Filters, CardItem } from "../components";
import styles from "../assets/styles";
import DEMO from "../assets/data/demo";
import { Navigation } from '../type';
import firebase from "firebase/compat";
type Props = {
  navigation: Navigation;
};
const Home = ({navigation}:Props) => {
  const [swiper, setSwiper] = useState<CardStack | null>(null);
  const [profile,setProfile]=useState<any[]>([]);
  const [tempProfile, setTempProfile] = useState<any[]>([]);
  const[size,setSize] = useState(0);
  const [userLikeProfile,setUserLikeProfile]= useState<any[]>([]);
  const [userLikes,setUserLikes]= useState(0);
  const [userDislikes,setUserDislikes]= useState(0);
  const[likedUser,setLikedUser] = useState("");
  const[dislikedUser,setDislikedUser] = useState("");
  const [recoData,setRecoData] = useState<any[]>([]);

  const updateUser = (item,i) => {
    const  current  = firebase.auth().currentUser;
    const id = current.uid;
    let userCache = [];
    let count  =0;

    console.log(i);
     firebase.firestore().collection('likes')
    .get()
    .then((querySnapshot) => {

          querySnapshot.forEach((snapshot) => {
            console.log('user up: ', snapshot.id);
            
            let userDetails = {};
            userDetails = snapshot.data();
            userDetails['id'] = String(snapshot.id);
            

            if(userDetails['id']==id){
              console.log(userDetails.likedProfile);
              userCache=[...userDetails.likedProfile,...userCache];
              
            }
            
        })
        

            
        
    });

    firebase.firestore().collection('likes')
    .get()
    .then((querySnapshot) => {

          querySnapshot.forEach((snapshot) => {
            let userDetails = {};
            userDetails = snapshot.data();
            userDetails['id'] = String(snapshot.id);
            let numOfLikes =0;
            if(count==i){
              
              userCache.push(item.id);
              console.log("hi",userCache);
              setUserLikeProfile(userCache);
              numOfLikes = userDetails.numberOfLikes+1;
              setUserLikes(numOfLikes);
              setLikedUser(item.id);
              
            }
            count++;
            
        })
        

            
        
    });

    
  };

  const updateDislike = (item,i) => {
    let count  =0;
     firebase.firestore().collection('likes')
    .get()
    .then((querySnapshot) => {

          querySnapshot.forEach((snapshot) => {
            console.log('user up: ', snapshot.id);
            
            let userDetails = {};
            userDetails = snapshot.data();
            userDetails['id'] = String(snapshot.id);
            let numberOfDislikes = 0;


            if(count==i){

              numberOfDislikes = userDetails.numberOfDislikes+1;
              setUserDislikes(numberOfDislikes);
              setDislikedUser(item.id);
            }
            count++;
        })
        

            
        
    });
    
  };

  const updateLikeProfile = (userLikeProfile)=> {
    const  current  = firebase.auth().currentUser;
    const id = current.uid;
console.log(userLikeProfile);
     if(current){
        firebase.firestore()
        .collection('likes')
        .doc(id)
        .update({
          likedProfile: userLikeProfile,
        }).catch(error => alert(error.message));
  }
  };

    const updateLikeNumber = (userLikes,likedUser)=> {
    firebase.firestore()
    .collection('likes')
    .doc(likedUser)
    .update({
      numberOfLikes: userLikes,
    }).catch(error => alert(error.message));
  
  };

  const updateDislikeNumber = (userDislikes,dislikedUser)=> {
    firebase.firestore()
    .collection('likes')
    .doc(dislikedUser)
    .update({
      numberOfDislikes: userDislikes,
    }).catch(error => alert(error.message));
  
  };
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
    const  current  = firebase.auth().currentUser;
    const id = current.uid;
      firebase.firestore().collection('users')
    .get()
    .then((querySnapshot) => {
        let temp = [];
        console.log('Total users: ', querySnapshot.size);
        setSize(querySnapshot.size);
        querySnapshot.forEach((snapshot) => {
            
            if(snapshot.id!==id){
              console.log('user Id: ', snapshot.id);
              let userDetails = {};
              userDetails = snapshot.data();
              userDetails['id'] = snapshot.id;
              temp.push(userDetails);
              console.log("profile pic",userDetails.profilePic);
            }
            
            
        })
        setTempProfile(temp);
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
    
    
  },[]);

  const addMatches = ()=>{
    let temp = [];
    
    

      recoData.forEach((matches)=>{
        tempProfile.forEach((profile)=>{
        console.log(matches);
        let userData = {};
        userData = profile;
        if(profile.id === matches.id){
          userData['matches'] = matches.matches;
          temp.push(userData);
        }
      })
    })
      

    
    setProfile(temp);
  }

  useEffect(()=>{
    if(recoData.length>0){
      addMatches();
    }


  },[recoData]);

  useEffect(()=>{
    if(userLikeProfile.length > 0){

      updateLikeProfile(userLikeProfile);
    }

  },[likedUser]);

  useEffect(()=>{
    if(userLikes>0){
      updateLikeNumber(userLikes,likedUser);
    }


  },[likedUser]);

  useEffect(()=>{
    if(userDislikes>0){
      updateDislikeNumber(userDislikes,dislikedUser);
    }


  },[dislikedUser]);


















if(profile.length!=0){

  return (
<ImageBackground
      source={require("../assets/evan-tang-IIxQMoT2F7A-unsplash.jpg")}
      style={styles.bg} 
      testID="image_background"
    >
      <View style={styles.containerHome}>
        <View style={styles.top}>
          <City state="Malaysia" />
          <Filters saveFilter={()=>{navigation.navigate('FilterPop')}} />
        </View>

        <CardStack
          
          verticalSwipe={false}
          renderNoMoreCards={() => null}
          ref={(newSwiper): void => setSwiper(newSwiper)}
        >
          {profile.map((item,i) => (
            <Card key={item.id} onSwipedLeft={()=>{updateUser(item,i)}} onSwipedRight={()=>{updateDislike(item,i)}}>
               <TouchableOpacity onPress={()=>{loadProfile(item.id,item.name,item.matches);}}>
              <CardItem
                matches={item.matches}
                image={item.profilePic}
                name={item.name}
                age={item.age}
                summary={item.summary}
                orientation={item.orientation}
                status={item.status}
                height={item.height}
              />
              </TouchableOpacity>
            </Card>
          ))}
        </CardStack>
      </View>
    </ImageBackground>
  );
 }else{
        return(
          <ImageBackground
      source={require("../assets/evan-tang-IIxQMoT2F7A-unsplash.jpg")}
      style={styles.bg}
      testID="image_background"
    >
      <View>
        <View style={styles.top} testID ="city_filters">


                
          <City state="Malaysia" />
          <Filters saveFilter={()=>{navigation.navigate('FilterPop')}} />
          
        </View>
      </View>
      </ImageBackground>
            
        );
    }
};

export default Home;