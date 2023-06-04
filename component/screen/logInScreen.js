import React, {useState} from 'react';
import {View, Image, TextInput, StyleSheet, Alert, Text, ImageBackground, TouchableOpacity, Button} from 'react-native';
import {logIn} from '../firebase/firebase';
import {checkData} from '../firebase/firebaseDB';

const LogIn = (navigation) => {
    const [email, setemail] = useState('');
    const [password, setpassword] = useState('');

    const logInfun = async () => {
        try { 
            await logIn({email, password});
            Alert.alert('Success LogIn');
            checkData();
            navigation.navigation.navigate('Bottom');
        } catch (e) {
            Alert.alert('Fail LogIn');
            console.error('실패:', e);
        }
    };

    const emailHandle = (event) => {
        setemail(event);
    };

    const passwordHandle = (event) => {
        setpassword(event);
    };

    return (
        <ImageBackground source = {require('../assets/background.png')} style = {styles.container}>
            <Text style = {styles.logoText}>To Do List</Text>
            <View style = {styles.logIncontainer}>
                <TextInput
                    value = {email}
                    style = {styles.inputBox}
                    onChangeText = {emailHandle}
                    placeholder = "Enter email"
                    placeholderTextColor="#000000"
                    autoCapitalize="none"/>
                <TextInput
                    value = {password}
                    style = {styles.inputBox}
                    onChangeText = {passwordHandle}
                    placeholder = "Enter password"
                    placeholderTextColor="#000000"/>
                <TouchableOpacity style = {styles.button} onPress = {logInfun}>
                    <Text style = {styles.buttonText}>LogIn</Text>
                </TouchableOpacity>
                <TouchableOpacity style = {styles.button} onPress = {() => navigation.navigation.navigate('SignUp')}>
                    <Text style = {styles.buttonText}>SignUp</Text>
                </TouchableOpacity>
            </View>
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    container : {
        flex : 1,
        justifyContent : 'center',
        alignItems : 'center',
    },

    logoText : {
        fontFamily : '맑은고딕',
        fontSize : 50,
        fontWeight : 'bold',
        marginBottom : 50,
        color : '#DEDAE9',
    },

    logIncontainer : {
        width : '80%',
        alignItems: 'center',
    },

    inputBox : {
        borderWidth: 3,
        borderColor: '#FFFFFF',
        borderRadius: 4,
        paddingVertical: 10,
        paddingHorizontal: 20,
        marginBottom: 20,
        width: '100%',
        backgroundColor: 'white',
    },

    button : {
        backgroundColor : '#FFFFFF',
        height: '12%',
        width: '100%',
        marginBottom: 16,
    },

    buttonText : {
        fontFamily : '맑은고딕',
        fontSize : 27,
        fontWeight : 'bold',
        textAlign: 'center',
    }
});

export default LogIn;