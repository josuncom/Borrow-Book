import * as React from 'react';
import { useState } from 'react';
import { View, Text,TouchableOpacity, Button } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import ImagePicker from 'react-native-image-crop-picker';
import { firebase } from '@react-native-firebase/firestore';

export default function HomeScreen({navigation}) {

    const userCollection = firestore().collection('user');
    const [user, setUser] = useState();
    const [img, setImg] = useState(null);
     
    const uploading = () =>{
        ImagePicker.openPicker({
            width:300,
            height: 400,
            cropping: false
        }).then(async image => {
            console.log(image); 
            setImg(image.path);
            let imgName= image.path.substring(image.path.lastIndexOf('/') + 1);
            console.log(imgName);
            const reference = firebase.storage().ref('imgName');

            try{
                await reference.putFile(image.path);
            } catch(error){
                console.log(error.message);
            }
        });
    }

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
            <Button title="이미지 출력" onPress={uploading}/>
            {user?.map((row, idx) => {
                return(
                <View style={{flex : 1, color:"White", marginTop:'5%'}}>
                    <Text>{row.name} / {row.until} / {row.cost}</Text>
                </View>
            )})}
        </View>
    );
}