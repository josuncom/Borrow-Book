import * as React from 'react';
import { useState } from 'react';
import { View, Text,TouchableOpacity, Button } from 'react-native';
import firestore from '@react-native-firebase/firestore';

export default function HomeScreen({navigation}) {

    const [user, setUser] = useState();
    const userCollection = firestore().collection('user');

    const _callApi = async() => {
        try{
            const data = await userCollection.get();
            setUser(data.docs.map(doc => ({...doc.data(), id : doc.id})));
            console.log(user[0].name);
        } catch(e){
            console.log(e.message);
        }
    }

    return (
        <View style={{flex : 1, alignItems:'center', justifyContent:'center' }}>
            <TouchableOpacity>
                <Text
                onPress={() => navigation.navigate('Home')}
                style={{fontSize:30, fontWeight:'bold'}}>Home Screen
                </Text>
            </TouchableOpacity>
            <Button title="데이터 읽기" onPress={_callApi}/>
            {user?.map((row, idx) => {
                return<Text>{row.name}</Text>
            })}
        </View>
    );
}