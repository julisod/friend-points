// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"
import { getDatabase, push, set, ref } from 'firebase/database';
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
const addUsertoDB = (uid, email, name) => {
  set(
    ref(database, `users/${uid}/personal_info`),
    {
      "email": email,
      "name" : name,
      "uid" : uid
    }
  );
}

const sendFriendRequest = (friendUid) => {
  let userUid = auth.currentUser.uid
  console.log(userUid, friendUid)
  /* if (tarkista onko kavereissa yms.) {
    
  } else */
  push(
    ref(database, `users/${userUid}/sent-requests`),
    friendUid
  );
  push(
    ref(database, `users/${friendUid}/pending-requests`),
    userUid
  );
}

export { auth, database, addUsertoDB, sendFriendRequest };