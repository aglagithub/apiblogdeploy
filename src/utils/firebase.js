// Import the functions you need from the SDKs you need
const { initializeApp } = require('firebase/app');
const { getStorage } = require('firebase/storage');
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  // apiKey: 'AIzaSyAOFGmJFQ-fMA9_fA5vxKMrjVOW0isWeTQ',
  // authDomain: 'blogacademlo.firebaseapp.com',
  // projectId: 'blogacademlo',
  // storageBucket: 'blogacademlo.appspot.com',
  // messagingSenderId: '786028496437',
  // appId: '1:786028496437:web:3ca08d7b61dfd64ddd937c',

  apiKey: process.env.FIREBASE_API_KEY,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE,
  appId: process.env.FIREBASE_API_ID,
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

//initialize storage
const storage = getStorage(firebaseApp);
module.exports =storage;
