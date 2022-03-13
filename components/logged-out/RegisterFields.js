import React, { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/core'
import { StyleSheet, Text, View } from 'react-native';
import { Input, Button } from 'react-native-elements';

import { addUsertoDB, auth } from './../../services/Firebase';
import { createUserWithEmailAndPassword, onAuthStateChanged } from "firebase/auth"


export default function RegisterFields() {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [username, setUsername] = useState('')

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
      console.log(response.user.uid)
      let uid = response.user.uid
      addUsertoDB(uid, email.trim(), name.trim(), username.trim())
    })
    .catch(error => alert(error.message))
  }
  
  return (
    <View style={styles.container}>
      <Input
        style={{ paddingLeft: 4,}}
        value={name}
        placeholder="Name"
        leftIcon={{ type: 'simple-line-icon', name: 'user' }}
        onChangeText={input => setName(input)}
      />
      <Input
        style={{ paddingLeft: 4,}}
        value={username}
        placeholder="Username"
        autoCapitalize='none'
        leftIcon={{ type: 'simple-line-icon', name: 'pencil' }}
        onChangeText={input => setUsername(input)}
      />
      <Input
        style={{ paddingLeft: 4,}}
        value={email}
        placeholder="Email"
        autoCapitalize='none'
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
        buttonStyle={{backgroundColor: "#6c5887"}}
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
