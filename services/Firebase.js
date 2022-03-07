// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"
import { getDatabase, push, ref } from 'firebase/database';
// https://firebase.google.com/docs/web/setup#available-libraries

const firebaseConfig = {
  apiKey: "AIzaSyCLjKo3lMy77HxdXeopPKo0ZiBWBrwBx2M",
  authDomain: "friend-points.firebaseapp.com",
  databaseURL: "https://friend-points-default-rtdb.europe-west1.firebasedatabase.app/",
  projectId: "friend-points",
  storageBucket: "friend-points.appspot.com",
  messagingSenderId: "1045532427425",
  /* appId: "1:1045532427425:web:deb7116780a6ab532b1ce0" */ //virhe lähti kun laitoin tämän kommenteihin...
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
const database = getDatabase(app);

//realtime database
const addUsertoDB = (email, name) => {
  push(
    ref(database, 'userlist/'),
    { 
      'email': email,
      "name" : name });
}

export { auth, database, addUsertoDB };