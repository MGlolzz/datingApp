// Import the functions you need from the SDKs you need
import firebase from "firebase/compat";
import { getDatabase, get, ref } from 'firebase/database'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAPXop7T4-owY08pcYNUM6_JnvzCINkMEY",
  authDomain: "fyp2-e49a9.firebaseapp.com",
  databaseURL: "https://fyp2-e49a9-default-rtdb.firebaseio.com",
  projectId: "fyp2-e49a9",
  storageBucket: "fyp2-e49a9.appspot.com",
  messagingSenderId: "56451011557",
  appId: "1:56451011557:web:ca6fd486bcd70b2575d50c",
  measurementId: "G-LLHJG404K2"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);



import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import MainNavigator from "./navigation/MainNavigator";




const App = () => {
  return(
  <NavigationContainer>

    <MainNavigator></MainNavigator>
  </NavigationContainer>

  );

};

export default App;
