import React,{useState,useEffect} from "react";
import {
  ScrollView,
  View,
  Text,
  ImageBackground,
  TouchableOpacity,
} from "react-native";
import { Icon,AccItem } from "../components";
import styles, { WHITE } from "../assets/styles";
import firebase from "firebase/compat";
import { Navigation } from '../type';
import { useIsFocused } from "@react-navigation/native";
type Props = {
  navigation: Navigation;
};

const Account = ({ navigation }: Props) => {
  const isFocused = useIsFocused();
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

  const users = async()=>{ 
    await firebase.firestore().collection('users').get();

    const  current  = firebase.auth().currentUser;
    if(current!=null){
      const user = firebase.firestore().collection("users").doc(current.uid)
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

    const updateSession = async () => {
    const  current  = firebase.auth().currentUser;
    try{
      if(current!=null){
        firebase.firestore().collection("chatTitle").doc(current.uid)
        .update({
          edit:true,
        });     
      }
    } catch (error:TypeError) {
    console.log(error.toString());
    }
  
    

  };
  const signOutUser = async () => {
    try {
        await firebase.auth().signOut();
        
        navigation.navigate('Landing');
    } catch (e) {
        console.log(e);
    }
  }

  useEffect(() => {
    if(isFocused){
        users();
    }    
  }, [isFocused]);
  return (
    <ImageBackground
      source={require("../assets/evan-tang-IIxQMoT2F7A-unsplash.jpg")}
      style={styles.bg}
    >
      <ScrollView style={styles.containerProfile}>
        <ImageBackground source={{uri:profilePic}} style={styles.photo}>
          <View style={[styles.top,{marginHorizontal:-50}]}>
            <TouchableOpacity>
              <Icon
                name="chevron-back"
                size={20}
                color={WHITE}
                style={styles.topIconLeft}
              />
            </TouchableOpacity>

            <TouchableOpacity>
              <Icon
                name="ellipsis-vertical"
                size={20}
                color={WHITE}
                style={styles.topIconRight}
              />
            </TouchableOpacity>
          </View>
        </ImageBackground>

        <AccItem
          
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
          editSummary={()=>{
            updateSession();
            navigation.navigate('CreateProfile4');
          }} 
          editBackground={()=>{
            updateSession();
            navigation.navigate('CreateProfile2');
          }}
          editLifeStyle={()=>{
            updateSession();
            navigation.navigate('CreateProfile3');
          }}
          editBasic={()=>{
            updateSession();
            navigation.navigate('CreateProfile');
          }}
          editDating={()=>{
            updateSession();
            navigation.navigate('CreateProfile4');
          }} 
          
        />

        <View style={styles.actionsProfile}>
          <TouchableOpacity style={styles.roundedButton} onPress={()=>{signOutUser();}}>
            <Icon name="log-in-outline" size={20} color={WHITE} />
            <Text style={styles.textButton}>Logout</Text>
          </TouchableOpacity>


        </View>

      </ScrollView>
    </ImageBackground>
  );
};

export default Account;
