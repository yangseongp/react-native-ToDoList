import React, {useState, useEffect} from 'react';
import {View, StyleSheet, Text, ImageBackground, TextInput, Image, TouchableOpacity} from 'react-native';
import DatePicker from 'react-native-date-picker';
import {addData, formatDate} from '../firebase/firebaseDB';

const Edit = (navigation) => {
    const [date, setdate] = useState(new Date());
    const [todoText, settodoText] = useState('');
    const [save, setsave] = useState(false);
    const type = 'Date';

    const newToDo = {
        id : '',
        todo : '',
        date : '',
        check : false,
      };

    const addToDo = async () => {
        try {
          newToDo.id = new Date().toString();
          newToDo.todo = todoText;
          newToDo.date = await formatDate(date);
          await addData(newToDo, type);
          settodoText('');
          setsave(false);
        } catch (e) {
          console.error('데이터 저장 실패:', e);
        }
      };

    const handledate = (value) => {
        setdate(value);
    };

    const handleTodoText = (event) => {
        settodoText(event);
        setsave(event.length > 0);
    };

    return(
        <ImageBackground source = {require('../assets/background.png')} style = {styles.container}>
            <Text style = {styles.logoText}>Add ToDo</Text>
            <View style = {styles.dateContainer}>
            <DatePicker date={date} onDateChange={handledate} locale="ko-KR" mode = "datetime"  minuteInterval={5}/>
            </View>
            <View style = {styles.inputContainer}>
            <TextInput value = {todoText} style = {styles.inputBox} onChangeText = {handleTodoText} placeholder = "Enter ToDo" placeholderTextColor="#000000"/>
            {save && (
                <TouchableOpacity onPress={addToDo}>
                    <Image source={require('../assets/save.png')} style={styles.saveimage} />
                </TouchableOpacity>
            )}
            </View>
            <TouchableOpacity style = {styles.backContainer} onPress = {() => navigation.navigation.goBack()}>
                <Image style = {styles.backImage} source = {require('../assets/back.png')}/>
            </TouchableOpacity>
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    container : {
        flex : 1,
        alignItems : 'center',
    },

    logoText : {
        fontFamily : '맑은고딕',
        fontSize : 50,
        fontWeight : 'bold',
        color : '#DEDAE9',
        marginBottom: 25,
      },

    dateContainer : {
        alignItems: 'center',
        justifyContent : 'center',
        width: '90%',
        marginBottom: 15,
        borderWidth: 3,
        borderRadius : 15,
        backgroundColor: 'white',
    },

    inputContainer : {
        flexDirection: 'row',
        alignItems: 'center',
        width: '90%',
        marginBottom: 15,
        borderWidth: 3,
        backgroundColor: 'white',
    },

    inputBox : {
        paddingVertical: 10,
        paddingHorizontal: 20,
        width: '90%',
    },

    saveimage: {
        width: 30,
        height: 30,
    },

    backContainer : {
        justifyContent : 'center',
        alignItems: 'center',
        width: '90%',
        borderWidth: 3,
        backgroundColor: 'white',
    },

    backImage : {
        height : 60,
        width : 60,
    },

});

export default Edit;
