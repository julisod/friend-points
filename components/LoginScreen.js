import React, { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/core'
import { StyleSheet, Text, View, Button } from 'react-native';
import { Input } from 'react-native-elements';

import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth"

/* import { auth } from '../services/Firebase'; */

const firebaseConfig = {
  apiKey: "AIzaSyCLjKo3lMy77HxdXeopPKo0ZiBWBrwBx2M",
  authDomain: "friend-points.firebaseapp.com",
  projectId: "friend-points",
  storageBucket: "friend-points.appspot.com",
  messagingSenderId: "1045532427425",
  appId: "1:1045532427425:web:deb7116780a6ab532b1ce0"
};
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)


export default function LoginScreen() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const [isLoggedIn, setIsLoggedIn] = useState(false)

  const navigation = useNavigation()

 /*  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      if (user) {
        navigation.replace("Home")
      }
    })

    return unsubscribe
  }, []) */

  const register = () => {
    createUserWithEmailAndPassword(auth, email.trim(), password)
    .then((response) => {
      setIsLoggedIn(true);
      setPassword("");
    })
    .catch(error => alert(error.message))
  }

  const login = () => {
    signInWithEmailAndPassword(auth, email.trim(), password)
    .then((response) => {
      setIsLoggedIn(true);
      setPassword("");
    })
    .catch(error => alert(error.message))
  }
  
  return (
    <View style={styles.container}>
      <Input
          style={{ paddingLeft: 4,}}
          value={email}
          placeholder="Email"
          leftIcon={{ type: 'material-community', name: 'food-apple' }}
          onChangeText={input => setEmail(input)}
        />
        <Input
          style={{ paddingLeft: 4}}
          value={password}
          placeholder="Password"
          leftIcon={{ type: 'material-community', name: 'format-list-numbered-rtl' }}
          onChangeText={input => setPassword(input)}
        />
        <Button onPress={register} title="Register" />
        <Button onPress={login} title="Login" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
