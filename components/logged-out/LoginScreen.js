import React, { useState} from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Header } from 'react-native-elements';

import LoginFields from './LoginFields';
import RegisterFields from './RegisterFields';

export default function LoginScreen() {
  const [registering, setRegistering] = useState(false);
  
  return (
    <View style={styles.container}>
      <Header
        style={styles.header}
        backgroundColor='#83677B'
        leftComponent={
          registering
          ?
            <Button
            buttonStyle={{
              backgroundColor: '#a796c6',
            }}
            disabled={!registering}
            onPress={() => setRegistering(false)}
            title="Login"
            />
          :
            null
        }

        centerComponent={{
          text: registering ? 'REGISTER': "LOGIN",
          style:{color: '#fff'}
        }}

        rightComponent={
          !registering
          ?
            <View style={{width: 80}}>
              <Button
              buttonStyle={{
                backgroundColor: "#a796c6"
              }}
              disabled={registering}
              onPress={() => setRegistering(true)}
              title="Register"
              />
            </View>
          :
            null
        }
      />
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
  fields: {
    flex: 3,
    margin: "auto",
    alignItems: 'stretch',
    justifyContent: 'center',
    width: "90%",
  },
  header: {
    flex: 1
  }
});
