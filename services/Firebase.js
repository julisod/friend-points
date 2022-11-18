import { Alert } from 'react-native';
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"
import { getDatabase, set, ref, get, remove } from 'firebase/database';
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


// Realtime database
const addUsertoDB = (uid, email, name, username) => {
  set(
    ref(database, `users/${uid}/personal_info`),
    {
      "email": email,
      "name" : name,
      "username": username,
      "uid" : uid
    }
  )
  .then(() => {
    console.log("Succesfully saved user to db")
  })
  .catch((error) => {
    console.log("Failed adding user to db");
  });
}

const sendFriendRequest = (friendUid) => {
  let userUid = auth.currentUser.uid

  const userRef = ref(database, 'users/' + userUid);
  get(userRef).then((snapshot) => {
    
    // First we have to check if we can send the request
    if (snapshot.child("friends/" + friendUid).exists()) {
      Alert.alert("This user is already in your friends")

    } else if (snapshot.child("pending_requests/" + friendUid).exists()) {
      addToFriends(friendUid);

    } else if (snapshot.child("sent_requests/" + friendUid).exists()) {
      Alert.alert("You have already sent them a friend request")

    } else {

      // Here we're actually saving the request to db
      set(
        ref(database, `users/${userUid}/sent_requests/${friendUid}`),
        true
      );
      set(
        ref(database, `users/${friendUid}/pending_requests/${userUid}`),
        true
      );
    }
  }).catch((error) => {
    console.error(error);
  });
}

const addToFriends = (friendUid) => {
  let userUid = auth.currentUser.uid

  removeRequest(friendUid);

  // Add to friend list
  set(
    ref(database, `users/${userUid}/friends/${friendUid}`),
    true
  );
  set(
    ref(database, `users/${friendUid}/friends/${userUid}`),
    true
  );
    //toast tähän??
  console.log("added to friends")
}

const removeRequest = (friendUid) => {
  let userUid = auth.currentUser.uid
  
  // Remove the friend requests
  remove(ref(database, `users/${userUid}/sent_requests/`));
  remove(ref(database, `users/${userUid}/pending_requests/${friendUid}`));
  remove(ref(database, `users/${friendUid}/sent_requests/${userUid}`));
  remove(ref(database, `users/${friendUid}/pending_requests/${userUid}`));

}

export { auth, database, addUsertoDB, sendFriendRequest, addToFriends, removeRequest };