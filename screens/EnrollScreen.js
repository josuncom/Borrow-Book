/*
<Text
                onPress={() => navigation.navigate('Home')}
                style={{fontSize:30, fontWeight:'bold'}}>Enrollment Screen
                </Text>

*/

import { firebase } from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import * as React from 'react';
import { useState } from 'react';
import { View, Text, TextInput, Button } from 'react-native';

export default function EnrollScreen({navigation}) {
    const [addName, setAddName] = useState('');
    const [addCost, setAddCost] = useState('');
    const [addUntil, setAddUntil] = useState('');
    const addCollection = firestore().collection('user');

    const addItem = async () =>{
        try{
            await addCollection.add({
                name : addName,
                until : addUntil,
                cost : addCost,
            });
            setAddName('');
            setAddUntil('');
            setAddCost('');
            console.log('ADD COMPLETE!');
        } catch(error){
            console.log(error.message);
        }
    };

    return (
        <View>
            <TextInput
        placeholder="name"
        value={addName}
        onChange={e => setAddName(e.nativeEvent.text)}
      />
      <TextInput
        placeholder="until"
        value={addUntil}
        onChange={e => setAddUntil(e.nativeEvent.text)}
      />
      <TextInput
        placeholder="cost"
        value={addCost}
        onChange={e => setAddCost(e.nativeEvent.text)}
      />
      <Button title="Add Text" onPress={addItem} />
        </View>
    );
}