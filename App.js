import { NavigationContainer } from '@react-navigation/native'; //npm install @react-navigation/native
//expo install react-native-screens react-native-safe-area-context
import { createNativeStackNavigator } from '@react-navigation/native-stack'; //npm install @react-navigation/native-stack
import { LogBox } from 'react-native';

import TabNavigation from "./components/TabNavigation";
import LoginScreen from "./components/logged-out/LoginScreen";

const Stack = createNativeStackNavigator();

LogBox.ignoreLogs(['Setting a timer for a long period of time'])
LogBox.ignoreLogs(['AsyncStorage has been extracted from react-native core and will be removed in a future release.'])

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen options={{headerShown: false}} name="Login" component={LoginScreen} />
        <Stack.Screen options={{headerShown: false}} name="TabNavigation" component={TabNavigation} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
