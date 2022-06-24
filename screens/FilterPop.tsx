import React, { useState, useEffect } from 'react';
import { Text, TouchableOpacity, Modal, View, ImageBackground, Slider, Picker,ScrollView } from "react-native";
import Icon from "../components/Icon";
import BackButton from "../components/BackButton";
import styles, { DARK_GRAY, WHITE, SECONDARY_COLOR, PRIMARY_COLOR, YELLOW } from "../assets/styles";
import { Navigation } from '../type';
import firebase from "firebase/compat";
import { useIsFocused } from "@react-navigation/native";
type Props = {
  navigation: Navigation;
};

const FilterPop = ({navigation}:Props) => {

    const isFocused = useIsFocused();
    const [minAge, setMinAge] = useState(18);
    const [maxAge, setMaxAge] = useState(18);
    const [minHeight, setMinHeight] = useState(100);
    const [maxHeight, setMaxHeight] = useState(220);
    const [isPress, setIsPress] = useState(true);
    const [isPressB, setIsPressB] = useState(false);
    const [state, setState] = useState("");
    const [status, setStatus] = useState("");
    const [education, setEducation] = useState("");
    const [industry, setIndustry] = useState("");


    const saveSearch = async () => {
    const  current  = firebase.auth().currentUser;
    try{
    if(current!=null){
        firebase.firestore().collection("chatTitle").doc(current.uid)
        .update({
            search:{
                minAge:minAge,
                maxAge:maxAge,
                minHeight:minHeight,
                maxHeight:maxHeight,
                isPress:isPress,
                isPressB:isPressB,
                state:state,
                status:status,
                education:education,
                industry:industry,
            },
            filter:true,
        }); 
        navigation.navigate("Profile");     
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
            if (sessionData.empty) {
                console.log('No such document!');
            } else {
                if(sessionDoc.data()['search'].minAge!==""){
                    setMinAge(sessionDoc.data()['search'].minAge)
                }
                if(sessionDoc.data()['search'].maxAge!==""){
                    setMaxAge(sessionDoc.data()['search'].maxAge)
                }
                if(sessionDoc.data()['search'].minHeight!==""){
                    setMinHeight(sessionDoc.data()['search'].minHeight)
                }
                if(sessionDoc.data()['search'].maxHeight!==""){
                    setMaxHeight(sessionDoc.data()['search'].maxHeight)
                }

                if((sessionDoc.data()['search'].isPress!=="")&&(sessionDoc.data()['search'].isPress==true)){
                    setIsPress(true);
                    setIsPressB(false);
                }
                if((sessionDoc.data()['search'].isPressB!=="")&&(sessionDoc.data()['search'].isPressB==true)){
                    setIsPress(false);
                    setIsPressB(true);
                }
                if(sessionDoc.data()['search'].state!==""){
                    setState(sessionDoc.data()['search'].state)
                }
                if(sessionDoc.data()['search'].status!==""){
                    setStatus(sessionDoc.data()['search'].status)
                }
                if(sessionDoc.data()['search'].education!==""){
                    setEducation(sessionDoc.data()['search'].education)
                }
                if(sessionDoc.data()['search'].industry!==""){
                    setIndustry(sessionDoc.data()['search'].industry)
                }
            }  
            }
    };
  
        useEffect(() => {
        if(isFocused){
            users();
        }    
    }, [isFocused]);
    return(
        <ImageBackground source={require("../assets/evan-tang-IIxQMoT2F7A-unsplash.jpg")} style={[styles.bg]}>
            <ScrollView style={styles.containerProfile}>
            <BackButton goBack={() => {navigation.navigate("Tabs")}}/>
            <View style={[styles.containerHome]}>
                <View style={{ flexDirection: 'row', paddingBottom: 20 }}>

                    <Text style={[{ left: 28, fontWeight: 'bold',fontSize: 20, marginTop:30 }]}>Search Preference</Text>
                </View>
                <View style={[styles.info]}>
                    <Text style={[styles.iconProfile,{marginTop:-20,left:-10}]}>
                        Minimum Age:
                    </Text>
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                        <Slider
                            style={{ width: 300 }}
                            step={1}
                            minimumValue={18}
                            maximumValue={70}
                            value={minAge}
                            thumbTintColor={SECONDARY_COLOR}
                            minimumTrackTintColor={SECONDARY_COLOR}
                            maximumTrackTintColor={PRIMARY_COLOR}
                            onValueChange={(value)=>setMinAge(value)}
                        />
                        <Text style={styles.iconProfile}>
                            {minAge}
                        </Text>


                    </View>
                </View>

                <View style={[styles.info]}>
                    <Text style={[styles.iconProfile,{marginTop:-20,left:-10}]}>
                        Maximum Age:
                    </Text>
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                        <Slider
                            style={{ width: 300 }}
                            step={1}
                            minimumValue={minAge}
                            maximumValue={70}
                            value={maxAge}
                            thumbTintColor={SECONDARY_COLOR}
                            minimumTrackTintColor={SECONDARY_COLOR}
                            maximumTrackTintColor={PRIMARY_COLOR}
                            onValueChange={(value)=>setMaxAge(value)}
                        />
                        <Text style={styles.iconProfile}>
                            {maxAge}
                        </Text>


                    </View>
                </View>

                <View style={styles.info}>
                    <Text style={[styles.iconProfile,{marginTop:-20,left:-10, width:100}]}>
                        Minimum Height(cm):
                    </Text>
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', }}>
                        <Slider
                            style={{ width: 300 }}
                            step={1}
                            minimumValue={100}
                            maximumValue={220}
                            value={minHeight}
                            thumbTintColor={SECONDARY_COLOR}
                            minimumTrackTintColor={SECONDARY_COLOR}
                            maximumTrackTintColor={PRIMARY_COLOR}
                            onValueChange={(value)=>setMinHeight(value)}
                        />
                        <Text style={styles.iconProfile}>
                            {minHeight}
                        </Text>


                    </View>

                </View>

                <View style={styles.info}>
                    <Text style={[styles.iconProfile,{marginTop:-20,left:-10, width:100}]}>
                        Maximum Height(cm):
                    </Text>
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', }}>
                        <Slider
                            style={{ width: 300 }}
                            step={1}
                            minimumValue={minHeight}
                            maximumValue={220}
                            value={maxHeight}
                            thumbTintColor={SECONDARY_COLOR}
                            minimumTrackTintColor={SECONDARY_COLOR}
                            maximumTrackTintColor={PRIMARY_COLOR}
                            onValueChange={(value)=>setMaxHeight(value)}
                        />
                        <Text style={styles.iconProfile}>
                            {maxHeight}
                        </Text>


                    </View>

                </View>



                <View style={styles.info}>
                    <Text style={styles.iconProfile}>
                        Gender:
                    </Text>
                    <View style={styles.actionsProfile}>
                        <TouchableOpacity style={styles.roundedButton} onPress={()=>{setIsPress(true);setIsPressB(false);}}>
                            <Icon name="md-man" size={20} color={ isPress ? YELLOW : WHITE} />
                            <Text style={[styles.textButton, { color: isPress ? YELLOW : WHITE }]}>Male</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.roundedButton} onPress={()=>{setIsPress(false);setIsPressB(true);}}>
                            <Icon name="md-woman" size={20} color={ isPressB ? YELLOW : WHITE} />
                            <Text style={[styles.textButton,{ color: isPressB ? YELLOW : WHITE }]}>Female</Text>
                        </TouchableOpacity>
                    </View>

                </View>

                <View style={[styles.info]}>
                    <Text style={styles.iconProfile}>
                        State/Province:
                    </Text>
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', borderRadius: 10, borderWidth: 1, borderColor: SECONDARY_COLOR }}>
                        <Picker
                            // itemStyle={styles.itemStyle}
                            mode="dropdown"
                            style={[styles.pickerStyle, { color: SECONDARY_COLOR }]}
                            selectedValue={state}
                            onValueChange={(itemValue) => {setState(itemValue)}}
                        >
                            <Picker.Item label='Please select an option...' value="" />
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

                <View style={[styles.info]}>
                    <Text style={styles.iconProfile}>
                        Status:
                    </Text>
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', borderRadius: 10, borderWidth: 1, borderColor: SECONDARY_COLOR }}>
                        <Picker
                            // itemStyle={styles.itemStyle}
                            mode="dropdown"
                            style={[styles.pickerStyle, { color: SECONDARY_COLOR }]}
                            selectedValue={status}
                            onValueChange={(itemValue) => {setStatus(itemValue)}}
                        >
                            <Picker.Item label='Please select an option...' value="" />
                            <Picker.Item color={DARK_GRAY} label="Single" value="single" />
                            <Picker.Item color={DARK_GRAY} label="Married" value="married" />


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
                            onValueChange={(itemValue) =>{ setEducation(itemValue)}}
                        >
                            <Picker.Item label='Please select an option...' value="" />
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
                            onValueChange={(itemValue) =>{setIndustry(itemValue)}}
                        >
                            <Picker.Item label='Please select an option...' value="" />
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

                <View style={styles.actionsProfile}>
                    <TouchableOpacity style={styles.roundedButton} onPress={()=>{ saveSearch(); navigation.navigate("Matches");}}>
                        <Icon name="md-search" size={20} color={WHITE} />
                        <Text style={styles.textButton}>Search</Text>
                    </TouchableOpacity>
                </View>
            </View>
            </ScrollView>
        </ImageBackground>
    );


};

export default FilterPop;
