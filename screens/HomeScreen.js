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
                        returnDate,
                        textContent
                    } = doc.data();

                    list.push({
                        cost,
                        createdAt,
                        name,
                        until,
                        genre,
                        returnDate,
                        textContent
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
                            itemReturnDate : row.returnDate,
                            itemImageUrl : row.imageUrl,
                            itemTextContent : row.textContent
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
    const { itemReturnDate } = route.params;
    const { itemImageUrl} = route.params;
    const { itemGenre } = route.params;
    const { itemTextContent } = route.params;

    return(
        <View>
            <Image source={{uri : itemImageUrl}} style={styles.productInfoImage}/>                   
        
            <View style={styles.uploaderInfoBox}>
                <Text style={styles.uploaderName}>업로드한 사용자 정보</Text>
            </View>

            <View style={styles.horizontalLine}/>

            <Text style={styles.bookInfo_name}>
                {JSON.stringify(itemName).substring(1, JSON.stringify(itemName).length - 1)}
            </Text>

            <Text style={styles.bookInfo_genre}>
                {JSON.stringify(itemGenre).substring(1, JSON.stringify(itemGenre).length - 1)}
            </Text>

            <Text style={styles.bookInfo_cost}>
                {JSON.stringify(itemReturnDate).substring(1, JSON.stringify(itemReturnDate).length - 1)}&nbsp;까지 대여할 수 있어요!&nbsp;&nbsp;&nbsp;
            </Text>
            
            <Text style={styles.bookInfo_returnDate}>
                {JSON.stringify(itemCost).substring(1, JSON.stringify(itemCost).length - 1)}원이에요!   
            </Text>

            <Text style={styles.bookInfo_textContent}>
                {JSON.stringify(itemTextContent).substring(1, JSON.stringify(itemTextContent).length - 1)}
            </Text>
        </View>
    );
}



const styles = StyleSheet.create({
    horizontalLine : {
        borderBottomColor: 'black',
        borderBottomWidth: 0.5,
        width:'90%',
        marginLeft : '5%',
    },
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
    },    
    horizontalLine : {
        borderBottomColor: 'black',
        borderBottomWidth: 0.5,
        width:'100%',
    },
    productInfoImage : {
        width : '100%',
        height : '50%'
    },
    uploaderInfoBox : {
        height: '10%'
    },
    uploaderName : {
        marginTop : '2.5%',
        textAlign : 'center'
    },
    bookInfo_name : {
        fontSize : 20,
        fontWeight : 'bold',
        marginLeft : '3%',
        paddingTop : '2.5%'
    },
    bookInfo_cost : {
        fontSize : 12,
        marginLeft : '3%',
        paddingTop : '2.5%'
    },
    bookInfo_returnDate: {
        fontSize : 12,
        marginLeft : '3%',
        paddingTop : '2.5%'
    },
    bookInfo_genre : {
        marginLeft : '3%',
        fontSize : 10
    },
    bookInfo_textContent : {
        marginLeft : '3%',
        fontSize : 13
    }

});


export default StackNavigation;