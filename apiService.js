import * as React from 'react';
import { useState, useEffect } from 'react';
import { FlatList, View, Text, TouchableOpacity, Button, Image, StatusBar } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import ImagePicker from 'react-native-image-crop-picker';
import { firebase } from '@react-native-firebase/firestore';
import { SafeAreaView } from 'react-native-safe-area-context';


export const fetchPosts = async (postPerLoad) => {
    const items = new Array();
    const querySnapshot = await firestore().collection('user').orderBy('name').limit(postPerLoad).get();

    const lastVisible = querySnapshot.docs[querySnapshot.docs.length-1];

    querySnapshot.forEach((doc) => {
        let itemData = doc.data();
        itemData.id = doc.id;
        items.push(itemData);
    });

    return { items, lastVisible }; 
}

export const fetchMorePosts = async (startAfter, postPerLoad) => {
    const items = new Array();
    const querySnapshot = await firestore().collection('user').orderBy('name').startAfter(startAfter).limit(postPerLoad).get();

    const lastVisible = querySnapshot.docs[querySnapshot.docs.length-1];

    querySnapshot.forEach((doc) => {
        let itemData = doc.data();
        itemData.id = doc.id;
        items.push(itemData);
    });

    return { items, lastVisible }; 
}