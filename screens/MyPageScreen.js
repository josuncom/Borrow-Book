import * as React from 'react';
import { View, Text, TouchableOpacity, StyleSheet} from 'react-native';

export default function MyPageScreen({ navigation }) {
    return (
        <View style={styles.container}>
            <View style={styles.userInfoBox}>
                <Text style={styles.greeting}>어서오세요!</Text>
                <Text style={styles.userName}>josuncom 님</Text>
            </View>
            <View style={styles.menu}>
                <Text></Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container : {
        flex : 1,
        backgroundColor : '#2B2B2B'
    },
    userInfoBox : {
        width : '100%',
        color : 'white',
        borderBottomColor : '#404040',
        borderBottomWidth : 1
    },
    greeting : {
        color : 'white',
        marginLeft : '10%',
        marginTop : '5%',
        fontSize : 20,
        fontWeight : '100'
    },
    userName : {
        marginLeft : '10%',
        marginTop : '5%',
        color : 'white',
        paddingBottom : '5%'
    },
    horizontalLine : {
        borderBottomColor: '#404040',
        borderBottomWidth: 0.5,
    },
    menu : {

    }
})