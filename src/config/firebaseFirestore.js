import firebase from '@react-native-firebase/app';
import firestore from '@react-native-firebase/firestore';


const firebseConfig = {
    clientId: '413468659846-hovb2a3tmcrbg59028544j8vgn9flc7o.apps.googleusercontent.com',
    appId: '1:413468659846:android:7cf76f411987dbe4b18107',
    apiKey: 'AIzaSyCAmunf2CMHHyVVDvrMxpRjyFCa1AWscHU',
    databaseURL: 'https://training-63dd3.firebaseio.com',
    storageBucket: 'training-63dd3.appspot.com',
    messagingSenderId: '413468659846',
    projectId: "training-63dd3",
    persistence: true
}

export function initializeApp() {
    firebase.initializeApp(firebseConfig);
}

function getFirestoreCollection() {
    return firestore().collection('testcollection');
}

export function getRemoteConfig() {
    getFirestoreCollection().doc('testId').update({ifFlagTrue:false}).then(docSnapshot => {
        if (docSnapshot.exists) {
            var data = docSnapshot.data();
            console.log("################## get remote data :"+ JSON.stringify(data));
            resolve(data);
        } else {
            resolve("");
        }
    })
}