import React, {useState, useEffect} from 'react';
import {View, StyleSheet, Text, ImageBackground, TextInput, ScrollView, Image, TouchableOpacity} from 'react-native';
import {addData, readData, updateData, deleteData} from '../firebase/firebaseDB';
import BouncyCheckbox from 'react-native-bouncy-checkbox';

const NoneDateManage = () => {
    const [todoText, settodoText] = useState('');
    const [todos, setTodos] = useState([]);
    const [save, setsave] = useState(false);
    const type = 'NoneDate';

    const newToDo = {
      id : '',
      todo : '',
      check : false,
    };

    useEffect(() => {
        readToDo();
    }, []);

    const readToDo = async () => {
        try {
            const data = await readData(type);
            setTodos([...data]);
          } catch (error) {
            console.error('데이터 읽기 실패:', error);
          }
    };

    const addToDo = async () => {
      try {
        newToDo.id = new Date().toString();
        newToDo.todo = todoText;
        await addData(newToDo, type);
        readToDo();
        settodoText('');
        setsave(false);
      } catch (e) {
        console.error('데이터 저장 실패:', e);
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
    };

    const handleTodoText = (event) => {
      settodoText(event);
      setsave(event.length > 0);
    };

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

    return(
      <ImageBackground source = {require('../assets/background.png')} style = {styles.container}>
        <Text style = {styles.logoText}>None Date ToDO</Text>
        <View style = {styles.inputContainer}>
          <TextInput
            value = {todoText}
            style = {styles.inputBox}
            onChangeText = {handleTodoText}
            placeholder = "Enter ToDo"
            placeholderTextColor="#000000"/>
            {save && (
          <TouchableOpacity onPress={addToDo}>
            <Image source={require('../assets/save.png')} style={styles.saveimage} />
          </TouchableOpacity>
        )}
        </View>
        <ScrollView style = {styles.scrollContainer}>
          {todos.slice().sort((a, b) => a.id.localeCompare(b.id)).map((item) => (
            <View key = {item.id} style = {styles.showToDocontainer}>
              <BouncyCheckbox
                style={styles.checkbox}
                size={25}
                fillColor="blue"
                unfillColor="#FFFFFF"
                text={item.todo}
                iconStyle={styles.icon}
                textStyle={styles.text}
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
    marginTop : 10,
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

export default NoneDateManage;