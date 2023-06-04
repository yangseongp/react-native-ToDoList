import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import LogIn from '../screen/logInScreen';
import SignUp from '../screen/signUpScreen';
import Edit from '../screen/editScreen';
import BottomTabNavigation from './bottomTabNavigation'

const Stack = createStackNavigator();

const StackNavigation = () => {
  return(
    <Stack.Navigator
     initialRouteName = 'LogIn'
     screenOptions = {{headerShown : false}}>
        <Stack.Screen name = 'LogIn' component = {LogIn}/>
        <Stack.Screen name = 'SignUp' component = {SignUp}/>
        <Stack.Screen name = 'Edit' component = {Edit}/>
        <Stack.Screen name = 'Bottom' component = {BottomTabNavigation}/>
    </Stack.Navigator>
  );
};

export default StackNavigation;