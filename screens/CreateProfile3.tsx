import React, { useState, useEffect,Component } from 'react';
import { Text, TouchableOpacity, View, ImageBackground, Slider, Picker,Modal } from "react-native";
import Icon from "../components/Icon";
import styles, { DARK_GRAY, WHITE, SECONDARY_COLOR} from "../assets/styles";
import { Navigation } from '../type';
import {customStyles} from "../assets/styles/customStyles";
import {labels} from "../assets/styles/labels";
import StepIndicator from "react-native-step-indicator";
import firebase from "firebase/compat";
import { useIsFocused } from "@react-navigation/native";
type Props = {
  navigation: Navigation;
};


const CreateProfile3 = ({ navigation }: Props) => {
    const isFocused = useIsFocused();
    const [diet, setDiet] = useState("");
    const [drinking, setDrinking] = useState("");
    const [drugs, setDrugs] = useState("");
    const [offspring, setOffspring] = useState("");
    const [pets, setPets] = useState("");
    const [smokes, setSmokes] = useState("");
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
        if(current!=null){
            firebase.firestore().collection("users").doc(current.uid)
            .update({
                diet: diet,
                drinks: drinking,
                drugs: drugs,
                offspring: offspring,
                pets: pets,
                smokes: smokes,

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
            const sessionDoc = await sessionData.get();
            setIsEdit(sessionDoc.data()['edit']);
            const user = firebase.firestore().collection("users").doc(current.uid);
            
            const doc = await user.get();
            if (user.empty) {
                console.log('No such document!');
            } else {
            setDiet(doc.data()['diet']);
            setDrinking(doc.data()['drinks']);
            setDrugs(doc.data()['drugs']);
            setOffspring(doc.data()['offspring']);
            setSmokes(doc.data()['smokes']);
            setPets(doc.data()['pets']);


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
                 <StepIndicator
                    customStyles={customStyles}
                    currentPosition={2}
                    labels={labels}
                    stepCount={4}
                /> 
               <View style={[{flexDirection: 'row' }]}>

                    <Text style={[{fontWeight: 'bold',fontSize:20 }]}>Lifestyle</Text> 

                </View>

                <View style={[styles.info]}>
                    <Text style={styles.iconProfile}>
                        Diet:
                    </Text>
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', borderRadius: 10, borderWidth: 1, borderColor: SECONDARY_COLOR }}>
                        <Picker
                            // itemStyle={styles.itemStyle}
                            mode="dropdown"
                            style={[styles.pickerStyle, { color: SECONDARY_COLOR }]}
                            selectedValue={diet}
                            onValueChange={(itemValue) =>{if(itemValue!=0) setDiet(itemValue);}}
                        >
                            <Picker.Item label='Please select an option...' value='0' />
                            <Picker.Item color={DARK_GRAY} label="Vegetarian" value="vegetarian" />
                            <Picker.Item color={DARK_GRAY} label="Halal" value="halal" />
                            <Picker.Item color={DARK_GRAY} label="Kosher" value="kosher" />
                            <Picker.Item color={DARK_GRAY} label="Others" value="others" />


                        </Picker>


                    </View>

                </View>

                <View style={[styles.info]}>
                    <Text style={styles.iconProfile}>
                        Drinking:
                    </Text>
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', borderRadius: 10, borderWidth: 1, borderColor: SECONDARY_COLOR }}>
                        <Picker
                            // itemStyle={styles.itemStyle}
                            mode="dropdown"
                            style={[styles.pickerStyle, { color: SECONDARY_COLOR }]}
                            selectedValue={drinking}
                            onValueChange={(itemValue) =>{if(itemValue!=0) setDrinking(itemValue);}}
                        >
                            <Picker.Item label='Please select an option...' value='0' />

                            <Picker.Item color={DARK_GRAY} label="Do not drink" value="noDrink" />
                            <Picker.Item color={DARK_GRAY} label="Rarely" value="rarely" />
                            <Picker.Item color={DARK_GRAY} label="Socially/Often" value="socially" />

                        </Picker>


                    </View>

                </View>

                <View style={[styles.info]}>
                    <Text style={styles.iconProfile}>
                        Drugs:
                    </Text>
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', borderRadius: 10, borderWidth: 1, borderColor: SECONDARY_COLOR }}>
                        <Picker
                            // itemStyle={styles.itemStyle}
                            mode="dropdown"
                            style={[styles.pickerStyle, { color: SECONDARY_COLOR }]}
                            selectedValue={drugs}
                            onValueChange={(itemValue) => {if(itemValue!=0)setDrugs(itemValue);}}
                        >
                            <Picker.Item label='Please select an option...' value='0' />
                            <Picker.Item color={DARK_GRAY} label="Never" value="never" />
                            <Picker.Item color={DARK_GRAY} label="Sometimes" value="sometimes" />
                            <Picker.Item color={DARK_GRAY} label="Often" value="often" />

                            

                        </Picker>


                    </View>

                </View>

                <View style={[styles.info]}>
                    <Text style={styles.iconProfile}>
                        Offspring:
                    </Text>
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', borderRadius: 10, borderWidth: 1, borderColor: SECONDARY_COLOR }}>
                        <Picker
                            // itemStyle={styles.itemStyle}
                            mode="dropdown"
                            style={[styles.pickerStyle, { color: SECONDARY_COLOR }]}
                            selectedValue={offspring}
                            onValueChange={(itemValue) => {if(itemValue!=0)setOffspring(itemValue);}}
                        >
                            <Picker.Item label='Please select an option...' value='0' />
                            <Picker.Item color={DARK_GRAY} label="No Kids&Don't want kids" value="noKids&dw" />
                            <Picker.Item color={DARK_GRAY} label="Have Kids&Don't want kids" value="haveKids&dw" />
                            <Picker.Item color={DARK_GRAY} label="Have Kids&Want kids" value="haveKids&w" />
                            <Picker.Item color={DARK_GRAY} label="No Kids&Want kids" value="noKids&w" />
                            
                            

                        </Picker>


                    </View>

                </View>

                <View style={[styles.info]}>
                    <Text style={styles.iconProfile}>
                        Pets:
                    </Text>
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', borderRadius: 10, borderWidth: 1, borderColor: SECONDARY_COLOR }}>
                        <Picker
                            // itemStyle={styles.itemStyle}
                            mode="dropdown"
                            style={[styles.pickerStyle, { color: SECONDARY_COLOR }]}
                            selectedValue={pets}
                            onValueChange={(itemValue) =>{if(itemValue!=0) setPets(itemValue);}}
                        >
                            <Picker.Item label='Please select an option...' value='0' />
                            <Picker.Item color={DARK_GRAY} label="Likes Cats & Dogs" value="likeC&D" />
                            <Picker.Item color={DARK_GRAY} label="Like Cats& Dislike Dogs" value="likeC&dislikeD" />
                            <Picker.Item color={DARK_GRAY} label="Dislike Cats& Like Dogs" value="dislikeC&likeD" />
                            <Picker.Item color={DARK_GRAY} label="Dislike Cats& Dislike Dogs" value="dislikeC&dislikeD" />

                        </Picker>


                    </View>

                </View>

                <View style={[styles.info]}>
                    <Text style={styles.iconProfile}>
                        Smokes:
                    </Text>
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', borderRadius: 10, borderWidth: 1, borderColor: SECONDARY_COLOR }}>
                        <Picker
                            // itemStyle={styles.itemStyle}
                            mode="dropdown"
                            style={[styles.pickerStyle, { color: SECONDARY_COLOR }]}
                            selectedValue={smokes}
                            onValueChange={(itemValue) =>{if(itemValue!=0) setSmokes(itemValue);}}
                        >
                            <Picker.Item label='Please select an option...' value='0' />
                            <Picker.Item color={DARK_GRAY} label="Yes" value="y" />
                            <Picker.Item color={DARK_GRAY} label="No" value="n" />

                        </Picker>


                    </View>

                </View>
                

                {!isEdit && (
                    <View style={styles.actionsProfile}>
                    <TouchableOpacity style={styles.roundedButton} onPress={() => navigation.navigate('CreateProfile2')}>
                        <Icon name="ios-chevron-back-sharp" size={20} color={WHITE} />
                        <Text style={styles.textButton}>Back</Text>
                        
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.roundedButton} onPress={() => {uploadData();navigation.navigate('CreateProfile4');}}>
                        
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

export default CreateProfile3;
