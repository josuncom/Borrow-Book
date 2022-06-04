import * as React from 'react';
import { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Button, Image, StyleSheet, ScrollView } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import { createStackNavigator } from '@react-navigation/stack';
// import ProductInfo from './ProductInfo';

const HomeScreen = ({navigation}) => {
    const userCollection = firestore().collection('user');
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
                    } = doc.data();

                    list.push({
                        cost,
                        createdAt,
                        name,
                        until,
                    });
                });
            });
            setList(list);
            getImage();
        } catch(e){
            console.log(e);
        }
    }


    const getImage = async() => {
        console.log(list);
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
      }, []);


    return (
        <ScrollView style={styles.container}>
            <Button title="주변에 어떤 책이 있나요?" onPress={fetchData}/>
            
            {data?.map((row) => {
                return(
                        <TouchableOpacity style={styles.box} onPress={() => navigation.navigate('Details', 
                        {
                            itemName : row.name,
                            itemCost : row.cost,
                            itemUntil : row.until
                        })}>
                            <Image 
                                source={{uri : row.imageUrl}}
                                style={styles.image}/>
                                <View style={styles.textBox}>
                                    <Text style={styles.bookName}>{row.name}</Text>
                                    <Text style={styles.bookUntil}>{row.until} 까지</Text>
                                    <Text style={styles.bookCost}>{row.cost}원</Text>
                                </View>      
                        </TouchableOpacity>    
                )})}
                
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

/*
const DetailsScreen = ({navigation}) => {
  return (
    <View style={styles.screen}>
      <Text>Details Screen</Text>
      <Button
        title="Go to Details again"
        onPress={ () => navigation.push('Details')}
      />
      <Button 
        title="Go to Home"
        onPress={ () => navigation.navigate('Homes')}
      />
      <Button
        title="Go Back"
        onPress={() => navigation.goBack()}
      />
      <Button 
        title="Go back to first screen in stack"
        onPress={() => navigation.popToTop()}
      />
    </View>
  )
}
*/

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
    bookUntil : {
        fontSize : 10,
        marginTop : '3%'
    }
});


export default StackNavigation;