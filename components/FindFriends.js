import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, FlatList, Button } from 'react-native';
import { ListItem, Icon, Header } from 'react-native-elements';
import { useNavigation } from '@react-navigation/core'
import { ref, onValue } from 'firebase/database';

import { auth, database, sendFriendRequest } from '../services/Firebase';

export default function FindFriends() {
  
  const navigation = useNavigation()

  const [userList, setUserList] = useState([]);
  const [user, setUser] = useState([]);

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
    let userUid = auth.currentUser.uid
    onValue(usersRef, (snapshot) => {
      try {
        const data = snapshot.val();
        /* console.log(snapshot.child("QryBKJuwAUdD8mJgb70Vv1DDv1/personal_info").exists()) */
        setUserList(Object?.values(data)); //kysymysmerkki ei auttanut erroriin
        setUser(data[userUid]);
      } catch (e) {
        console.log(e);
      }
    })}, []);

    const getIcon = (friendUid) => {
      //get the right icon based on if the user has already sent a friend request
      try {
        if (Object.keys(user.sent_requests).indexOf(friendUid) > -1) {
          return(
            <Icon
              type="material-community"
              name="account-clock"
              color="black"
            />
          )
        }
      } catch (e) {
        console.log("no requests")
      }
      try {
        if (Object.keys(user.friends).indexOf(friendUid) > -1) {
          return(
            <Icon
              type="material-community"
              name="account-check"
              color="black"
            />
          )
        }
      } catch (e) {
        console.log("no friends")
      }

      return(
        <Icon
          type="material-community"
          name="account-plus" //account-clock, TODO
          color="black"
          onPress={() => sendFriendRequest(friendUid)}
          />
      )
    }

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
        ListEmptyComponent={
          <View style={{justifyContent: 'center', alignItems: 'center', marginTop: "5%", width: "95%"}}>
            <Text style={{textAlign: 'center', fontSize: 16, fontStyle: 'italic'}}>
              The list is empty.
            </Text>
          </View>
        }
        keyExtractor={(item,index) => index.toString()}
        renderItem={({ item }) => (
          <ListItem bottomDivider>
            <ListItem.Content>
              {/* we're using the Object.values to access the value, because we don't know the key */}
              <ListItem.Title>{item.personal_info.name}</ListItem.Title> 
              <ListItem.Subtitle>{item.personal_info.username}</ListItem.Subtitle>
            </ListItem.Content>
            <ListItem.Content right>
              {getIcon(item.personal_info.uid)}
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
