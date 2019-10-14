import * as firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyAOKgsJYYHIemdosMA3v_k5ot_BRy5YCZg",
    authDomain: "productivity-1f520.firebaseapp.com",
    databaseURL: "https://productivity-1f520.firebaseio.com",
    projectId: "productivity-1f520",
    storageBucket: "productivity-1f520.appspot.com",
    messagingSenderId: "403436618146",
    appId: "1:403436618146:web:ea056b2c733abf3af8f2fb",
    measurementId: "G-VZXRLYM31S"
};

firebase.initializeApp(firebaseConfig);
const databaseRef = firebase.database().ref('mockData/');
export const rakeshWorkSessions = firebase.database().ref('rakeshWorkSessions');
export const mockSessionsDataRef = databaseRef;

