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
const homeName = 'Home';
const enrollName = 'Enroll';
const chattingName = 'Chat'
const loginName = 'Login';
const myPageName = 'MyPage';

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
                activeTintColor: 'tomato',
                inactiveTintColor: 'grey',
                labelStyle: { paddingBottom: 10, fontSize: 10 },
                style: { padding: 10, height: 70}
            }}>

            <Tab.Screen name={homeName} component={HomeScreen}/>
            <Tab.Screen name={chattingName} component={ChattingScreen}/>
            <Tab.Screen name={enrollName} component={EnrollScreen}/>
            <Tab.Screen name={loginName} component={LoginScreen}/>
            <Tab.Screen name={myPageName} component={MyPageScreen}/>

            </Tab.Navigator>
        </NavigationContainer>
    );
}

export default MainContainer;