import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, FlatList, Button } from 'react-native';
import { Input, ListItem, Icon } from 'react-native-elements';
import { useNavigation } from '@react-navigation/core'
import { ref, onValue } from 'firebase/database';

import { auth, database } from '../services/Firebase';

export default function Friends() {
  
  const [userList, setUserList] = useState([]);
  
  const navigation = useNavigation()

  const signOut = () => {
    auth
      .signOut()
      .then(() => {
        navigation.navigate("Login")
      })
      .catch(error => alert(error.message))
  }
  
  return (
    <View style={styles.container}>
      <View style={styles.topOfSscreen}>
        <Text>Email: {auth.currentUser?.email}</Text>
        <Button onPress={signOut} title="Sign Out" />
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
  topOfSscreen: {
    alignItems: 'center',
  },
});
