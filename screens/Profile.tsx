import React,{useState,useEffect} from "react";
import firebase from "firebase/compat";
import {
  ScrollView,
  View,
  Text,
  ImageBackground,
  TouchableOpacity,
} from "react-native";
import { Icon, ProfileItem } from "../components";
import styles, { WHITE } from "../assets/styles";
import { Navigation } from '../type';
import { useIsFocused } from "@react-navigation/native";

type Props = {
  navigation: Navigation;
};


const Profile = ({navigation}:Props) => {
  const isFocused = useIsFocused();

  const[likedUser,setLikedUser] = useState("");
  const [userLikeProfile,setUserLikeProfile]= useState<any[]>([]);
  const [userLikes,setUserLikes]= useState(0);

  const [profilePic,setProfilePic] = useState("");
  const[uName,setUName]=useState("");
  const[uAge,setUAge]=useState("");
  const[uState,setUState] = useState("");
  const[uStatus,setUStatus] = useState("");
  const[uSummary,setUSummary] = useState("");
  const[uDatingLoc,setUDatingLoc] = useState("");
  const[uEducation,setUEducation] = useState("");
  const[uEthnicity,setUEthnicity] = useState("");
  const[uIncome,setUIncome] = useState("");
  const[uJob,setUJob] = useState("");
  const[uReligion,setUReligion] = useState("");
  const[uSpeaks,setUSpeaks] = useState("");
  const[uDiet,setUDiet] = useState("");
  const[uDrinks,setUDrinks] = useState("");
  const[uDrugs,setUDrugs] = useState("");
  const[uOffspring,setUOffspring] = useState("");
  const[uSmokes,setUSmokes] = useState("");
  const[uGender,setUGender] = useState("");
  const[uHeight,setUHeight] = useState("");
  const[uPets,setUPets] = useState("");
  const[uOrientation,setUOrientation] = useState("");
  const[uSign,setUSign] = useState("");
  const[uBody,setUBody] = useState("");
  const[uMatch,setUMatch] = useState("");
  const[uId,setUId] = useState("");

    const loadChat = async (uid) => {
       const  current  = firebase.auth().currentUser;
        try{
        if(current!=null){
            firebase.firestore().collection("chatTitle").doc(current.uid)
            .update({
                selectedName: uName,
                userId:uId,
            });      
        }
        } catch (error:TypeError) {
        console.log(error.toString());
        }
  
    

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

     const updateUser = (item) => {
    const  current  = firebase.auth().currentUser;
    const id = current.uid;
    let userCache = [];
     firebase.firestore().collection('likes')
    .get()
    .then((querySnapshot) => {

          querySnapshot.forEach((snapshot) => {
            console.log('user up: ', snapshot.id);
            
            let userDetails = {};
            userDetails = snapshot.data();
            userDetails['id'] = String(snapshot.id);
            let numOfLikes =0;

            if(userDetails['id']==id){
              userCache=[...userDetails.likedProfile,...userCache];
            }
            if(userDetails['id']==item){
              userCache.push(item);
              setUserLikeProfile(userCache);
              numOfLikes = userDetails.numberOfLikes+1;
              setUserLikes(numOfLikes);
              setLikedUser(item);
            }
           
        })
        

            
        
    });
    
  };

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

  

    const users = async()=>{ 
      const  current  = firebase.auth().currentUser;
      const selectedUser = firebase.firestore().collection("chatTitle").doc(current.uid);
      const selectedDoc = await selectedUser.get();  
      setUMatch(selectedDoc.data()['match']);  
    setUId(selectedDoc.data()['userId']);
    if(current!=null){
      const user = firebase.firestore().collection("users").doc(selectedDoc.data()['userId']);
      
      const doc = await user.get();
      if (user.empty) {
        console.log('No such document!');
      } else {
          console.log('Document data:', doc.data());
          setProfilePic(doc.data()['profilePic']);
          setUName(doc.data()['name']);
          setUAge(doc.data()['age']);
          setUState(doc.data()['state']);
          setUSummary(doc.data()['summary']);
          setUDatingLoc(doc.data()['datingLoc']);
          setUEducation(doc.data()['education']);
          setUEthnicity(doc.data()['ethnicity']);
          setUGender(doc.data()['gender']);
          setUIncome(doc.data()['income']);
          setUReligion(doc.data()['religion']);
          setUJob(doc.data()['job']);
          setUStatus(doc.data()['status']);
          setUSpeaks(doc.data()['speaks']);
          setUDiet(doc.data()['diet']);
          setUDrinks(doc.data()['drinks']);
          setUDrugs(doc.data()['drugs']);
          setUOffspring(doc.data()['offspring']);
          setUSmokes(doc.data()['smokes']);
          setUHeight(doc.data()['height']);
          setUPets(doc.data()['pets']);
          setUOrientation(doc.data()['orientation']);
          setUSign(doc.data()['sign']);
          setUBody(doc.data()['bodyType']);
          console.log(profilePic);
        }  

        return doc;  
      }
  };


   useEffect(() => {
     if(isFocused){
        users();
     }    
  }, [isFocused]);

  if(uId!==""){
  return (
    <ImageBackground
      source={require("../assets/evan-tang-IIxQMoT2F7A-unsplash.jpg")}
      style={styles.bg}
    >
      <ScrollView style={styles.containerProfile}>
        <ImageBackground source={{uri:profilePic}} style={styles.photo}
        imageStyle={{borderRadius:150}}>
          <View style={[styles.top, {marginHorizontal:-50}]}>
            
          </View>
        
        </ImageBackground>
        <ProfileItem
          matches={uMatch}
          name={uName}
          summary={uSummary}
          age={uAge}
          state={uState}
          firstDate={uDatingLoc}
          bodyType={uBody}
          diet={uDiet}
          drinks={uDrinks}
          drugs={uDrugs}
          education={uEducation}
          ethnicity={uEthnicity}
          gender={uGender}
          height={uHeight}
          income={uIncome}
          job={uJob}
          offspring={uOffspring}
          orientation={uOrientation}
          pets={uPets}
          religion={uReligion}
          sign={uSign}
          smokes={uSmokes}
          speaks={uSpeaks}
          status={uStatus} 
          
        />

        <View style={styles.actionsProfile}>
          <TouchableOpacity style={styles.roundedButton} onPress={()=>{updateUser(uId);}}>
            <Icon name="heart-sharp" size={20} color={WHITE} />
            <Text style={styles.textButton}>Send likes</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.roundedButton} onPress={()=>{loadChat(uId); navigation.navigate("ChatPop");
            }}>
            <Icon name="chatbubble" size={20} color={WHITE} />
            <Text style={styles.textButton}>Chat Now</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </ImageBackground>
  );
  }else{
    return(
      <ImageBackground
      source={require("../assets/evan-tang-IIxQMoT2F7A-unsplash.jpg")}
      style={styles.bg}
    ></ImageBackground>
    );
  }
};

export default Profile;
