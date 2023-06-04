import React, {useState, useEffect} from 'react';
import {View, StyleSheet, Text, ImageBackground, TextInput, ScrollView, Image, TouchableOpacity} from 'react-native';
import {readData, deleteData, updateData} from '../firebase/firebaseDB';
import BouncyCheckbox from 'react-native-bouncy-checkbox';

const DateManage = (navigation) => {
    const [todoText, settodoText] = useState('');
    const [todos, setTodos] = useState([]);
    const type = 'Date';

    const newToDo = {
      id : '',
      todo : '',
      date : '',
      check : false,
    };

    useEffect(() => {
      const unsubscribe = navigation.navigation.addListener('focus', () => {
        readToDo();
      });

      return unsubscribe;
    }, [navigation]);

    const readToDo = async () => {
        try {
            const data = await readData(type);
            setTodos([...data]);
          } catch (error) {
            console.error('데이터 읽기 실패:', error);
          }
    };

    const deleteToDo = async (id) => {
      try {
        await deleteData(id, type);
        readToDo();
      } catch (e) {
        console.error('데이터 삭제 실패:', e);
      }
    };

    const updateToDo = async (id, data) => {
      try {
        await updateData(id, data, type);
      } catch (e) {
        console.error('데이터 수정 실패:', e);
      }
    }

    const toggleCheck = (id) => {
      const updatedTodos = todos.map((item) => {
        if (item.id === id) {
          const changecheck = !item.check;
          const sendData = {
            check : changecheck,
          };

          updateToDo(id, sendData);

          return { ...item, check: changecheck };
        }
        return item;
      });
      setTodos(updatedTodos);
    };

    const formatDate = () => {
      const dateoptions = {
        timeZone : 'Asia/Seoul',
        month : 'numeric',
        day : 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        weekday: 'short',
      };

      const currentDate = new Date();
      const format = currentDate.toLocaleString('ko-kr', dateoptions);

      return format;
    }

    return(
      <ImageBackground source = {require('../assets/background.png')} style = {styles.container}>
        <Text style = {styles.logoText}>Date ToDO</Text>
        <TouchableOpacity style = {styles.inputContainer} onPress = {() => navigation.navigation.navigate('Edit')}>
          <Text style = {styles.addtext}>Add ToDo</Text>
        </TouchableOpacity>
        <ScrollView style = {styles.scrollContainer}>
          {todos.slice().sort((a, b) => a.date.localeCompare(b.date)).map((item) => (
            <View key = {item.id} style = {styles.showToDocontainer}>
               <BouncyCheckbox
                style={styles.checkbox}
                size={25}
                fillColor="blue"
                unfillColor="#FFFFFF"
                text={item.date + '\n' + item.todo}
                iconStyle={styles.icon}
                textStyle={formatDate() < item.date ? styles.text : styles.pasttext}
                isChecked={item.check}
                onPress={() => toggleCheck(item.id)}/>
              <TouchableOpacity onPress={() => deleteToDo(item.id)}>
                <Image source = {require('../assets/delete.png')} style = {styles.deleteImage}/>
              </TouchableOpacity>
            </View>
          ))}
        </ScrollView>
      </ImageBackground>
    );
}

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
    color : '#DEDAE9',
  },

  inputContainer : {
    alignItems: 'center',
    justifyContent : 'center',
    width: '90%',
    height : '7%',
    marginBottom: 15,
    borderWidth: 3,
    borderRadius : 15,
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

  scrollContainer : {
    height : '90%',
    width: '90%',
    borderWidth: 3,
    borderColor: 'balck',
    backgroundColor: 'white',
  },

  showToDocontainer : {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: 'black',
    flexWrap: 'wrap',
  },

  text: {
    fontSize: 25,
    fontWeight : 'bold',
    color : 'black',
    fontFamily: '맑은고딕',
  },

  pasttext: {
    fontSize: 25,
    fontWeight : 'bold',
    color : 'red',
    fontFamily: '맑은고딕',
  },

  addtext: {
    fontSize: 25,
    fontWeight : 'bold',
    color : 'gray',
    fontFamily: '맑은고딕',
  },

  icon : {
    borderColor: 'black',
    marginLeft: 10,
  },

  deleteImage : {
    width: 30,
    height: 30,
    marginLeft: 8,
  }

});

export default DateManage;