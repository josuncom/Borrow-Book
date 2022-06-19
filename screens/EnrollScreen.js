import { firebase } from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import * as React from 'react';
import { useState } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet, TouchableOpacity } from 'react-native';
import moment from 'moment';
import ImagePicker from 'react-native-image-crop-picker';
import RNPickerSelect from 'react-native-picker-select';
import DateTimePickerModal from 'react-native-modal-datetime-picker';



Date.prototype.format = function(f) {
    if (!this.valueOf()) return " ";
 
    var weekName = ["일요일", "월요일", "화요일", "수요일", "목요일", "금요일", "토요일"];
    var d = this;
     
    return f.replace(/(yyyy|yy|MM|dd|E|hh|mm|ss|a\/p)/gi, function($1) {
        switch ($1) {
            case "yyyy": return d.getFullYear();
            case "yy": return (d.getFullYear() % 1000).zf(2);
            case "MM": return (d.getMonth() + 1).zf(2);
            case "dd": return d.getDate().zf(2);
            case "E": return weekName[d.getDay()];
            case "HH": return d.getHours().zf(2);
            case "hh": return ((h = d.getHours() % 12) ? h : 12).zf(2);
            case "mm": return d.getMinutes().zf(2);
            case "ss": return d.getSeconds().zf(2);
            case "a/p": return d.getHours() < 12 ? "오전" : "오후";
            default: return $1;
        }
    });
};
 
String.prototype.string = function(len){var s = '', i = 0; while (i++ < len) { s += this; } return s;};
String.prototype.zf = function(len){return "0".string(len - this.length) + this;};
Number.prototype.zf = function(len){return this.toString().zf(len);};



export default function EnrollScreen({navigation}) {
    const [addName, setAddName] = useState('');
    const [addCost, setAddCost] = useState('');
    const [createdAt , setCreatedAt] = useState('');
    const [genre, setGenre] = useState('');
    const [isDatePickerVisible, setIsDatePickerVisible] = useState(false);
    const [img, setImg] = useState(null);
    const [returnDate, setReturnDate] = useState('');
    const [textContent, setTextContent] = useState('');
    const placeholder = "언제까지 대여하시나요?";
    var now = moment();

    const showDatePicker = () => {
        console.log(isDatePickerVisible);
        setIsDatePickerVisible(true);
    };

    const hideDatePicker = () => {
        setIsDatePickerVisible(false);
    };

    const handleConfirm = (date) => {
        setReturnDate(date.format("yyyy/MM/dd"));
        hideDatePicker();
        onChangeText(date.format("yyyy/MM/dd"))
    }

    
    const addCollection = firestore().collection('user');

    const addItem = async () =>{
        try{
            await addCollection.add({
                name : addName,
                cost : addCost,
                createdAt : now.format(),
                genre : genre,
                returnDate : returnDate,
                textContent : textContent
            });
            
        } catch(error){
            console.log(error.message);
        }
    };

    const uploading = () =>{
        if(addName != '' && addCost != '' && genre != '' && returnDate != '' && textContent != ''){
            setAddName('');
            setAddCost('');
            setCreatedAt('');
            setGenre('');
            setReturnDate('');
            setTextContent('');
        ImagePicker.openPicker({
            width:300,
            height: 400,
            cropping: false
        }).then(async image => {
            console.log(image); 
            setImg(image.path);
            let imgName= image.path.substring(image.path.lastIndexOf('/') + 1);
            console.log(imgName);
            const reference = firebase.storage().ref(now.format());
            try{
                await reference.putFile(image.path);
                
            } catch(error){
                console.log(error.message);
            }

                addItem();
                Alert.alert("상품 등록이 완료되었습니다!");
            })
        } else{
            Alert.alert("모든 항목을 입력했는지 확인해주세요!");
        };
    }

    return (
        <View style={styles.container}>
            <View style={styles.box}>
                <TextInput style={styles.nameInput}
                    placeholder="글 제목"
                    placeholderTextColor="#545454"
                    value={addName}
                    onChange={e => setAddName(e.nativeEvent.text)}/>

                <View style={styles.horizontalLine}/>

                <TouchableOpacity onPress={showDatePicker} style={{marginLeft:"5%", marginRight:"5%", backgroundColor : '#393838'}}>
                    <TextInput
                        pointerEvents="none"
                        style={styles.textInput}
                        placeholder={placeholder}
                        placeholderTextColor="#545454"
                        color='white'
                        underlineColorAndroid="transparent"
                        editable={false}
                        value={returnDate}/>


                <DateTimePickerModal
                        headerTextIOS={placeholder}
                        isVisible={isDatePickerVisible}
                        mode="date"
                        onConfirm={value => handleConfirm(value)}
                        onCancel={hideDatePicker}/>
                </TouchableOpacity>	

                <View style={styles.horizontalLine}/>

                <TextInput style={styles.costInput}
                    placeholder="희망 판매가격을 입력하세요!"
                    placeholderTextColor="#545454"
                    value={addCost}
                    onChange={e => setAddCost(e.nativeEvent.text)}
                    keyboardType="number-pad"/>

                <View style={styles.horizontalLine}/>

                <View style={styles.genreSelect}>
                    <RNPickerSelect
                    placeholder={{
                        label : '카테고리 선택',
                    }}
                    onValueChange={value => setGenre(value)}
                        items={[
                            { label : '국내도서', value:'국내도서'},
                            { label : '해외도서', value:'해외도서'}
                    ]}/>
                </View>

                <View style={styles.horizontalLine}/>


                <TextInput style={styles.contentInput}
                    placeholder="게시글 내용을 작성해주세요."
                    placeholderTextColor="#545454"
                    value={textContent}
                    multiline = {true}
                    onChange={e => setTextContent(e.nativeEvent.text)}/>

    

                <TouchableOpacity onPress={uploading} style={{ backgroundColor:'white', marginTop : '10%', marginLeft:'30%', marginRight:'30%', borderRadius:5, height:40}}>
                    <View style={{marginTop:10}}>
                        <Text style={{color : 'black', textAlign:'center'}}>사진과 함께 등록하기</Text>
                    </View>
                </TouchableOpacity>

            </View>
    </View>
    );
}


const styles = StyleSheet.create({
    container : {
        flex : 1,
        backgroundColor : '#545454',
    },
    box : {
        marginTop : '10%',
        borderRadius : 10
    },
    horizontalLine : {
        borderBottomColor: 'black',
        borderBottomWidth: 0.5,
        width:'90%',
        marginLeft : '5%',
    },

    nameInput : {
        width: '90%',
        marginLeft : '5%',
        backgroundColor : '#393838',
        color : 'white'
    },

    untilInput : {
        width: '90%',
        marginLeft : '5%',
        backgroundColor : '#393838',
        color : 'white'
    },

    costInput : {
        width: '90%',
        marginLeft : '5%',
        backgroundColor : '#393838',
        color : 'white'
    },
    contentInput : {
        width: '90%',
        marginLeft : '5%',
        backgroundColor : '#393838',
        color : 'white'
    },

    genreSelect : {
        marginLeft : '5%',
        marginRight:'5%',
        width : '90%',
        backgroundColor : '#393838',
        color : 'white'
    }
}
)

