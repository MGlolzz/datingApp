import React, { useState, useEffect,Component } from 'react';
import { Text, TouchableOpacity, View, ImageBackground, Slider, Picker,Modal } from "react-native";
import Icon from "../components/Icon";
import { TextInput } from "react-native-gesture-handler";
import styles, { DARK_GRAY, WHITE, SECONDARY_COLOR, PRIMARY_COLOR, YELLOW } from "../assets/styles";
import {customStyles} from "../assets/styles/customStyles";
import {labels} from "../assets/styles/labels";
import { Navigation } from '../type';
import StepIndicator from "react-native-step-indicator";
import firebase from "firebase/compat";
import { useIsFocused } from "@react-navigation/native";

type Props = {
  navigation: Navigation;
};


const CreateProfile = ({ navigation }: Props) => {
    const isFocused = useIsFocused();
    const [name, setName] = useState("");
    const [age, setAge] = useState("");
    const [height, setHeight] = useState("");
    const [orientation, setOrientation] = useState("");
    const [status, setStatus] = useState("");
    const [state, setState] = useState("");
    const [sign, setSign] = useState("");
    const [body, setBody] = useState("");
    const [isPress, setIsPress] = useState(true);
    const [isPressB, setIsPressB] = useState(false);
    const [isEdit, setIsEdit] = useState(false);
    
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
        };
    };
    const uploadData = ()=>{
        const  current  = firebase.auth().currentUser;
        try{
        if(current!==null){ 
            firebase.firestore().collection("users").doc(current.uid)
            .update({
                name: name,
                age:age,
                gender: isPress?"male":"female",
                status: status,
                orientation: orientation,
                bodyType: body,
                height: height,
                sign: sign,
                state:state,
            });
            
        }
        } catch (error:TypeError) {
        console.log(error.toString());
        }
    };
    
    const users = async()=>{ 
        const  current  = firebase.auth().currentUser;
        const sessionData = firebase.firestore().collection("chatTitle").doc(current.uid);
        if(current!=null){
            const user = firebase.firestore().collection("users").doc(current.uid);
            const sessionDoc = await sessionData.get();
            setIsEdit(sessionDoc.data()['edit']);
            
            const doc = await user.get();
            if (user.empty) {
                console.log('No such document!');
            } else {
                

                setName(doc.data()['name']);
                setAge(doc.data()['age']);
                setHeight(doc.data()['height']);
                setState(doc.data()['state']);
                setStatus(doc.data()['status']);
                setOrientation(doc.data()['orientation']);
                setSign(doc.data()['sign']);
                setBody(doc.data()['bodyType']);
                console.log(profilePic);
                if(doc.data()['gender']=="female"){
                    setIsPress(false);
                    setIsPressB(true);
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

    return(

        <ImageBackground source={require("../assets/evan-tang-IIxQMoT2F7A-unsplash.jpg")} style={styles.bg}>


            <View style={[styles.containerHome]}>
                <View style={[{justifyContent: "center",flexDirection: 'row' }]}>
                    {!isEdit && (
                        <Text style={[{fontWeight: 'bold',fontSize:30, marginBottom:20 }]}>Let's create your profile</Text>
                    )}
                    {isEdit && (
                        <Text style={[{fontWeight: 'bold',fontSize:30, marginBottom:20 }]}>Update profile</Text>
                    )}
                    

                </View>
                <View testID="stepper">
                <StepIndicator
                    customStyles={customStyles}
                    currentPosition={0}
                    labels={labels}
                    stepCount={4}
                    
                /> 
                </View>
               <View style={[{flexDirection: 'row' }]}>

                    <Text style={[{fontWeight: 'bold',fontSize:20 }]}>Basic Information</Text> 

                </View>


                <View style={[styles.info]} testID = "name_label">
                    <Text style={styles.iconProfile}>
                        Name:
                    </Text>
                    <View style={[styles.profileInputs]}>
                        <TextInput  value={name} onChangeText={(nameText) => setName(nameText)} testID = "name_input"/>


                    </View>
                </View>
                <View style={styles.info} testID = "gender_label">
                    <Text style={styles.iconProfile}>
                        Gender:
                    </Text>
                    <View style={styles.actionsProfile}>
                        <TouchableOpacity style={styles.roundedButton} onPress={()=>{setIsPress(true);setIsPressB(false);}} testID = "male_button">
                            <Icon name="md-man" size={20} color={ isPress ? YELLOW : WHITE} />
                            <Text style={[styles.textButton, { color: isPress ? YELLOW : WHITE }]}>Male</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.roundedButton} onPress={()=>{setIsPress(false);setIsPressB(true);}}
                        testID = "female_button">
                            <Icon name="md-woman" size={20} color={ isPressB ? YELLOW : WHITE} />
                            <Text style={[styles.textButton,{ color: isPressB ? YELLOW : WHITE }]}>Female</Text>
                        </TouchableOpacity>
                    </View>

                </View>

                <View style={styles.info} testID = "age_label">
                    <Text style={styles.iconProfile}>
                        Age:
                    </Text>
                     <View style={[styles.profileInputs]}>
                        <TextInput value={age} onChangeText={(ageText) => setAge(ageText)} keyboardType='numeric'maxLength={2} testID = "age_input"/>


                    </View>

                </View>



                

                <View style={[styles.info,]} testID = "height_label">
                    <Text style={styles.iconProfile}>
                        Height(cm):
                    </Text>
                    <View style={[styles.profileInputs]}>
                        <TextInput value={height} keyboardType='numeric'maxLength={3} onChangeText={(heightText) => setHeight(heightText)}   testID = "height_input"></TextInput>


                    </View>

                </View>

                <View style={[styles.info]} >
                    <Text style={styles.iconProfile}>
                        Orientation:
                    </Text>
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', borderRadius: 10, borderWidth: 1, borderColor: SECONDARY_COLOR }}>
                        <Picker
                            // itemStyle={styles.itemStyle}
                            mode="dropdown"
                            style={[styles.pickerStyle, { color: SECONDARY_COLOR }]}
                            selectedValue={orientation}
                            onValueChange={(itemValue) =>{if(itemValue!=0) setOrientation(itemValue);}}
                            testID = "orientation"
                        >
                            <Picker.Item label='Please select an option...' value='0' />
                            <Picker.Item color={DARK_GRAY} label="Straight" value="straight" />
                            <Picker.Item color={DARK_GRAY} label="Gay" value="gay" />
                            <Picker.Item color={DARK_GRAY} label="Bisexual" value="bisexual" />
                            <Picker.Item color={DARK_GRAY} label="Friends only" value="friends" />


                        </Picker>


                    </View>

                </View>

                <View style={[styles.info]} >
                    <Text style={styles.iconProfile}>
                        Status:
                    </Text>
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', borderRadius: 10, borderWidth: 1, borderColor: SECONDARY_COLOR }}>
                        <Picker
                            // itemStyle={styles.itemStyle}
                            mode="dropdown"
                            style={[styles.pickerStyle, { color: SECONDARY_COLOR }]}
                            selectedValue={status}
                            onValueChange={(itemValue) => {if(itemValue!=0)setStatus(itemValue);}}
                            testID = "status_picker"
                        >
                            <Picker.Item label='Please select an option...' value='0' />
                            <Picker.Item color={DARK_GRAY} label="Single" value="single" />
                            <Picker.Item color={DARK_GRAY} label="Married" value="married" />


                        </Picker>


                    </View>

                </View>

                <View style={[styles.info]} >
                    <Text style={styles.iconProfile}>
                        State/Province:
                    </Text>
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', borderRadius: 10, borderWidth: 1, borderColor: SECONDARY_COLOR }}>
                        <Picker
                            // itemStyle={styles.itemStyle}
                            mode="dropdown"
                            style={[styles.pickerStyle, { color: SECONDARY_COLOR }]}
                            selectedValue={state}
                            onValueChange={(itemValue) => {if(itemValue!=0)setState(itemValue);}}
                            testID = "state_picker"
                        >
                            <Picker.Item label='Please select an option...' value='0' />
                            <Picker.Item color={DARK_GRAY} label="Selangor" value="selangor" />
                            <Picker.Item color={DARK_GRAY} label="Pahang" value="pahang" />
                            <Picker.Item color={DARK_GRAY} label="Pulau Pinang" value="pulaupinang" />
                            <Picker.Item color={DARK_GRAY} label="Kedah" value="kedah" />
                            <Picker.Item color={DARK_GRAY} label="Perak" value="perak" />
                            <Picker.Item color={DARK_GRAY} label="Terengganu" value="terengganu" />
                            <Picker.Item color={DARK_GRAY} label="Perlis" value="perlis" />
                            <Picker.Item color={DARK_GRAY} label="Johor" value="johor" />
                            <Picker.Item color={DARK_GRAY} label="Kelantan" value="kelantan" />
                            <Picker.Item color={DARK_GRAY} label="Melacca" value="melacca" />
                            <Picker.Item color={DARK_GRAY} label="Sabah" value="sabah" />
                            <Picker.Item color={DARK_GRAY} label="Sarawak" value="sarawak" />


                        </Picker>


                    </View>

                </View>

                <View style={[styles.info]} >
                    <Text style={styles.iconProfile}>
                        Sign/Horoscope:
                    </Text>
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', borderRadius: 10, borderWidth: 1, borderColor: SECONDARY_COLOR }}>
                        <Picker
                            // itemStyle={styles.itemStyle}
                            mode="dropdown"
                            style={[styles.pickerStyle, { color: SECONDARY_COLOR }]}
                            selectedValue={sign}
                            onValueChange={(itemValue) => {if(itemValue!=0)setSign(itemValue);}}
                            testID = "sign_picker"
                        >
                            <Picker.Item label='Please select an option...' value='0' />
                            <Picker.Item color={DARK_GRAY} label="Aries" value="aries" />
                            <Picker.Item color={DARK_GRAY} label="Taurus" value="taurus" />
                            <Picker.Item color={DARK_GRAY} label="Gemini" value="gemini" />
                            <Picker.Item color={DARK_GRAY} label="Cancer" value="cancer" />
                            <Picker.Item color={DARK_GRAY} label="Leo" value="leo" />
                            <Picker.Item color={DARK_GRAY} label="Virgo" value="virgo" />
                            <Picker.Item color={DARK_GRAY} label="Libra" value="libra" />
                            <Picker.Item color={DARK_GRAY} label="Scorpio" value="scorpio" />
                            <Picker.Item color={DARK_GRAY} label="Sagittarius" value="sagittarius" />
                            <Picker.Item color={DARK_GRAY} label="Capricorn" value="capricorn" />
                            <Picker.Item color={DARK_GRAY} label="Aquarius" value="aquarius" />
                            <Picker.Item color={DARK_GRAY} label="Pisces" value="pisces" />

                        </Picker>


                    </View>

                </View>

                <View style={[styles.info]} >
                    <Text style={styles.iconProfile}>
                        Body Tpye:
                    </Text>
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', borderRadius: 10, borderWidth: 1, borderColor: SECONDARY_COLOR }}>
                        <Picker
                            // itemStyle={styles.itemStyle}
                            mode="dropdown"
                            style={[styles.pickerStyle, { color: SECONDARY_COLOR }]}
                            selectedValue={body}
                            onValueChange={(itemValue) => {if(itemValue!=0)setBody(itemValue);}}
                            testID = "body_picker"
                        >
                            <Picker.Item label='Please select an option...' value='0' />
                            <Picker.Item color={DARK_GRAY} label="Thin" value="thin" />
                            <Picker.Item color={DARK_GRAY} label="Fit" value="fit" />
                            <Picker.Item color={DARK_GRAY} label="Average" value="average" />
                            <Picker.Item color={DARK_GRAY} label="Overweight" value="overweight" />

                        </Picker>


                    </View>

                </View>

                

                {!isEdit &&(
                <View style={styles.actionsProfile} >
                    <TouchableOpacity style={styles.roundedButton} onPress={() => {uploadData(); navigation.navigate('CreateProfile2');}} testID = "next_button">
                        
                        <Text style={styles.textButton}>Next</Text>
                        <Icon name="ios-chevron-forward-sharp" size={20} color={WHITE} />
                    </TouchableOpacity>
                </View>
                )}

                

                {isEdit && (
                            <View style={styles.actionsProfile}>
                                <TouchableOpacity style={styles.roundedButton} onPress={() => { uploadData();updateSession(); navigation.navigate('Tabs'); }}>
                                    
                                    <Text style={styles.textButton}>Save</Text>
                                    <Icon name="ios-chevron-forward-sharp" size={20} color={WHITE} />
                                </TouchableOpacity>
                            </View>

                        )

                    }
            </View>

        </ImageBackground>



    );

    

};

export default CreateProfile;
