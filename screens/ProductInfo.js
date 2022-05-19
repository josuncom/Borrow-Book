import * as React from 'react';
import { useState, useEffect } from 'react';
import { FlatList, View, Text, TouchableOpacity, Button, Image, StatusBar, StyleSheet, ScrollView } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import ImagePicker from 'react-native-image-crop-picker';
import { firebase } from '@react-native-firebase/firestore';

export default function ProductInfo({navigation}){
    return(
        <View>
            <Text>Hello World!</Text>
        </View>
    )
}