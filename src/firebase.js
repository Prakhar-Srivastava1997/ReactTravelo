import firebase from 'firebase/compat/app';
import 'firebase/compat/database';

const firebaseConfig = {
  apiKey: "AIzaSyBpoJ1at3qWwobeTFoGT7jl2sqId9KZQ4Q",
  authDomain: "travelouserdata.firebaseapp.com",
  databaseURL: "https://travelouserdata-default-rtdb.firebaseio.com",
  projectId: "travelouserdata",
  storageBucket: "travelouserdata.appspot.com",
  messagingSenderId: "451341301286",
  appId: "1:451341301286:web:1265ca3ece1e4f632458e7"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
export const dataRef = firebase.database();

export default firebase;