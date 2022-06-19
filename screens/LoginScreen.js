import { createStackNavigator } from '@react-navigation/stack';
import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';

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
  TextIn,
  Image
} from 'react-native';

const Login = () => {

  const navigation = useNavigation();
  const [logIn, setLogIn] = useState(false);


    useEffect(() => {
      setLogIn(true);
    }, [logIn]);

  return(
    <View style={styles.mainView}>
        <View style={styles.TopView}>
            <Image style={styles.ImageStyle} source={require('../lib/background.png')}/>
        </View>
        <View style={styles.BottomView}>
          <Text style={styles.Heading}>
          로그인
          </Text>
          <View style={styles.FormView}>
            <TextInput placeholder="아이디" placeholderTextColor={"#545454"} style={styles.IdInput}></TextInput>
            <TextInput placeholder="비밀번호" placeholderTextColor={"#545454"} style={styles.PwInput}></TextInput>
            <TouchableOpacity style={styles.Btn} onPress={() => navigation.navigate('LoggedIn')}>
              <Text style={styles.BtnText}>로그인</Text>
            </TouchableOpacity>
          </View>
          <Text style={styles.RegisterText}>
          아직 계정이 없으신가요?
          </Text>
          </View>
          </View>
       )
}

  const Stack = createStackNavigator();

      const StackNavigation = () =>{
        return(
            <Stack.Navigator>
                <Stack.Screen options={{headerShown : false}} name="홈" component={Login}/>
                <Stack.Screen options={{headerShown : false}} name='LoggedIn' component={LoggedIn}/>
            </Stack.Navigator>
          );
      };


    function LoggedIn(){
        return(
          <View style={styles.mainView}>  
          <View style={styles.TopView}>
              <Image style={styles.ImageStyle} source={require('../lib/background.png')}/>
          </View>
          <View style={styles.BottomView}>
            <Text style={styles.Heading}>
            반갑습니다!
            </Text>

          </View>
          </View>
         )
      } 


const styles = StyleSheet.create({

    mainView : {
      marginTop : 40,
      flex : 1,
      flexDirection:'column',
      justifyContent:'center',
      alignItems:'center',
    },
    TopView:{
      width : '100%',
      height:'30%',
      display : 'flex',
      justifyContent : 'center',
      alignItems:'center'
    },
    BottomView:{
      width:'100%',
      height:'80%',
      backgroundColor:'black',
      borderTopLeftRadius:30,
      borderTopRightRadius:30
    },
    ImageStyle : {
      width : '70%',
      resizeMode:'contain'
    },
    Heading : {
      color : 'white',
      fontSize:25,
      marginTop:'7%',
      marginLeft:'7%'
    },
    FormView: {
        width : '100%',
        display : 'flex',
        flexDirection:'column',
        justifyContent:'center',
        alignItems:'center',
        marginTop : '10%',
    },
    IdInput : {
      color:'white',
      width : '70%',
      height : 40,
      borderWidth : 1,
      borderColor : 'white',
      borderRadius : 10,
    },
    PwInput : {
      color:'white',
      width : '70%',
      height : 40,
      borderWidth : 1,
      borderColor : 'white',
      borderRadius : 10,
      marginTop : '5%'
    },
    Btn:{
      marginTop : '7%',
      width : '35%',
      borderRadius : 5,

    },
    BtnText : {
      backgroundColor:'white',
      fontSize : 20,
      color : 'black',
      textAlign : 'center',
      borderRadius : 10
    },
    RegisterText: {
      textAlign : 'right',
      marginTop : '10%',
      marginRight:'7%',
      color : 'white'
    }
}

)

export default StackNavigation;