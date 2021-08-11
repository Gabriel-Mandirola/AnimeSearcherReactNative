import 'react-native-gesture-handler';
import React from 'react';
import HomeScreen from './app/HomeScreen';
import AnimeCard from './app/AnimeCard';
import Favorites from './app/Favorites';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Busca tu anime" component={HomeScreen} />
        <Stack.Screen name="AnimeCard" component={AnimeCard} />
        <Stack.Screen name="Favorites" component={Favorites} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
