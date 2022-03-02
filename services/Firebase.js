// Import the functions you need from the SDKs you need
import * as firebase from "firebase";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCLjKo3lMy77HxdXeopPKo0ZiBWBrwBx2M",
  authDomain: "friend-points.firebaseapp.com",
  projectId: "friend-points",
  storageBucket: "friend-points.appspot.com",
  messagingSenderId: "1045532427425",
  appId: "1:1045532427425:web:deb7116780a6ab532b1ce0"
};

// Initialize Firebase
let app;
if (firebase.apps.length === 0) {
  app = firebase.initializeApp(firebaseConfig);
} else {
  app = firebase.app()
}

const auth = firebase.auth()

export { auth };