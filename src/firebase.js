import * as firebase from 'firebase';

const firebaseConfig = {
    apiKey: `${process.env.REACT_APP_API_KEY}`,
    authDomain: "productivity-1f520.firebaseapp.com",
    databaseURL: "https://productivity-1f520.firebaseio.com",
    projectId: "productivity-1f520",
    storageBucket: "productivity-1f520.appspot.com",
    messagingSenderId: "403436618146",
    appId: `${process.env.REACT_APP_API_ID}`,
    measurementId: "G-VZXRLYM31S"
};

firebase.initializeApp(firebaseConfig);
const databaseRef = firebase.database().ref('mockData/');
export const rakeshWorkSessions = firebase.database().ref('rakeshWorkSessions/');
export const mockSessionsDataRef = databaseRef;