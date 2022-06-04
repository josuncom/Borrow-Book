import * as React from 'react';
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';


// Import Pages
import ChattingScreen from './screens/ChattingScreen';
import EnrollScreen from './screens/EnrollScreen';
import HomeScreen from './screens/HomeScreen';
import LoginScreen from './screens/LoginScreen';
import MyPageScreen from './screens/MyPageScreen';


// Rename Screens
const homeName = '홈';
const enrollName = '상품 등록';
const chattingName = '채팅'
const loginName = '로그인';
const myPageName = '내 정보';

const Tab = createBottomTabNavigator();

function MainContainer() {
    return (
        <NavigationContainer>
            <Tab.Navigator
                initalRouteName={homeName}
                screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName;
                    let rn = route.name;

                    if(rn === homeName)
                    {
                        iconName = focused ? 'home' : 'home-outline';
                    }
                    else if(rn === chattingName)
                    {
                        iconName = focused ? 'chatbubble-ellipses' : 'chatbubble-ellipses-outline';
                    }
                    else if(rn === enrollName)
                    {
                        iconName = focused ? 'add-circle' : 'add-circle-outline';
                    }
                    else if(rn === loginName)
                    {
                        iconName = focused ? 'log-in' : 'log-in-outline';
                    }
                    else if(rn === myPageName)
                    {
                        iconName = focused ? 'person' : 'person-outline';
                    }

                    return <Ionicons name={iconName} size={size} color={color}/>
                },
            })}
            tabBarOptions={{
                activeTintColor: 'black',
                inactiveTintColor: 'black',
                labelStyle: { paddingBottom: 5, fontSize: 10 },
            }}>

            <Tab.Screen options={{
                headerStyle:{
                    height:40
                },
                headerTitle:'홈',
                headerTitleStyle:{
                    fontSize:16
                },
                }
                }name={homeName} component={HomeScreen}/>

            <Tab.Screen options={{
                headerStyle:{
                    height:40
                },
                headerTitle:'채팅',
                headerTitleStyle:{
                    fontSize:16
                }}} name={chattingName} component={ChattingScreen}/>

            <Tab.Screen options={{
                headerStyle:{
                    height:40
                },
                headerTitle:'상품 등록',
                headerTitleStyle:{
                    fontSize:16
                }}} name={enrollName} component={EnrollScreen}/>

            <Tab.Screen options={{
                headerStyle:{
                    height:40
                },
                headerTitle:'로그인',
                headerTitleStyle:{
                    fontSize:16
                }}} name={loginName} component={LoginScreen}/>

            <Tab.Screen options={{
                headerStyle:{
                    height:40
                },
                headerTitle:'내 정보',
                headerTitleStyle:{
                    fontSize:16
                }}} name={myPageName} component={MyPageScreen}/>


            </Tab.Navigator>
        </NavigationContainer>
    );
}

export default MainContainer; // 내보내기? 해서 다른 js파일도 import 가능함