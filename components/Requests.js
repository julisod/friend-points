import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, FlatList, Button } from 'react-native';
import { ListItem, Icon, Header } from 'react-native-elements';
import { useNavigation } from '@react-navigation/core'
import { ref, onValue } from 'firebase/database';

import { auth, database, addToFriends, removeRequest } from '../services/Firebase';

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
        let userUid = auth.currentUser.uid;
        let friendUidList = Object.keys(data[userUid]?.pending_requests);
        setRequestList(friendUidList.map(uid =>
          data[uid].personal_info
        ))
      } catch (e) {
        console.log("couldn't update requestlist");
        setRequestList([]);
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
        ListEmptyComponent={
          <View style={{justifyContent: 'center', alignItems: 'center', marginTop: "5%", width: "95%"}}>
            <Text style={{textAlign: 'center', fontSize: 16, fontStyle: 'italic'}}>
              The list is empty, ask someone to send you a friend request.
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
              <View style={{flexDirection: 'row'}}>
              <Icon
                type="material-community"
                name="cancel"
                color="black"
                onPress={() => {removeRequest(item.uid)}}
              />
              <View style={{width: 25}}></View>
              <Icon
                type="feather"
                name="check"
                color="black"
                onPress={() => {addToFriends(item.uid)}}
              />
              </View>
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
