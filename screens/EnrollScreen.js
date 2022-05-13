import { firebase } from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import * as React from 'react';
import { useState } from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import moment from 'moment';
import storage from '@react-native-firebase/storage';
import ImagePicker from 'react-native-image-crop-picker';
import Geolocation from 'react-native-geolocation-service';

export default function EnrollScreen({navigation}) {
    const [addName, setAddName] = useState('');
    const [addCost, setAddCost] = useState('');
    const [addUntil, setAddUntil] = useState('');
    const [addCreatedAt, setCreatedAt] = useState('');

    const [img, setImg] = useState(null);
    var now = moment();

    const addCollection = firestore().collection('user');

    const addItem = async () =>{
        try{
            await addCollection.add({
                name : addName,
                until : addUntil,
                cost : addCost,
                createdAt : now.format(),
            });
            setAddName('');
            setAddUntil('');
            setAddCost('');
            setCreatedAt('');
        } catch(error){
            console.log(error.message);
        }
    };

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
            const reference = firebase.storage().ref(now.format());
            try{
                await reference.putFile(image.path);
                
            } catch(error){
                console.log(error.message);
            }

            addItem();
        });
    }

    return (
        <View >
            <TextInput
        placeholder="책 제목을 입력하세요!"
        value={addName}
        onChange={e => setAddName(e.nativeEvent.text)}
      />
      <TextInput
        placeholder="언제까지 대여하시나요?"
        value={addUntil}
        onChange={e => setAddUntil(e.nativeEvent.text)}
      />
      <TextInput
        placeholder="1일당 가격을 입력하세요!"
        value={addCost}
        onChange={e => setAddCost(e.nativeEvent.text)}
      />
        <View style={{ marginTop : '10%'}}>
            <Button title="사진과 함께 등록하기" onPress={uploading} />
        </View>
    </View>
    );
}