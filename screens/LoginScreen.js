import React, { useEffect } from 'react';
import auth from '@react-native-firebase/auth';
import { GoogleSignin, GoogleSigninButton } from '@react-native-google-signin/google-signin';

import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';


const googleSigninConfigure = () => {
    GoogleSignin.configure({
      webClientId:
      '1016823322854-sbe82qsq1f00hh7qhh8tl7jr5ckm2urf.apps.googleusercontent.com',
    })
  }
  
const onGoogleButtonPress = async () => { 
    const { idToken } = await GoogleSignin.signIn(); 
    const googleCredential = auth.GoogleAuthProvider.credential(idToken); 
    return auth().signInWithCredential(googleCredential); 
}
  

export default function Login(){
    useEffect(() => {
        googleSigninConfigure();
      })
      return (
        <View style={{flex : 1, alignItems:'center', justifyContent:'center'}}>
          <GoogleSigninButton onPress={() => onGoogleButtonPress()}/>
        </View>
      );
}