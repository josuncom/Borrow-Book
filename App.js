import * as React from 'react';
import SplashScreen from 'react-native-splash-screen';
import { useEffect } from 'react';
import { ImageBackground } from "react-native";
import MainContainer from './MainContainer';

function App() {
  useEffect(() => {
    try{
      setTimeout(() => {
        SplashScreen.hide();
      }, 2000)
    } catch(e){
      console.log(e)
    }
  })
  return(
    <MainContainer/>
  );
}

export default App;
