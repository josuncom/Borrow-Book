import * as React from 'react';
import { useState, useCallback, useEffect } from 'react';
import { View, Text } from 'react-native';
import {  GiftedChat , SystemMessage } from 'react-native-gifted-chat';

export default function ChattingScreen({navigation}) {
    const [messages, setMessage] = useState([]);
    
    useEffect(() => {
        setMessage([
            {
                _id : 1,
                text : 'Hello developer',
                createdAt : new Date(),
                user : {
                    _id : 2,
                    name: 'React Native',
                    avatar: 'https://placeimg.com/140/140/any',
                },
            },
        ])
    }, [])


    const onSend = useCallback((messages = []) => {
        setMessage(previousMessages => GiftedChat.append(previousMessages, messages))
      }, [])



    return (
        <View style={{flex : 1, alignItems:'center', justifyContent:'center' }}>
            <GiftedChat
                    messages={messages}
                    onSend={messages => onSend(messages)}
                    user={{
                            _id: 1,
                    }}
            />
        </View>
    );
}