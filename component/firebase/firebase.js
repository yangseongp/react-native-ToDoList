import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

export function logIn({email, password}) {
    return auth().signInWithEmailAndPassword(email, password);
  }
export function signUp({email, password}) {
    return auth().createUserWithEmailAndPassword(email, password);
  }
export function subscribeAuth(callback) {
    return auth().onAuthStateChanged(callback);
  }
export function signOut() {
    return auth().signOut();
  }