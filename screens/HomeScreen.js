import * as React from 'react';
import { useState } from 'react';
import { View, Text,TouchableOpacity, Button } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';

export default function HomeScreen({navigation}) {

    const [user, setUser] = useState();
    const userCollection = firestore().collection('user');

    const getImage = async () =>{
        let url = '';
        try{
            const imageRef = await storage().ref('image1.jpg');
            url = await imageRef.getDownloadURL();
            setUrl(url);
            console.log('imageUrl : ', url);
            return url;
        } catch(e){
            console.log(e.message);
        }
    };

    const _callApi = async() => {
        try{
            const data = await userCollection.get();
            setUser(data.docs.map(doc => ({...doc.data(), id : doc.id})));
            console.log(user[0]);
        } catch(e){
            console.log(e.message);
        }
    }

    return (
        <View style={{flex : 1, alignItems:'center', justifyContent:'center' }}>
            <Button title="데이터 읽기" onPress={_callApi}/>
            <Button title="이미지 출력" onPress={getImage}/>
            {user?.map((row, idx) => {
                return(
                <View style={{flex : 1, color:"White", marginTop:'5%'}}>
                    <Text>{row.name} / {row.until} / {row.cost}</Text>
                </View>
            )})}
        </View>
    );
}