import React from 'react';
import { Image } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import EditNavigation from './editNavigation';
import Main from '../screen/mainScreen';
import NoneDateManage from '../screen/noneDatemanagScreen';
import DateManage from '../screen/datemanageScreen';
import Icon from 'react-native-vector-icons/MaterialIcons';

const BottomTab = createBottomTabNavigator();

const BottomTabNavigation = () => {
  return (
    <BottomTab.Navigator
      initialRouteName="Main"
      screenOptions = {{headerShown : false, tabBarShowLabel : false}}>
      <BottomTab.Screen name="Main" component={Main} options={{tabBarIcon: ({color, size}) => (<Icon name = "access-time" color={color} size = {size}/>)}}/>
      <BottomTab.Screen name="NoneDate" component={NoneDateManage} options={{tabBarIcon: ({color, size}) => (<Icon name = "description" color={color} size = {size}/>)}}/>
      <BottomTab.Screen name="Date" component={DateManage} options={{tabBarIcon: ({color, size}) => (<Icon name = "event-note" color={color} size = {size}/>)}}/>
    </BottomTab.Navigator>
  );
};

export default BottomTabNavigation;