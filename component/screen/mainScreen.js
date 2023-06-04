import React, {useState, useEffect} from 'react';
import {View, StyleSheet, Text, ImageBackground} from 'react-native';
import {firstThing} from '../firebase/firebaseDB';

const Main = (navigation) => {
    const [currentDate, setcurrentDate] = useState(new Date());
    const [userfirstThing, setuserfirstThing] = useState('');
    const [remainingDays, setremainingDays] = useState('');
    const [dateFormat, setdateFormat] = useState('');

    useEffect(() => {
        const interval = setInterval(() => {
            setcurrentDate(new Date());
        }, 1000);

        return () => {
            clearInterval(interval);
        };
    }, []);

    useEffect(() => {
        const unsubscribe = navigation.navigation.addListener('focus', () => {
            setThing();
        });

        return unsubscribe;
      }, [navigation]);

    const dateoptions = {
        timeZone : 'Asia/Seoul',
        month : 'numeric',
        day : 'numeric',
        weekday: 'short',
    };

    const timeoptions = {
        timeZone : 'Asia/Seoul',
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
    };

    const formattedDate = currentDate.toLocaleString('ko-KR', dateoptions);
    const formattedTime = currentDate.toLocaleString('ko-KR', timeoptions);

    const setThing = async () => {
        const data = await firstThing();
        const cDate = new Date();
        cDate.setHours(0, 0, 0, 0);

        if(data == null)
        {
            setuserfirstThing('등록된 일정이 없습니다.');
            setdateFormat('');
            setremainingDays('');
        }
        else
        {
            setuserfirstThing(data.todo);
            const dateData = data.date.toDate();
            dateData.setHours(0, 0, 0, 0);
            const remainingTime = dateData.getTime() - cDate.getTime();
            const remainDays = Math.floor(remainingTime / (1000 * 3600 * 24));
            setremainingDays(remainDays);
            setdateFormat('D +');
        }
    }

    return (
        <ImageBackground source = {require('../assets/background.png')} style = {styles.container}>
            <View style = {styles.dataContainer}>
                <Text style = {styles.dateText}>{formattedDate}</Text>
                <Text style = {styles.dateText}>{formattedTime}</Text>
                <Text style = {styles.thingText}>{userfirstThing}</Text>
                <Text style = {styles.remainText}>{dateFormat}{remainingDays}</Text>
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

    dataContainer : {
        height : '80%',
        width: '80%',
        textAlign : 'left',
    },

    dateText : {
        fontFamily : '맑은고딕',
        fontSize : 35,
        fontWeight : 'bold',
        marginBottom : 10,
        color : '#FFFFFF',
        textAlign : 'left',
    },

    thingText : {
        fontFamily : '맑은고딕',
        fontSize : 32,
        fontWeight : 'bold',
        marginTop : 30,
        color : '#FFFFFF',
        textAlign : 'left',
    },

    remainText : {
        fontFamily : '맑은고딕',
        fontSize : 32,
        fontWeight : 'bold',
        marginTop : 10,
        color : '#FFFFFF',
        textAlign : 'left',
    }
});
export default Main;
