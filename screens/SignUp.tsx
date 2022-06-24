import React, { memo, useState,useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Background from '../components/LandingBackground';
import Logo from '../components/Logo';
import Header from '../components/Header';
import Button from '../components/Button';
import TextInput from '../components/TextInput';
import BackButton from '../components/BackButton';
import { theme } from '../assets/styles/theme';
import {getDatabase, get,set,ref} from "firebase/database";
import { Navigation } from '../type';
import {
  emailValidator,
  passwordValidator,
} from '../assets/core/util';
import firebase from "firebase/compat";
import "firebase/firestore"

type Props = {
  navigation: Navigation;
};

const RegisterScreen = ({ navigation }: Props) => {
  const [email, setEmail] = useState({ value: '', error: '' });
  const [password, setPassword] = useState({ value: '', error: '' });
  const [uid,setUid] = useState(null);


  const _onSignUpPressed = () => {
    const emailError = emailValidator(email.value);
    const passwordError = passwordValidator(password.value);

    try{
      if (emailError || passwordError) {
        setEmail({ ...email, error: emailError });
        setPassword({ ...password, error: passwordError });
        return;
      }

          firebase.auth()
          .createUserWithEmailAndPassword(email.value, password.value)
          .then(result =>{
            setUid(firebase.auth().currentUser.uid);
            firebase.firestore().collection("users").doc(firebase.auth().currentUser.uid)
            .set({
                name: "No Name",
                age:"No age",
                gender: "No Select",
                status: "No Select",
                orientation: "No Select",
                bodyType: "No Select",
                diet: "No Select",
                drinks: "No Select",
                drugs: "No Select",
                education: "No Select",
                ethnicity: "No Select",
                height: "No Select",
                income: "No Select",
                job: "No Select",
                offspring: "No Select",
                pets: "No Select",
                religion: "No Select",
                sign: "No Select",
                smokes: "No Select",
                speaks: "No Select",
                summary: "No Select",
                state:"No Select",
                profilePic:"No Pic",
                datingLoc:"No location",
              });
          })
          .then(result =>{
            firebase.firestore().collection("likes").doc(firebase.auth().currentUser.uid).set({
              likedProfile:[],
              numberOfLikes: 0,
              numberOfDislikes:0,
            });
          })
          .then(result =>{
            firebase.firestore().collection("chatTitle").doc(firebase.auth().currentUser.uid).set({
              chatTitle:"",
              userId:"",
              filter:false,
              match:"",
              edit:false,
            });
          })
          .catch(error => alert(error.message));
      navigation.navigate('CreateProfile');
    } catch (error:TypeError) {
      console.log(error.toString());
    }
  
    };

  return (
    <Background>
      <BackButton goBack={() => navigation.navigate('Landing')} />

      <Logo />

      <Header>Create Account</Header>

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
      />

      <TextInput
        label="Password"
        returnKeyType="done"
        value={password.value}
        onChangeText={text => setPassword({ value: text, error: '' })}
        error={!!password.error}
        errorText={password.error}
        secureTextEntry
      />

      <Button mode="contained" onPress={_onSignUpPressed} style={styles.button}>
        Sign Up
      </Button>

      <View style={styles.row}>
        <Text style={styles.label}>Already have an account? </Text>
        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <Text style={styles.link}>Login</Text>
        </TouchableOpacity>
      </View>
    </Background>
  );
};

const styles = StyleSheet.create({
  label: {
    color: "#FFFFFF",
  },
  button: {
    marginTop: 24,
  },
  row: {
    flexDirection: 'row',
    marginTop: 4,
  },
  link: {
    fontWeight: 'bold',
    color: theme.colors.primary,
  },
});

export default memo(RegisterScreen);