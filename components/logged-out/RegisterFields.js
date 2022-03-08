import React, { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/core'
import { StyleSheet, Text, View } from 'react-native';
import { Input, Button } from 'react-native-elements';

import { addUsertoDB, auth } from './../../services/Firebase';
import { createUserWithEmailAndPassword, onAuthStateChanged } from "firebase/auth"


export default function RegisterFields() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')

  const navigation = useNavigation()

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, user => {
      if (user) {
        navigation.replace("TabNavigation")
      }
    })
    return unsubscribe //jos tän jättää pois nii se heittää erroria
  }, [])

  const register = () => {
    createUserWithEmailAndPassword(auth, email.trim(), password)
    .then((response) => {
      console.log(response.UserCredentialImpl)
      /* let uid = response.user.uid */
      addUsertoDB(/* uid,  */email.trim()/* , name */)
      setPassword("");
    })
    .catch(error => alert(error.message))
  }
  
  return (
    <View style={styles.container}>
      <Input
        style={{ paddingLeft: 4,}}
        value={name}
        placeholder="Name"
        leftIcon={{ type: 'material-community', name: 'email-outline' }}
        onChangeText={input => setName(input)}
      />
      <Input
        style={{ paddingLeft: 4,}}
        value={email}
        placeholder="Email"
        leftIcon={{ type: 'material-community', name: 'email-outline' }}
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
        onPress={register}
        title="Register"
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
