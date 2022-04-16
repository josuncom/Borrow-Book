import * as React from 'react';
import { View, Text } from 'react-native';

export default function ChattingScreen({navigation}) {
    return (
        <View style={{flex : 1, alignItems:'center', justifyContent:'center' }}>
            <Text
                onPress={() => navigation.navigate('Home')}
                style={{fontSize:30, fontWeight:'bold'}}>Chatting Screen
                </Text>
        </View>
    ); 
}