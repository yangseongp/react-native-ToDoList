import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Edit from '../screen/editScreen';

const Stack = createStackNavigator();

const EditNavigation = () => {
  return (
    <Stack.Navigator
     initialRouteName = "Edit"
     screenOptions = {{headerShown : false}}>
        <Stack.Screen name = "Edit" component = {Edit}/>
    </Stack.Navigator>
  );
};

export default EditNavigation;
