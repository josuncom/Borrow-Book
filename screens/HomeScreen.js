import * as React from 'react';
import { View, Text,TouchableOpacity } from 'react-native';

export default function HomeScreen({navigation}) {
    return (
        <View style={{flex : 1, alignItems:'center', justifyContent:'center' }}>
            <TouchableOpacity>
                <Text
                onPress={() => navigation.navigate('Home')}
                style={{fontSize:30, fontWeight:'bold'}}>Home Screen
                </Text>
            </TouchableOpacity>
        </View>
    );
}