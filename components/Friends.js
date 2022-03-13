import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, FlatList, Button } from 'react-native';
import { Input, ListItem, Icon, Header } from 'react-native-elements';
import { useNavigation } from '@react-navigation/core'
import { ref, onValue } from 'firebase/database';

import { auth, database } from '../services/Firebase';

export default function Friends() {
  
  const [friendList, setFriendList] = useState([]);
  
  const navigation = useNavigation()

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
        let userUid = auth.currentUser.uid;
        let friendUidList = Object.keys(data[userUid]?.friends)
        setFriendList(friendUidList.map(uid =>
          data[uid].personal_info
        ))
      } catch (e) {
        console.log("couldn't update list");
        setFriendList([]);
      }
    })}, []);
  
  return (
    <View style={styles.container}>
      <Header
        backgroundColor='#83677B'
        /* leftComponent={} */
        centerComponent={{ text: 'FRIENDS', style:{color: '#fff'} }}
        rightComponent={<Icon type="feather" name="log-out" onPress={signOut} color='#fff' />}
      />
      <FlatList
        data={friendList}
        //contentContainerStyle={{  }}
        ListEmptyComponent={
          <View style={{justifyContent: 'center', alignItems: 'center', marginTop: "5%", width: "95%"}}>
            <Text style={{textAlign: 'center', fontSize: 16, fontStyle: 'italic'}}>
              The list is empty, try adding some friends.
            </Text>
          </View>
        }
        keyExtractor={(item,index) => index.toString()}
        renderItem={({ item }) => (
          <ListItem bottomDivider>
            <ListItem.Content>
              {/* we're using the Object.values to access the value, because we don't know the key */}
              <ListItem.Title>{item.name}</ListItem.Title> 
              <ListItem.Subtitle>{item.username}</ListItem.Subtitle>
            </ListItem.Content>
            <ListItem.Content right>
              {/* <Icon
                type="material-community"
                name="account-plus" //account-clock
                color="black"
                onPress={() => sendFriendRequest(item.personal_info.uid)}
              /> */}
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
