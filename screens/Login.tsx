import React, { memo, useState } from 'react';
import { TouchableOpacity, StyleSheet, Text, View, Alert } from 'react-native';
import Background from '../components/LandingBackground';
import Logo from '../components/Logo';
import Header from '../components/Header';
import Button from '../components/Button';
//import RNFetchBlob from 'react-native-fetch-blob';
import { jsonToCSV } from 'react-native-csv';
// import * as RNFS from 'react-native-fs';
import TextInput from '../components/TextInput';
import BackButton from '../components/BackButton';
import { theme } from '../assets/styles/theme';
import { emailValidator, passwordValidator } from '../assets/core/util';
import { Navigation } from '../type';
import firebase from "firebase/compat";

type Props = {
  navigation: Navigation;
};

const LoginScreen = ({ navigation }: Props) => {
  const [email, setEmail] = useState({ value: '', error: '' });
  const [password, setPassword] = useState({ value: '', error: '' });

  const _onLoginPressed = async() => {
    const emailError = emailValidator(email.value);
    const passwordError = passwordValidator(password.value);

    try{
      if (emailError || passwordError) {
        setEmail({ ...email, error: emailError });
        setPassword({ ...password, error: passwordError });
        return;
      }
     
        
    let temp = [];  
    firebase.auth()
    .signInWithEmailAndPassword(email.value, password.value)
    .then(() => {
      firebase.firestore().collection('likes')
      .get().then((querySnapshot) => {
        querySnapshot.forEach((snapshot) => {
          let userDetails = {};
          userDetails['likes'] = snapshot.data()['numberOfLikes'];
          userDetails['dislikes'] = snapshot.data()['numberOfDislikes'];
          userDetails['likedProfile'] = JSON.stringify(snapshot.data()['likedProfile']);
          temp.push(userDetails);
        })
      })

                      
    })
    .then(()=>{
      firebase.firestore().collection('users')
      .get().then((querySnapshot)=>{
        let count = 0;
          querySnapshot.forEach((snapshot) => {
                console.log('login Id: ', snapshot.data()['age']);
                let userDetails = {};
                let label = 0;
                if(snapshot.id === firebase.auth().currentUser.uid) {
                  label=1;
                }
                temp[count].age = snapshot.data()['age'];
                temp[count].bodyType= snapshot.data()["bodyType"];
                temp[count].datingLoc= snapshot.data()['datingLoc'];
                temp[count].diet= snapshot.data()['diet'];
                temp[count].drinks= snapshot.data()['drinks'];
                temp[count].drugs= snapshot.data()['drugs'];
                temp[count].education= snapshot.data()['education'];
                temp[count].ethnicity= snapshot.data()['ethnicity'];
                temp[count].gender= snapshot.data()['gender'];
                temp[count].height= snapshot.data()['height'];
                temp[count].id= snapshot.id;
                temp[count].income= snapshot.data()['income'];
                temp[count].job= snapshot.data()['job'];
                temp[count].name= snapshot.data()['name'];
                temp[count].offspring= snapshot.data()['offspring'];
                temp[count].orientation= snapshot.data()['orientation'];
                temp[count].pets= snapshot.data()['pets'];
                temp[count].profilePic= snapshot.data()['profilePic'];
                temp[count].religion= snapshot.data()['religion'];
                temp[count].sign= snapshot.data()['sign'];
                temp[count].smokes= snapshot.data()['smokes'];
                temp[count].speaks=snapshot.data()['speaks'];
                temp[count].state=snapshot.data()['state'];
                temp[count].status= snapshot.data()['status'];
                temp[count].summary= snapshot.data()['summary'];
                temp[count].label=label;
                
                count++;

          })
          console.log("with label",temp);
        const results = jsonToCSV(temp);
        
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
    .catch((error) =>{
      console.log(error)
    })

        

      })
    })
    .then(()=>{
      const  current  = firebase.auth().currentUser;
      firebase.firestore().collection("chatTitle").doc(current.uid)
            .update({
                selectedName: "",
                userId:"",
                filter:false,
                match:"",
                edit:false,
                search:{
                  minAge:"",
                  maxAge:"",
                  minHeight:"",
                  maxHeight:"",
                  isPress:"",
                  isPressB:"",
                  state:"",
                  status:"",
                  education:"",
                  industry:"",
            },
            });
    })
    .then(() => navigation.navigate('Tabs'))
    .catch(error => alert(error.message));
      
      } catch (error:TypeError) {
        console.log(error);
    }
      

  };


  return (
    <Background>
      <BackButton goBack={() => navigation.navigate('Landing')} />

      <Logo />

      <Header>Welcome back.</Header>

      <TextInput
        label="Email"
        returnKeyType="next"
        value={email.value}
        onChangeText={text => setEmail({ value: text, error: '' })}
        error={!!email.error}
        errorText={email.error}
        autoCapitalize="none"
        autoCompleteType="email"
        textContentType="emailAddress"
        keyboardType="email-address"
        testID="input_email"
      />

      <TextInput
        label="Password"
        returnKeyType="done"
        value={password.value}
        onChangeText={text => setPassword({ value: text, error: '' })}
        error={!!password.error}
        errorText={password.error}
        testID="input_password"
        secureTextEntry
        
      />

      <Button mode="contained" onPress={_onLoginPressed}>
          Login
      </Button>

      <View style={styles.row}>
        <Text style={styles.label}>Don’t have an account? </Text>
        <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
          <Text style={styles.link}>Sign up</Text>
        </TouchableOpacity>
      </View>
    </Background>
  );
};

const styles = StyleSheet.create({
  forgotPassword: {
    width: '100%',
    alignItems: 'flex-end',
    marginBottom: 24,
  },
  row: {
    flexDirection: 'row',
    marginTop: 4,
  },
  label: {
    color: "#FFFFFF",
  },
  link: {
    fontWeight: 'bold',
    color: theme.colors.primary,
  },
});

export default memo(LoginScreen);