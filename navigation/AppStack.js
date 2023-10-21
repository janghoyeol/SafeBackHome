import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { HomeScreen, GptScreen, PopupScreen } from '../screens';

const Stack = createStackNavigator();

export const AppStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="InitialScreen"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="GPT" component={GptScreen} />
      <Stack.Screen name="Popup" component={PopupScreen} />
    </Stack.Navigator>
  );
};
