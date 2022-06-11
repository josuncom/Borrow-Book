import * as React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

export default function MyPageScreen({ navigation }) {
    return (
        <View style={{flex : 1, alignItems:'center', justifyContent:'center',  backgroundColor : '#545454', }}>
            <TouchableOpacity>
            <Text
                style={{fontSize:30, fontWeight:'bold'}}>MyPage Screen</Text>
                </TouchableOpacity>
        </View>
    );
}