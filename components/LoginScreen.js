import React, { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/core'
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { Input } from 'react-native-elements';

import { auth } from '../services/Firebase';

export default function LoginScreen() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const navigation = useNavigation()
  
  return (
    <View style={styles.container}>
      <Input
          style={{ paddingLeft: 4,}}
          value={product}
          placeholder="Product"
          leftIcon={{ type: 'material-community', name: 'food-apple' }}
          onChangeText={input => setProduct(input)}
        />
        <Input
          style={{ paddingLeft: 4}}
          value={amount}
          placeholder="Amount"
          leftIcon={{ type: 'material-community', name: 'format-list-numbered-rtl' }}
          onChangeText={input => setAmount(input)}
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
