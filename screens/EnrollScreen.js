import { firebase } from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import * as React from 'react';
import { useState } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet } from 'react-native';
import moment from 'moment';
import storage from '@react-native-firebase/storage';
import ImagePicker from 'react-native-image-crop-picker';
import Geolocation from 'react-native-geolocation-service';

import RNPickerSelect from 'react-native-picker-select';




export default function EnrollScreen({navigation}) {
    const [addName, setAddName] = useState('');
    const [addCost, setAddCost] = useState('');
    const [addUntil, setAddUntil] = useState('');
    const [createdAt , setCreatedAt] = useState('');
    const [genre, setGenre] = useState('');

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
                genre : genre
            });
            setAddName('');
            setAddUntil('');
            setAddCost('');
            setCreatedAt('');
            setGenre('');
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
            Alert.alert("상품 등록이 완료되었습니다!");
        });
    }

    return (
        <View style={styles.container}>
            <View style={styles.box}>
                <TextInput style={styles.nameInput}
                    placeholder="책 제목을 입력하세요!"
                    value={addName}
                    onChange={e => setAddName(e.nativeEvent.text)}/>

                <View style={styles.horizontalLine}/>

                <TextInput style={styles.untilInput}
                    placeholder="언제까지 대여하시나요?"
                    value={addUntil}
                    onChange={e => setAddUntil(e.nativeEvent.text)}/>

                <View style={styles.horizontalLine}/>

                <TextInput style={styles.costInput}
                    placeholder="1일당 가격을 입력하세요!"
                    value={addCost}
                    onChange={e => setAddCost(e.nativeEvent.text)}/>

                <View style={styles.horizontalLine}/>

                <View style={styles.genreSelect}>
                    <RNPickerSelect
                    style={{placeholder:"안녕하세요"}}
                    onValueChange={value => setGenre(value.nativeEvent.text)}   // 장르 넘기는 것까지 해야함
                        items={[
                            { label : '국내도서', value:'국내도서'},
                            { label : '해외도서', value:'해외도서'}
                    ]}/>
                </View>

                <View style={styles.horizontalLine}/>

                <View style={{ marginTop : '10%'}}>
                    <Button title="사진과 함께 등록하기" onPress={uploading} />
                </View>

                


                
            </View>
    </View>
    );
}


const styles = StyleSheet.create({
    container : {
        flex : 1,
        backgroundColor : 'white',
    },

    horizontalLine : {
        borderBottomColor: 'black',
        borderBottomWidth: 0.5,
        width:'90%',
        marginLeft : '5%',
    },

    nameInput : {
        width: '90%',
        marginLeft : '5%',
        backgroundColor : 'white'
    },

    untilInput : {
        width: '90%',
        marginLeft : '5%',
        backgroundColor : 'white'
    },

    costInput : {
        width: '90%',
        marginLeft : '5%',
        backgroundColor : 'white'
    },

    genreSelect : {
        marginLeft:'5%',
        marginRight:'5%'
    }
}
)

