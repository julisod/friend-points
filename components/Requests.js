import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, FlatList, Button } from 'react-native';
import { Input, ListItem, Icon, Header } from 'react-native-elements';
import { useNavigation } from '@react-navigation/core'
import { ref, onValue } from 'firebase/database';

import { auth, database } from '../services/Firebase';

export default function Requests() {
  
  const [requestList, setRequestList] = useState([]);
  
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
        let userUid = auth.currentUser.uid
        //let userList = Object?.values(data);
        let friendUidList = Object.keys(data[userUid]?.friends)
        console.log(friendUidList)
        setRequestList(friendUidList.map(uid =>
          data[uid].personal_info
        ))
      } catch (e) {
        console.error(e);
      }
    })}, []);
  
  return (
    <View style={styles.container}>
      <Header
        backgroundColor='#83677B'
        /* leftComponent={} */
        centerComponent={{ text: 'FRIEND REQUESTS', style:{color: '#fff'} }}
        rightComponent={<Icon type="feather" name="log-out" onPress={signOut} color='#fff' />}
      />
      <FlatList
        data={requestList}
        //contentContainerStyle={{  }}
        ListEmptyComponent={<Text>The list is empty, try adding some friends</Text>}
        keyExtractor={(item,index) => index.toString()}
        renderItem={({ item }) => (
          <ListItem bottomDivider>
            <ListItem.Content>
              {/* we're using the Object.values to access the value, because we don't know the key */}
              <ListItem.Title>{item.name}</ListItem.Title> 
              <ListItem.Subtitle>{item.email}</ListItem.Subtitle>
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
