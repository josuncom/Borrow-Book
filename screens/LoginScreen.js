import React, { useEffect, useState } from 'react';
import auth from '@react-native-firebase/auth';
import { GoogleSignin, GoogleSigninButton }  from '@react-native-google-signin/google-signin';
import { signIn, signUp } from "lib/auth";

import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
  Button,
  Alert,
  TextInput,
  ActivityIndicator,
  TouchableOpacity,
  TextIn
} from 'react-native';

export default function Login(){
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();
  
  
  const onGoogleButtonPress = async () => { 
      try{
        const { idToken } = await GoogleSignin.signIn(); 
        const googleCredential = auth.GoogleAuthProvider.credential(idToken); 
        console.log(idToken);
      }
      catch(error){
          console.log(error);
      }
    
      console.log("clicked!");
  }
  
  
  useEffect(() => {
      GoogleSignin.configure({
        webClientId : '715982633310-b9o4eieu2bu5ah34rfrrkv0vi2tk65g9.apps.googleusercontent.com'
      });
    }, [])


  return (
      <View style={{flex : 1, alignItems:'center', justifyContent:'center'}}>
        <GoogleSigninButton onPress={onGoogleButtonPress} />
        <Button title="Logout" />
      </View>
    );
}


/*
  const onAuthStateChanged = user => {
    setUser(user);
    if(initializing)
      setInitializing(false);
  };

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber;
  }, []);

  const handleSignOut = () => {
    try {
      auth().signOut();
    } catch (error) {
      console.log(error.stack);
    }
  };
*/
