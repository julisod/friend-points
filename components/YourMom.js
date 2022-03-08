import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, FlatList, Button } from 'react-native';
import { Input, ListItem, Icon } from 'react-native-elements';
import { useNavigation } from '@react-navigation/core'
import { ref, onValue } from 'firebase/database';

import { auth, database } from '../services/Firebase';

export default function YourMom() {
  
  const navigation = useNavigation()

  const [userList, setUserList] = useState([]);

  const signOut = () => {
    auth
      .signOut()
      .then(() => {
        navigation.navigate("Login")
      })
      .catch(error => alert(error.message))
  }

  useEffect(() => {
    const usersRef = ref(database, 'userlist/');
    onValue(usersRef, (snapshot) => {
      const data = snapshot.val();
      setUserList(Object.values(data));
    })}, []);

  return (
    <View style={styles.container}>
      <Text>Email: {auth.currentUser?.email}</Text>
      <Text>Joe Mama</Text>
      <Button onPress={signOut} title="Sign Out" />
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
