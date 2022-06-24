import React, { useState, useEffect,Component } from 'react';
import { Text, TouchableOpacity, View, ImageBackground, Slider, Picker,Modal } from "react-native";
import Icon from "../components/Icon";
import styles, { DARK_GRAY, WHITE, SECONDARY_COLOR, PRIMARY_COLOR, YELLOW } from "../assets/styles";
import { Navigation } from '../type';
import {customStyles} from "../assets/styles/customStyles";
import {labels} from "../assets/styles/labels";
import StepIndicator from "react-native-step-indicator";
import firebase from "firebase/compat";
import { useIsFocused } from "@react-navigation/native";

type Props = {
  navigation: Navigation;
};


const CreateProfile2 = ({ navigation }: Props) => {
    const isFocused = useIsFocused();
    const [ethnicity, setEthnicity] = useState("");
    const [religion, setReligion] = useState("");
    const [speaks, setSpeaks] = useState("");
    const [education, setEducation] = useState("");
    const [industry, setIndustry] = useState("");
    const [income, setIncome] = useState("");
    const [isEdit, setIsEdit] = useState(false);


    const uploadData = ()=>{
        const  current  = firebase.auth().currentUser;
        try{
        if(current!=null){
            firebase.firestore().collection("users").doc(current.uid)
            .update({
                education: education,
                ethnicity: ethnicity,
                income: income,
                job:industry,
                religion: religion,
                speaks: speaks,
                
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
                
                setEducation(doc.data()['education']);
                setEthnicity(doc.data()['ethnicity']);
                setIncome(doc.data()['income']);
                setReligion(doc.data()['religion']);
                setIndustry(doc.data()['job']);
                setSpeaks(doc.data()['speaks']);

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
            edit:false,
            });     
        }
        } catch (error:TypeError) {
        console.log(error.toString());
        };
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
                    currentPosition={1}
                    labels={labels}
                    stepCount={4}
                /> 
               <View style={[{flexDirection: 'row' }]}>

                    <Text style={[{fontWeight: 'bold',fontSize:20 }]}>Background</Text> 

                </View>

                <View style={[styles.info]}>
                    <Text style={styles.iconProfile}>
                        Ethnicity:
                    </Text>
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', borderRadius: 10, borderWidth: 1, borderColor: SECONDARY_COLOR }}>
                        <Picker
                            // itemStyle={styles.itemStyle}
                            mode="dropdown"
                            style={[styles.pickerStyle, { color: SECONDARY_COLOR }]}
                            selectedValue={ethnicity}
                            onValueChange={(itemValue) =>{if(itemValue!=0) setEthnicity(itemValue);}}
                        >
                            <Picker.Item label='Please select an option...' value='0' />
                            <Picker.Item color={DARK_GRAY} label="Malay" value="malay" />
                            <Picker.Item color={DARK_GRAY} label="Indian" value="indian" />
                            <Picker.Item color={DARK_GRAY} label="Chinese" value="chinese" />
                            <Picker.Item color={DARK_GRAY} label="Others" value="others" />


                        </Picker>


                    </View>

                </View>

                <View style={[styles.info]}>
                    <Text style={styles.iconProfile}>
                        Religion:
                    </Text>
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', borderRadius: 10, borderWidth: 1, borderColor: SECONDARY_COLOR }}>
                        <Picker
                            // itemStyle={styles.itemStyle}
                            mode="dropdown"
                            style={[styles.pickerStyle, { color: SECONDARY_COLOR }]}
                            selectedValue={religion}
                            onValueChange={(itemValue) =>{if(itemValue!=0) setReligion(itemValue);}}
                        >
                            <Picker.Item label='Please select an option...' value='0' />
                            <Picker.Item color={DARK_GRAY} label="Muslim" value="muslim" />
                            <Picker.Item color={DARK_GRAY} label="Buddhist" value="buddhist" />
                            <Picker.Item color={DARK_GRAY} label="Christian" value="christian" />
                            <Picker.Item color={DARK_GRAY} label="Hindu" value="hindu" />
                            <Picker.Item color={DARK_GRAY} label="Sikhism" value="sikhism" />
                            <Picker.Item color={DARK_GRAY} label="Others" value="others" />

                        </Picker>


                    </View>

                </View>

                <View style={[styles.info]}>
                    <Text style={styles.iconProfile}>
                        Speaks:
                    </Text>
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', borderRadius: 10, borderWidth: 1, borderColor: SECONDARY_COLOR }}>
                        <Picker
                            // itemStyle={styles.itemStyle}
                            mode="dropdown"
                            style={[styles.pickerStyle, { color: SECONDARY_COLOR }]}
                            selectedValue={speaks}
                            onValueChange={(itemValue) =>{if(itemValue!=0) setSpeaks(itemValue);}}
                        >
                            <Picker.Item label='Please select an option...' value='0' />
                            <Picker.Item color={DARK_GRAY} label="Chinese" value="chinese" />
                            <Picker.Item color={DARK_GRAY} label="English" value="English" />
                            <Picker.Item color={DARK_GRAY} label="Malay" value="malay" />
                            <Picker.Item color={DARK_GRAY} label="Chinese&English" value="chinese&english" />
                            <Picker.Item color={DARK_GRAY} label="Chinese&Malay" value="chinese&malay" />
                            <Picker.Item color={DARK_GRAY} label="Malay&English" value="chinese&english" />
                            <Picker.Item color={DARK_GRAY} label="All 3 languages" value="all" />
                            <Picker.Item color={DARK_GRAY} label="Others" value="Others" />

                            

                        </Picker>


                    </View>

                </View>

                <View style={[styles.info]}>
                    <Text style={styles.iconProfile}>
                        Education:
                    </Text>
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', borderRadius: 10, borderWidth: 1, borderColor: SECONDARY_COLOR }}>
                        <Picker
                            // itemStyle={styles.itemStyle}
                            mode="dropdown"
                            style={[styles.pickerStyle, { color: SECONDARY_COLOR }]}
                            selectedValue={education}
                            onValueChange={(itemValue) =>{if(itemValue!=0) setEducation(itemValue);}}
                        >
                            <Picker.Item label='Please select an option...' value='0' />
                            <Picker.Item color={DARK_GRAY} label="Primary" value="primary" />
                            <Picker.Item color={DARK_GRAY} label="Secondary School" value="secondary" />
                            <Picker.Item color={DARK_GRAY} label="Pre-University" value="preU" />
                            <Picker.Item color={DARK_GRAY} label="University" value="University" />
                            <Picker.Item color={DARK_GRAY} label="No Formal Education" value="NoEdu" />
                            

                        </Picker>


                    </View>

                </View>

                <View style={[styles.info]}>
                    <Text style={styles.iconProfile}>
                        Industry:
                    </Text>
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', borderRadius: 10, borderWidth: 1, borderColor: SECONDARY_COLOR }}>
                        <Picker
                            // itemStyle={styles.itemStyle}
                            mode="dropdown"
                            style={[styles.pickerStyle, { color: SECONDARY_COLOR }]}
                            selectedValue={industry}
                            onValueChange={(itemValue) =>{if(itemValue!=0) setIndustry(itemValue);}}
                        >
                            <Picker.Item label='Please select an option...' value='0' />
                            <Picker.Item color={DARK_GRAY} label="Artistic" value="artistic" />
                            <Picker.Item color={DARK_GRAY} label="Financial&Investment" value="finance" />
                            <Picker.Item color={DARK_GRAY} label="Clerical" value="clerical" />
                            <Picker.Item color={DARK_GRAY} label="Computer" value="computer" />
                            <Picker.Item color={DARK_GRAY} label="Construction" value="construction" />
                            <Picker.Item color={DARK_GRAY} label="Education" value="education" />
                            <Picker.Item color={DARK_GRAY} label="Entertainment" value="entertainment" />
                            <Picker.Item color={DARK_GRAY} label="Executive" value="executive" />
                            <Picker.Item color={DARK_GRAY} label="Hospitality" value="hospitality" />
                            <Picker.Item color={DARK_GRAY} label="Law" value="law" />
                            <Picker.Item color={DARK_GRAY} label="Medicine" value="medicine" />
                            <Picker.Item color={DARK_GRAY} label="Military" value="military" />
                            <Picker.Item color={DARK_GRAY} label="Government" value="government" />
                            <Picker.Item color={DARK_GRAY} label="Retired" value="retired" />
                            <Picker.Item color={DARK_GRAY} label="Sales&Marketing" value="sales" />
                            <Picker.Item color={DARK_GRAY} label="Science" value="science" />
                            <Picker.Item color={DARK_GRAY} label="Student" value="student" />
                            <Picker.Item color={DARK_GRAY} label="Logistic" value="logistic" />
                            <Picker.Item color={DARK_GRAY} label="Others" value="others" />
                            

                        </Picker>


                    </View>

                </View>

                <View style={[styles.info]}>
                    <Text style={styles.iconProfile}>
                        Income(RM):
                    </Text>
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', borderRadius: 10, borderWidth: 1, borderColor: SECONDARY_COLOR }}>
                        <Picker
                            // itemStyle={styles.itemStyle}
                            mode="dropdown"
                            style={[styles.pickerStyle, { color: SECONDARY_COLOR }]}
                            selectedValue={income}
                            onValueChange={(itemValue) =>{if(itemValue!=0) setIncome(itemValue);}}
                        >
                            <Picker.Item label='Please select an option...' value='0' />
                            <Picker.Item color={DARK_GRAY} label="Below 10k" value="<10k" />
                            <Picker.Item color={DARK_GRAY} label="10-20k" value="<20k" />
                            <Picker.Item color={DARK_GRAY} label="20-30k" value="<30k" />
                            <Picker.Item color={DARK_GRAY} label="30-50k" value="<50k" />
                            <Picker.Item color={DARK_GRAY} label="Above 50k" value=">50k" />
                            

                        </Picker>


                    </View>

                </View>
                

                {!isEdit&&(
                <View style={styles.actionsProfile}>
                    <TouchableOpacity style={styles.roundedButton} onPress={() => navigation.navigate('CreateProfile')}>
                        <Icon name="ios-chevron-back-sharp" size={20} color={WHITE} />
                        <Text style={styles.textButton}>Back</Text>
                        
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.roundedButton} onPress={() => {uploadData();navigation.navigate('CreateProfile3');}}>
                        
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


export default CreateProfile2;
