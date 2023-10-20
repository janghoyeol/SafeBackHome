import * as React from 'react';
import { View, Button } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../../test/header/HomeScreen';
import GptPage from '../../test/header/gpt';
import PopupPage from '../../test/header/popup';

const Stack = createStackNavigator();

const InitialScreen = ({ navigation }) => (
  <View>
    <Button
      title="Go to HomeScreen"
      onPress={() => navigation.navigate('Home')}
    />
  </View>
);

export const AppStack = () => {
  return (
    <Stack.Navigator initialRouteName="InitialScreen">
      <Stack.Screen name="InitialScreen" component={InitialScreen} />
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="GPT" component={GptPage} />
      <Stack.Screen name="Popup" component={PopupPage} />
    </Stack.Navigator>
  );
};
