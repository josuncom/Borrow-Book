import * as React from 'react';
import { RefreshControlProps } from 'react-native/Libraries/Components/RefreshControl/RefreshControl';
import { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Button, Image, StyleSheet, ScrollView, RefreshControl } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import { createStackNavigator } from '@react-navigation/stack';


import useDidMountEffect from '../lib/useDidMountEffect';

// import ProductInfo from './ProductInfo';

const HomeScreen = ({navigation}) => {
    const userCollection = firestore().collection('user');
    const [isFetched, setIsFetched] = useState(false);
    const [list, setList] = useState([]);
    const [data, setData] = useState([]);


    const fetchData = async () =>{
        let list = [];
        try{
            await firestore().collection('user').orderBy('createdAt').get().then((querySnapshot) =>{
                querySnapshot.forEach((doc) => {
                    const{
                        cost,
                        createdAt,
                        name,
                        until,
                        genre,
                        returnDate
                    } = doc.data();

                    list.push({
                        cost,
                        createdAt,
                        name,
                        until,
                        genre,
                        returnDate
                    });
                });
            });
            setIsFetched(true);
            setList(list);
            getImage();
        } catch(e){
            console.log(e);
        }
    }


    const getImage = async() => {
        let url = '';
        try {  
          for(let i = 0; i < list.length; i++)
          {  
            const imageRef = storage().ref(list[i].createdAt);
            url = await imageRef.getDownloadURL();
            list[i].imageUrl = url;
            console.log(`imageUrl ${i} : `, list[i].imageUrl); 
          }
          setData(list);
          
        } catch (e) {
          console.log(e);
        }
      };



      useEffect(() => {
          console.log("목록 불러오기 완료");
          fetchData();
      }, [isFetched]);


    return (
        <ScrollView style={styles.container}>
            {isFetched ? (<Button title="목록 새로고침" onPress={fetchData}/>) : <Button title="주변에 어떤 책이 있나요?" onPress={fetchData}/>}

            {(data?.map((row) => {
                return(
                        <TouchableOpacity style={styles.box} onPress={() => navigation.navigate('Details', 
                        {
                            itemName : row.name,
                            itemCost : row.cost,
                            itemUntil : row.until,
                            itemGenre : row.genre,
                            itemReturnDate : row.returnDate
                        })}>
                            <Image 
                                source={{uri : row.imageUrl}}
                                style={styles.image}/>
                                <View style={styles.textBox}>
                                    <Text style={styles.bookName}>{row.name}</Text>
                                    <Text style={styles.bookReturnDate}>{row.returnDate} 까지</Text>
                                    <Text style={styles.bookCost}>{row.cost}원</Text>
                                    <Text style={styles.bookGenre}>{row.genre}</Text>
                                </View>      
                        </TouchableOpacity> 
                )}))
}
        </ScrollView>

    );
}



const Stack = createStackNavigator();

const StackNavigation = () => {
  return(
          <Stack.Navigator>
              <Stack.Screen options={{headerShown : false}} name="홈" component={HomeScreen} />
              <Stack.Screen options={{headerShown : false}} name="Details" component={ProductInfo}/>
          </Stack.Navigator>
  );
};

function ProductInfo({route, navigation}){
    const { itemName } = route.params;
    const { itemCost } = route.params;
    const { itemUntil } = route.params;

    return(
        <View>
            <Text style={styles.bookName}>
                책 제목 : {JSON.stringify(itemName)}
            </Text>
            <Text style={styles.bookCost}>
                책 가격 : {JSON.stringify(itemCost)}
            </Text>
            <Text>
                책 기한 : {JSON.stringify(itemUntil)}
            </Text>
        </View>
    );
}


const styles = StyleSheet.create({
    container : {
        flex : 1,
        backgroundColor : 'white'
    },
    box : {
        flexDirection:'row',
        marginTop : '5%',
        marginLeft : '2%',
        backgroundColor : 'white'
    },
    image : {
        width : 80,
        height : 80,
        borderRadius : 5,
    },
    textBox : {
        flexDirection:'column',
        marginLeft : '2%',
    },
    bookName : {
        fontSize : 15,
        fontWeight:'100'
    },
    bookCost : {
        fontSize : 15,
        fontWeight : '900',
        marginTop : '5%'
    },
    bookReturnDate : {
        fontSize : 10,
        marginTop : '3%'
    },
    bookGenre : {
        fontSize : 10
    }
});


export default StackNavigation;