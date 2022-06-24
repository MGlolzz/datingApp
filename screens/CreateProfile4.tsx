import React, { useState, useEffect,Component } from 'react';
import { Text, TouchableOpacity, View, ImageBackground, Slider,Alert,Picker,CheckBox,ScrollView } from "react-native";
import Icon from "../components/Icon";
import { TextInput } from "react-native-gesture-handler";
import styles, { DARK_GRAY, WHITE, SECONDARY_COLOR, PRIMARY_COLOR, YELLOW } from "../assets/styles";
import { Navigation } from '../type';
import {customStyles} from "../assets/styles/customStyles";
import {labels} from "../assets/styles/labels";
import StepIndicator from "react-native-step-indicator";
import * as ImagePicker from 'expo-image-picker';
import  firebase from 'firebase/compat';
import {getDatabase, get,set,ref} from "firebase/database";
import 'firebase/storage';
import { useIsFocused } from "@react-navigation/native";
import { jsonToCSV } from 'react-native-csv';

type Props = {
  navigation: Navigation;
};


const CreateProfile4 = ({ navigation }: Props) => {
    const isFocused = useIsFocused();
    const [summary, setSummary] = useState("");
    const [image, setImage] = useState("");

    const [park,setPark] = useState({bool:false,value:"park"});
    const [shopping,setShopping] = useState({bool:false,value:"shopping"});
    const [museum,setMuseum] = useState({bool:false,value:"museum"});
    const [cinema,setCinema] = useState({bool:false,value:"cinema"});
    const [carnival,setCarnival] = useState({bool:false,value:"carnival"});
    const [climbing,setClimbing] = useState({bool:false,value:"climbing"});
    const [library,setLibrary] = useState({bool:false,value:"library"});
    const [spa,setSpa] = useState({bool:false,value:"spa"});
    const [skating,setSkating] = useState({bool:false,value:"skating"});
    const [karaoke,setKaraoke] = useState({bool:false,value:"karaoke"});
    const [cafe,setCafe] = useState({bool:false,value:"cafe"});
    const [bowling,setBowling] = useState({bool:false,value:"bowling"});
    const [datingLoc, setDatingLoc] = useState("");
    const [isEdit, setIsEdit] = useState(false);

    const uploadData = ()=>{
        const  current  = firebase.auth().currentUser;
        try{
        if(current!=null){
            firebase.firestore().collection("users").doc(current.uid)
            .update({
                summary: summary,
                profilePic:image.uri?image.uri:"",
                datingLoc:datingLoc,

            });      
        }
        } catch (error:TypeError) {
        console.log(error.toString());
        }
    };
    
    useEffect(() => {
        if(image){
            const  current  = firebase.auth().currentUser;
            loadAvatar(current.uid);
        };




  },[image]);

  const users = async()=>{ 
        const  current  = firebase.auth().currentUser;
       
        if(current!=null){
            const user = firebase.firestore().collection("users").doc(current.uid);
            const sessionData = firebase.firestore().collection("chatTitle").doc(current.uid);
            const sessionDoc = await sessionData.get();
            setIsEdit(sessionDoc.data()['edit']);
            
            const doc = await user.get();
            if (user.empty) {
                console.log('No such document!');
            } else {
                if(doc.data()['profilePic']!==""){
                    const source = {uri:doc.data()['profilePic']};
                    setImage(source);
                }
                if(doc.data()['summary']!=="No Select"){
                    setSummary(doc.data()['summary']);
                }


                let locationList = [];
                locationList = (doc.data()['datingLoc']).replace(/\s/g, '').split(',');
                console.log(locationList);
                if(doc.data()['datingLoc']!=="" &&doc.data()['datingLoc']!== "No location"){
                    locationList.map(location => {
                    if(park.value==location){
                        setPark({bool:true,value:park.value})
                    }
                    else if(shopping.value==location){
                        setShopping({bool:true,value:shopping.value})
                    }
                    else if(museum.value==location){
                        setMuseum({bool:true,value:museum.value})
                    }
                    else if(cinema.value==location){
                        setCinema({bool:true,value:cinema.value})
                    }
                    else if(carnival.value==location){
                        setCarnival({bool:true,value:carnival.value})
                    }
                    else if(climbing.value==location){
                        setClimbing({bool:true,value:climbing.value})
                    }
                    else if(library.value==location){
                       setLibrary({bool:true,value:library.value})
                    }
                    else if(spa.value==location){
                        setSpa({bool:true,value:spa.value});
                    }   
                    else if(skating.value==location){
                        setSkating({bool:true,value:skating.value})
                    }
                    else if(karaoke.value==location){
                        setKaraoke({bool:true,value:karaoke.value})
                    }
                    else if(cafe.value==location){
                        setCafe({bool:true,value:cafe.value})
                    }
                    else if(bowling.value==location){
                        setBowling({bool:true,value:bowling.value})
                    }

                })

                }
                
                


            }  

            return doc;  
        }
    };

    useEffect(() => {
        if(isFocused){
            users();
        }    
    }, [isFocused]);








  const loadAvatar = async (uid) => {
    try{
      const data = getDatabase();
      const user  = await findUser(uid);
      if(user){
        const avatarImg = {
          avatar:image.uri,

        }
        set(ref(data,`users/${uid}`),avatarImg);
      }
    }catch(err){
      console.error(err);
    }
    

  };

  const findUser = async (uid)=>{

    const data = getDatabase();
    const mySnapshot = await get(ref(data, `users/${uid}`));
    return mySnapshot.val();
  };
      useEffect(() => {
combineLocation();
    }, [park.bool,shopping.bool,museum.bool,cinema.bool,carnival.bool, climbing.bool, library.bool, spa.bool, skating.bool, karaoke.bool, cafe.bool, bowling.bool]);

    const combineLocation =()=>{
        let loc = "";
        if(park.bool){
            loc+=park.value+", ";
        }
        if(shopping.bool){
            loc+=shopping.value+", ";
        }
        if(museum.bool){
            loc+=museum.value+", ";
        }
        if(cinema.bool){
            loc+=cinema.value+", ";
        }
        if(carnival.bool){
            loc+=carnival.value+", ";
        }
        if(climbing.bool){
            loc+=climbing.value+", ";
        }
        if(library.bool){
            loc+=library.value+", ";
        }
        if(spa.bool){
            loc+=spa.value+", ";
        }   
        if(skating.bool){
            loc+=skating.value+", ";
        }
        if(karaoke.bool){
            loc+=karaoke.value+", ";
        }
        if(cafe.bool){
            loc+=cafe.value+", ";
        }
        if(bowling.bool){
            loc+=bowling.value+", ";
        }

        console.log(loc);
        // if(loc.length!=0){
        //     loc=loc.substring(0,loc.length-2);
        // }


        setDatingLoc(loc);

    };

    const updateSession = async () => {
    const  current  = firebase.auth().currentUser;
    try{
      if(current!=null){
        firebase.firestore().collection("chatTitle").doc(current.uid)
        .update({
          edit:false,
        });     
      }
    } catch (error:TypeError) {
    console.log(error.toString());
    }
  
    

  };

    const uploadImage =  async() => {
        const  current  = firebase.auth().currentUser;
        
        const uploadUri  = image.uri+"";
        let filename  = uploadUri.substring(uploadUri.lastIndexOf('/')+1);
        console.log(filename);
        console.log("hi");
        if(uploadUri!=""){
             try {
            await
                firebase.storage()
                .ref(uploadUri)
                .child(current.uid)
                .put(
                filename
                );
            } catch (error) {
                console.log(error, JSON.stringify(error, null, 2));
            }
        }
       

    };

    const modelling =()=>{
              firebase.firestore().collection('users')
      .get().then((querySnapshot)=>{
        let temp = [];
          querySnapshot.forEach((snapshot) => {
                console.log('user Id: ', snapshot.id);
                let userDetails = {};
                userDetails ={
                  "age": snapshot.data()['age'],
                  "bodyType": snapshot.data()["bodyType"],
                  "datingLoc": snapshot.data()['datingLoc'],
                  "diet": snapshot.data()['diet'],
                  "drinks": snapshot.data()['drinks'],
                  "drugs": snapshot.data()['drugs'],
                  "education": snapshot.data()['education'],
                  "ethnicity": snapshot.data()['ethnicity'],
                  "gender": snapshot.data()['gender'],
                  "height": snapshot.data()['height'],
                  "id": snapshot.id,
                  "income": snapshot.data()['income'],
                  "job": snapshot.data()['job'],
                  "name": snapshot.data()['name'],
                  "offspring": snapshot.data()['offspring'],
                  "orientation": snapshot.data()['orientation'],
                  "pets": snapshot.data()['pets'],
                  "profilePic": snapshot.data()['profilePic'],
                  "religion": snapshot.data()['religion'],
                  "sign": snapshot.data()['sign'],
                  "smokes": snapshot.data()['smokes'],
                  "speaks": snapshot.data()['speaks'],
                  "state": snapshot.data()['state'],
                  "status": snapshot.data()['status'],
                  "summary": snapshot.data()['summary'],
};
                
                temp.push(userDetails);
          })

        const results = jsonToCSV(temp);
        console.log(results);
        fetch("http://192.168.1.2:5000/api/add", {
   method: 'POST',
   headers: {
      Accept: 'application/json',
     'Content-Type': 'application/json',
   },
   body: JSON.stringify({ 
       data : temp,
    })
 })
   .then(res => res.json())
   .then((responseJson) => {
        if(responseJson.affected > 0) {
            Alert.alert('Record Added');
        }
        else {
            Alert.alert('Error updating record');
        }
   })
    .catch((error) =>{
      console.log(error)
    })

        

      })
    };

    const pickImage = async () => {
    // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
        });

        console.log(result);

        if (!result.cancelled ) {
            const source = {uri:result.uri};
            console.log(source);
            setImage(source);
        }
    };


    return(
        
        <ImageBackground source={require("../assets/evan-tang-IIxQMoT2F7A-unsplash.jpg")} style={styles.bg}>
            <ScrollView style={styles.containerProfile}>
                <View style={[styles.containerHome]}>
                    <View style={[{justifyContent: "center",flexDirection: 'row' }]}>

                    {!isEdit && (
                        <Text style={[{fontWeight: 'bold',fontSize:30, marginBottom:20 }]}>Let's create your profile</Text>
                    )}
                    {isEdit && (
                        <Text style={[{fontWeight: 'bold',fontSize:30, marginBottom:20 }]}>Update profile</Text>
                    )}

                    </View>
                    <StepIndicator
                        customStyles={customStyles}
                        currentPosition={3}
                        labels={labels}
                        stepCount={4}
                    /> 
                <View style={[{flexDirection: 'row' }]}>

                        {/* <Text style={[{fontWeight: 'bold',fontSize:20 }]}>Preference</Text>  */}

                    </View>

                    <View style={[styles.info]}>
                        <Text style={styles.iconProfile}>
                            Summary:
                        </Text>
                        <View style={[styles.profileInputs]}>
                            <TextInput multiline value={summary} onChangeText={(summary) => setSummary(summary)}/>


                        </View> 

                    </View>

                    <View style={[styles.info]}>
                        <Text style={styles.iconProfile}>
                            Dating Location:
                        </Text>
                        <View style={{ flex: 1, justifyContent:"flex-start",  borderRadius: 10, borderWidth: 1, borderColor: SECONDARY_COLOR }}>
                            <View style={styles.checkboxContainer}>
                                <CheckBox value={park.bool} onChange={()=>{
                                setPark({bool:!park.bool,value:park.value});combineLocation();
                            }}/>
                                <Text style={styles.checkboxLabel}>Jog At Park</Text>

                            </View>

                            <View style={styles.checkboxContainer}>
                                <CheckBox value={shopping.bool} onChange={()=>{
                                setShopping({bool:!shopping.bool,value:shopping.value});combineLocation();
                            }}/>
                                <Text style={styles.checkboxLabel}>Thrift shopping</Text>
                            </View>
                            <View style={styles.checkboxContainer}>
                                <CheckBox value={museum.bool} onChange={()=>{
                                setMuseum({bool:!museum.bool,value:museum.value});combineLocation();
                            }}/>
                                <Text style={styles.checkboxLabel}>Visit Museum</Text>
                            </View>
                            <View style={styles.checkboxContainer}>
                                <CheckBox value={cinema.bool} onChange={()=>{
                                setCinema({bool:!cinema.bool,value:cinema.value});combineLocation();
                            }}/>
                                <Text style={styles.checkboxLabel}>Cinema</Text>
                            </View>
                            <View style={styles.checkboxContainer}>
                                <CheckBox value={carnival.bool} onChange={()=>{
                                setCarnival({bool:!carnival.bool,value:carnival.value});combineLocation();
                            }}/>
                                <Text style={styles.checkboxLabel}>Carnival</Text>
                            </View>
                            <View style={styles.checkboxContainer}>
                                <CheckBox value={climbing.bool} onChange={()=>{
                                setClimbing({bool:!climbing.bool,value:climbing.value});combineLocation();
                            }}/>
                                <Text style={styles.checkboxLabel}>Mount Climbing</Text>
                            </View>
                            <View style={styles.checkboxContainer}>
                                <CheckBox value={library.bool} onChange={()=>{
                                setLibrary({bool:!library.bool,value:library.value});combineLocation();
                            }}/>
                                <Text style={styles.checkboxLabel}>Library</Text>
                            </View>
                            <View style={styles.checkboxContainer}>
                                <CheckBox value={spa.bool} onChange={()=>{
                                setSpa({bool:!spa.bool,value:spa.value});combineLocation();
                            }}/>
                                <Text style={styles.checkboxLabel}>Spa</Text>
                            </View>
                            <View style={styles.checkboxContainer}>
                                <CheckBox value={skating.bool} onChange={()=>{
                                setSkating({bool:!skating.bool,value:skating.value});combineLocation();
                            }}/>
                                <Text style={styles.checkboxLabel}>Skating</Text>
                            </View>
                            <View style={styles.checkboxContainer}>
                                <CheckBox value={karaoke.bool} onChange={()=>{
                                setKaraoke({bool:!karaoke.bool,value:karaoke.value});combineLocation();
                            }}/>
                                <Text style={styles.checkboxLabel}>Karaoke</Text>
                            </View>
                            <View style={styles.checkboxContainer}>
                                <CheckBox value={cafe.bool} onChange={()=>{
                                setCafe({bool:!cafe.bool,value:cafe.value});combineLocation();
                            }}/>
                                <Text style={styles.checkboxLabel}>Cafe/Dining</Text>
                            </View>
                            <View style={styles.checkboxContainer}>
                                <CheckBox value={bowling.bool} onChange={()=>{
                                setBowling({bool:!bowling.bool,value:bowling.value});combineLocation();
                            }}/>
                                <Text style={styles.checkboxLabel}>Bowling</Text>
                            </View>
                        </View>

                    </View>

                    <View style={[styles.info]}>
                        <Text style={styles.iconProfile}>
                            Profile Picture:
                        </Text>
                        
                        <ImageBackground
                            source={{ uri: image.uri }}
                            style={[styles.photo, {width: 150,height: 150,borderWidth:2, borderColor: SECONDARY_COLOR, borderRadius:10}]}
                            ></ImageBackground>
                        
                        

                    </View>
                    <View style={styles.actionsProfile}>
                        <TouchableOpacity style={[styles.roundedButton,{marginBottom:20}]} onPress={pickImage}>
                            <Icon name="camera-sharp" size={20} color={WHITE} />
                            <Text style={styles.textButton}>Select profile Image</Text>
                            
                        </TouchableOpacity>

                    </View>

                    
                    

                    {
                        !isEdit &&(
                            <View style={styles.actionsProfile}>
                                <TouchableOpacity style={styles.roundedButton} onPress={() => { uploadImage(); uploadData();navigation.navigate('CreateProfile3');}}>
                                    <Icon name="ios-chevron-back-sharp" size={20} color={WHITE} />
                                    <Text style={styles.textButton}>Back</Text>
                                    
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.roundedButton} onPress={() => { uploadImage(); uploadData(); modelling(); navigation.navigate('Tabs'); }}>
                                    
                                    <Text style={styles.textButton}>Create Profile</Text>
                                    <Icon name="ios-chevron-forward-sharp" size={20} color={WHITE} />
                                </TouchableOpacity>
                            </View>
                        )
                    }
                    
                    {isEdit && (
                            <View style={styles.actionsProfile}>
                                <TouchableOpacity style={styles.roundedButton} onPress={() => { uploadImage(); uploadData();updateSession(); navigation.navigate('Tabs'); }}>
                                    
                                    <Text style={styles.textButton}>Save</Text>
                                    <Icon name="ios-chevron-forward-sharp" size={20} color={WHITE} />
                                </TouchableOpacity>
                            </View>

                        )

                    }

                    
                </View>
            </ScrollView>
        </ImageBackground>
        



    );

    

};

export default CreateProfile4;
