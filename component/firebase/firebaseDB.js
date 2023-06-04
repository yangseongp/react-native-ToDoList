import React from 'react';
import firebase from '@react-native-firebase/app';

export async function checkData() {
    const user = firebase.auth().currentUser;
    const firestore = firebase.firestore();

    const collectionRef = firestore.collection('ToDoList');

    const doc = await collectionRef.doc(user.uid).get();

    if (!doc.exists) {
      const docRef = collectionRef.doc(user.uid);
      await docRef.set({});
    }
  }

export async function firstThing() {
    try {
        const user = firebase.auth().currentUser;
        const firestore = firebase.firestore();
        let udata = null;
        const currentDate = new Date();

        const collectionRef = firestore.collection('ToDoList').doc(user.uid);
        const dateRef = collectionRef.collection('Date');

        const querySnapshot = await dateRef.orderBy('date').where('date','>', currentDate).limit(1).get();

        querySnapshot.forEach(doc => {
            udata = doc.data();
        });

       return udata;

    } catch (e) {
      console.error('데이터 가져오기 실패:', e);
      throw e;
    }
}

export async function addData(data, type) {
    try {
        const user = firebase.auth().currentUser;
        const firestore = firebase.firestore();

        const ref = firestore.collection('ToDoList').doc(user.uid).collection(type).doc();

        await ref.set(data);

    } catch (e) {
        console.error('데이터 저장 실패:', e);
        throw e;
    }
}

export async function readData(type) {
    try {
        const user = firebase.auth().currentUser;
        const firestore = firebase.firestore();
        const data = [];

        const ref = firestore.collection('ToDoList').doc(user.uid).collection(type);

        const dateoptions = {
        timeZone : 'Asia/Seoul',
        month : 'numeric',
        day : 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        weekday: 'short',
        };

        if(type === 'Date')
        {
            const datequerySnapshot = await ref.orderBy('date').get();

            datequerySnapshot.forEach(doc => {
                const udata = doc.data();
                data.push(udata);
            });

            const formattedData = data.map(item => ({...item, date: item.date.toDate().toLocaleString('ko-kr', dateoptions)}));

            return formattedData;
        }
        else
        {
            const nonedatequarySnapshot = await ref.orderBy('id', 'desc').get();

            nonedatequarySnapshot.forEach(doc => {
                const udata = doc.data();
                data.push(udata);
            });

            return data;
        }

    } catch (e) {
        console.error('데이터 불러오기 실패:', e);
        throw e;
    }
}

export async function deleteData(id, type) {
    try {
        const user = firebase.auth().currentUser;
        const firestore = firebase.firestore();

        const dataRef = firestore.collection('ToDoList').doc(user.uid).collection(type).where('id', '==', id);

        const querySnapshot = await dataRef.limit(1).get();
        const document = querySnapshot.docs[0];

        await document.ref.delete();

    } catch (e) {
        console.error('데이터 삭제 실패:', e);
        throw e;
    }
}

export async function updateData(id, data, type) {
    try {
        const user = firebase.auth().currentUser;
        const firestore = firebase.firestore();

        const dataRef = firestore.collection('ToDoList').doc(user.uid).collection(type).where('id', '==', id);
        const querySnapshot = await dataRef.limit(1).get();
        const document = querySnapshot.docs[0];

        await document.ref.update(data);


    } catch (e) {
        console.error('데이터 수정 실패:', e);
        throw e;
    }
}

export async function formatDate(data) {
    const firestore = firebase.firestore;

    const formatData = firestore.Timestamp.fromDate(data);

    return formatData;
}