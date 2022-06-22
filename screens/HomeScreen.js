import * as React from 'react';
import { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Button, Image, StyleSheet, ScrollView, ActivityIndicator, ImageBackground } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import { createStackNavigator } from '@react-navigation/stack';
import LinearGradient from 'react-native-linear-gradient';

const HomeScreen = ({navigation}) => {
    const userCollection = firestore().collection('user');
    const [list, setList] = useState([]);
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

const fetchData = async () => {
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

        
        setList(list);
        getImage();

        if(loading){
            setLoading(false);
        }


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
    }, [loading]);


    return (       
        <ScrollView style={styles.container}>
            <ImageBackground source={require("../images/3.jpg")} style={styles.bg}>
            <TouchableOpacity style={styles.button} onPress={fetchData}>
                <Text style={styles.buttonText}>↻</Text>
            </TouchableOpacity>
            { loading ? (
                <ScrollView
                style={{flex: 1}}
                contentContainerStyle={{alignItems: 'center'}}>
                <ActivityIndicator size="large"/>
              </ScrollView>
            ) : (
                (data?.map((row) => {
                    return(                                        
                        <TouchableOpacity style={styles.box} onPress={() => navigation.navigate('등록 정보',
                            {
                                itemName : row.name,
                                itemCost : row.cost,
                                itemUntil : row.until,
                                itemGenre : row.genre,
                                itemReturnDate : row.returnDate,
                                itemImageUrl : row.imageUrl,
                                itemTextContent : row.textContent})}>
                            
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
            )}
            </ImageBackground>
        </ScrollView>
    );
}



const Stack = createStackNavigator();

const StackNavigation = () => {
  return(
          <Stack.Navigator>
              <Stack.Screen options={{headerStyle:{
                    height:40,
                    backgroundColor : '#393838',
                }, headerTitleStyle:{color : 'white'},
                headerRight : () => refreshBtn(),
                headerRightContainerStyle : styles.headerRightContainer}} name="홈" component={HomeScreen}/>
              <Stack.Screen options={{headerStyle:{height:40, backgroundColor:'transparent'}}} name="등록 정보" component={ProductInfo}/>
          </Stack.Navigator>
  );
};

function refreshBtn(){
    return(
        <View>
            <TouchableOpacity>
                <Text style={{fontSize : 20, color:'white'}}>↻</Text>
            </TouchableOpacity>
        </View>
    )
}

function example(imageUri){
    console.log(imageUri);
}

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
            <View style={styles.ProductInfoTextBox}>
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
        </View>
    );
}



const styles = StyleSheet.create({
    bg : {
        header: {flex: 1},
        bgImage: {width: '100%', height: '100%'},
    },
    
    horizontalLine : {
        borderBottomColor: 'black',
        borderBottomWidth: 0.5,
        width:'90%',
        marginLeft : '5%',
    },
    container : {
        flex : 1,
        backgroundColor : 'white',
    },
    box : {
        flexDirection:'row',
        marginTop : '2.5%',
        marginLeft : '2%',
        marginRight : '2%',
        backgroundColor : '#393838',
        borderRadius : 5,
    },
    image : {
        resizeMode : 'contain',
        width : 80,
        height : 80,
        borderRadius : 5,
        marginTop : 5,
        marginBottom : 5,
        marginLeft : 5
    },
    textBox : {
        flexDirection:'column',
        marginLeft : '2%',
        marginTop: 5,
        marginBottom : 5
    },
    bookName : {
        fontSize : 15,
        fontWeight:'100',
        color : 'white'
    },
    bookCost : {
        fontSize : 15,
        fontWeight : '900',
        marginTop : '5%',
        color : 'white'
    },
    bookReturnDate : {
        fontSize : 10,
        marginTop : '3%',
        color : '#B2B2B2'
    },
    bookGenre : {
        fontSize : 10,
        color : '#B2B2B2'
    },    
    horizontalLine : {
        borderBottomColor: 'black',
        borderBottomWidth: 0.5,
        width:'100%',
        height:'100%'
    },
    productInfoImage : {
        width : '100%',
        height : '30%',
        resizeMode : 'stretch'
    },
    bookInfo_name : {
        fontSize : 20,
        fontWeight : 'bold',
        marginLeft : '3%',
        paddingTop : '2.5%',
        color : 'white'
    },
    bookInfo_cost : {
        fontSize : 12,
        marginLeft : '3%',
        paddingTop : '2.5%',
        color : 'white'
    },
    bookInfo_returnDate: {
        fontSize : 12,
        marginLeft : '3%',
        paddingTop : '2.5%',
        color : 'white'
    },
    bookInfo_genre : {
        marginLeft : '3%',
        fontSize : 10,
        color : 'white'
    },
    bookInfo_textContent : {
        marginLeft : '3%',
        fontSize : 13,
        color : 'white'
    },
    button : { 
        borderRadius : 5,
        width : 30,
        marginLeft : '85%',
        marginTop : '2.5%'
    },
    buttonText : { 
        textAlign : 'right',
        fontSize : 30
    },
    headerRightContainer : {
        paddingRight : '5%',
        color : 'white'
    },
    ProductInfoTextBox : {
        height : '100%',
        backgroundColor : '#393838',
    }
});


export default StackNavigation;
