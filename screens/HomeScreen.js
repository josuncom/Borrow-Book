import * as React from 'react';
import { useState, useEffect } from 'react';
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
    const [list, setList] = useState([]);
    const date = new Date();

    const fetchData = async () =>{
        try{
            await firestore().collection('user').orderBy('createdAt').get().then((querySnapshot) =>{
                querySnapshot.forEach((doc) => {
                    const{
                        cost,
                        createdAt,
                        name,
                        until,
                        imageUrl
                    } = doc.data();
                    
                    list.push({
                        cost,
                        createdAt,
                        name,
                        until,
                    });
                });
            });
            setData(list); 
            getImage();
        } catch(e){
            console.log(e);
        }
    }


    useEffect(() => {
        fetchData();
    }, []);


    
    const getImage = async() => {
        let url = '';
        try {
          for(let i = 0; i < list.length; i++)
          {  
            const imageRef = storage().ref(list[i].createdAt);
            url = await imageRef.getDownloadURL();
            list[i].imageUrl = url;
            console.log('imageUrl:', url);
            return url;    
          }
        } catch (e) {
          console.log(e);
        }
      };

/*
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
    */

    return (
        <View style={{flex : 1, alignItems:'center', justifyContent:'center' }}>
            <Button title="주변에 어떤 책이 있나요?" onPress={fetchData}/>
            {data?.map((row) => {
                return(
                <View style={{flex : 1, marginTop:'5%'}}>
                    <Text>{row.name} / {row.until} / {row.cost}</Text>
                    <Image 
                        source={{uri : row.imageUrl}}
                        style={{width:300, height:300}}/>
                </View>
            )})}
        </View>
    );
}