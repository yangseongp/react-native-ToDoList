import React, {useState} from 'react';
import {View, Image, TextInput, StyleSheet, Alert, Text, ImageBackground, TouchableOpacity, Button} from 'react-native';
import {signUp} from '../firebase/firebase';
import {checkData} from '../firebase/firebaseDB';

const SignUp = (navigation) => {
    const [email, setemail] = useState('');
    const [password, setpassword] = useState('');
    const [checkpassword, setcheckpassword] = useState('');

    const signUpfun = async () => {
        if(email == '') {
            return Alert.alert('Enter please email');
        }
        else if(password == '') {
            return Alert.alert('Enter please password');
        }
        else if(checkpassword == '') {
            return Alert.alert('Enter please Checkpassword');
        }
        else {
            if(password == checkpassword)
            {
                try { 
                    await signUp({email, password});
                    await checkData();
                    Alert.alert('Success SignUp');
                    navigation.navigation.goBack();
                } catch (e) {
                    Alert.alert('Fail signUp');
                    console.log(e.toString());
                }
            }
            else {
                Alert.alert('Fail signUp, Check yor password');
            }
        }
    };

    const emailHandle = (event) => {
        setemail(event);
    };

    const passwordHandle = (event) => {
        setpassword(event);
    };

    const checkpasswordHandle = (event) => {
        setcheckpassword(event);
    };

    return (
        <ImageBackground source = {require('../assets/background.png')} style = {styles.container}>
            <Text style = {styles.logoText}>Sign Up</Text>
            <View style = {styles.logIncontainer}>
                <TextInput
                    value = {email}
                    style = {styles.inputBox}
                    onChangeText = {emailHandle}
                    placeholder = "Enter email"
                    placeholderTextColor="#000000"/>
                <TextInput
                    value = {password}
                    style = {styles.inputBox}
                    onChangeText = {passwordHandle}
                    placeholder = "Enter password"
                    placeholderTextColor="#000000"/>
                <TextInput
                    value = {checkpassword}
                    style = {styles.inputBox}
                    onChangeText = {checkpasswordHandle}
                    placeholder = "Enter again password"
                    placeholderTextColor="#000000"/>
                <TouchableOpacity style = {styles.button} onPress = {signUpfun}>
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
        backgroundColor : '#FFFFFF',
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

export default SignUp;