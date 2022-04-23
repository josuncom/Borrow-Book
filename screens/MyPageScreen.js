import * as React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

export default function MyPageScreen({ navigation }) {
    return (
        <View style={{flex : 1, alignItems:'center', justifyContent:'center' }}>
            <TouchableOpacity>
            <Text
                onPress={() => navigation.navigate('Home')}
                style={{fontSize:30, fontWeight:'bold'}}>MyPage Screen</Text>
                </TouchableOpacity>
        </View>
    );
}