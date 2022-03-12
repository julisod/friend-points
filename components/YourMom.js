import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, FlatList, Button } from 'react-native';
import { Input, ListItem, Icon, Header } from 'react-native-elements';
import { useNavigation } from '@react-navigation/core'
import { ref, onValue } from 'firebase/database';

import { auth, database, sendFriendRequest } from '../services/Firebase';

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
    const usersRef = ref(database, 'users/');
    onValue(usersRef, (snapshot) => {
      try {
        const data = snapshot.val();
        /* console.log(snapshot.child("QryBKJuwAUdD8mJgb70Vv1DDv1/personal_info").exists()) */
        setUserList(Object?.values(data)); //kysymysmerkki ei auttanut erroriin
      } catch (e) {
        console.error(e);
      }
    })}, []);

  return (
    <View style={styles.container}>
      <Header
        backgroundColor='#83677B'
        /* leftComponent={} */
        centerComponent={{ text: 'FIND FRIENDS', style:{color: '#fff'} }}
        rightComponent={<Icon type="feather" name="log-out" onPress={signOut} color='#fff' />}
      />
      <FlatList
        data={userList}
        //contentContainerStyle={{  }}
        ListEmptyComponent={<Text>The list is empty</Text>}
        keyExtractor={(item,index) => index.toString()}
        renderItem={({ item }) => (
          <ListItem bottomDivider>
            <ListItem.Content>
              {/* we're using the Object.values to access the value, because we don't know the key */}
              <ListItem.Title>{item.personal_info.name}</ListItem.Title> 
              <ListItem.Subtitle>{item.personal_info.email}</ListItem.Subtitle>
            </ListItem.Content>
            <ListItem.Content right>
              <Icon
                type="material-community"
                name="account-plus" //account-clock
                color="black"
                onPress={() => sendFriendRequest(item.personal_info.uid)}
              />
            </ListItem.Content>
          </ListItem>)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    /* alignItems: 'center', */
    justifyContent: 'center',
    width: "100%"
  },
  topOfSscreen: {
    alignItems: 'center',
  }
});
