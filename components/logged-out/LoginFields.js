import React, { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/core'
import { StyleSheet, Text, View } from 'react-native';
import { Input, Button } from 'react-native-elements';

import {  auth } from './../../services/Firebase';
import { signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth"


export default function LoginFields() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const navigation = useNavigation()

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, user => {
      if (user) {
        navigation.replace("TabNavigation")
      }
    })
    return unsubscribe //jos tän jättää pois nii se heittää erroria
  }, [])

  const login = () => {
    signInWithEmailAndPassword(auth, email.trim(), password)
    .then((response) => {
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
        leftIcon={{ type: 'fontisto', name: 'email' }}
        onChangeText={input => setEmail(input)}
      />
      <Input
        style={{ paddingLeft: 4}}
        value={password}
        placeholder="Password"
        leftIcon={{ type: 'ant-design', name: 'lock' }}
        onChangeText={input => setPassword(input)}
        secureTextEntry
      />
      <Button
        buttonStyle={{}}
        onPress={login}
        title="Login"
      />  
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    /* flex: 1, */
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
