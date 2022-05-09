import * as React from 'react';
import { useState } from 'react';
import { FlatList, View, Text, TouchableOpacity, Button, Image, StatusBar } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import ImagePicker from 'react-native-image-crop-picker';
import { firebase } from '@react-native-firebase/firestore';

export default function HomeScreen({navigation}) {
    const userCollection = firestore().collection('user');
    const [data, setData] = useState();
    const [img, setImg] = useState(null);
    const [url, setUrl] = useState('');
    const date = new Date();


    const getImage = async(book) => {
        let url = '';
        try {
          const imageRef = await storage().ref();
          url = await imageRef.getDownloadURL();
          setUrl(url);
          console.log('imageUrl:', url);    
          return url;
        } catch (e) {
          console.log(e);
        }
      };


    const _callApi = async() => {
        try{
            const db = await userCollection.get();
            setData(db.docs.map(doc => ({...doc.data(), id : doc.id})));
            getImage();
            console.log(data);
        } catch(e){
            console.log(e.message);
        }
    }

    return (
        <View style={{flex : 1, alignItems:'center', justifyContent:'center' }}>
            <Button title="데이터 읽기" onPress={_callApi}/>
            {data?.map((row) => {
                return(
                <View style={{flex : 1, marginTop:'5%'}}>
                    <Text>{row.name} / {row.until} / {row.cost}</Text>
                    <Image 
                        source={{uri : url}}
                        style={{width:300, height:300}}/>
                </View>
            )})}
        </View>
    );

}