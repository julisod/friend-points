import React, { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/core'
import { StyleSheet, Text, View } from 'react-native';
import { Button } from 'react-native-elements';

import LoginFields from './LoginFields';
import RegisterFields from './RegisterFields';

export default function LoginScreen() {
  const [registering, setRegistering] = useState(false);
  
  return (
    <View style={styles.container}>
      <View style={styles.buttons}>
        <Button
          buttonStyle={{
            backgroundColor: 'rgba(111, 202, 186, 1)',
          }}
          disabled={!registering}
          onPress={() => setRegistering(false)}
          title="Login"
        />
        <Button
          buttonStyle={{
            backgroundColor: 'rgba(111, 202, 186, 1)',
          }}
          disabled={registering}
          onPress={() => setRegistering(true)}
          title="Register"
        />
      </View>
      <View style={styles.fields}>
        {registering ? <RegisterFields /> : <LoginFields />}
      </View>
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
  buttons: {
    /* backgroundColor: "black", */
    width: "60%",
    marginBottom: "30%",
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    margin: 10
  },
  fields: {
    alignItems: 'stretch',
    justifyContent: 'center',
    width: "90%"
  }
});
