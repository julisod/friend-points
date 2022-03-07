import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native'; //npm install @react-navigation/native
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'; //npm install @react-navigation/bottom-tabs
import { Feather, FontAwesome5, AntDesign } from '@expo/vector-icons';
//expo install react-native-screens react-native-safe-area-context

import Friends from './Friends';
import YourMom from './YourMom';

const screenOptions = ({ route }) => ({
    tabBarIcon: () => {
      if (route.name === 'Friends') {
        return <Feather name="users" size={24} color="black" />;
        /* return <FontAwesome5 name="user-friends" size={24} color="black" />; */
      } else if (route.name === 'YourMom') {
        return <Feather name="user-plus" size={24} color="black" />
        /* return <FontAwesome5 name="user-plus" size={24} color="black" /> */
      }
    }
  });
  
  const Tab = createBottomTabNavigator();
  
  export default function App() {
    return (
        <Tab.Navigator screenOptions={screenOptions}>
          <Tab.Screen name="Friends" component={Friends} />
          <Tab.Screen name="YourMom" component={YourMom} />
        </Tab.Navigator>
    );
  }