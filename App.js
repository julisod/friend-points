import { NavigationContainer } from '@react-navigation/native'; //npm install @react-navigation/native
//expo install react-native-screens react-native-safe-area-context
import { createNativeStackNavigator } from '@react-navigation/native-stack'; //npm install @react-navigation/native-stack

import HomeScreen from "./components/HomeScreen";
import LoginScreen from "./components/LoginScreen";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen options={{headerShown: false}} name="Login" component={LoginScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
