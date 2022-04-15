/* eslint-disable no-unused-vars */
import React, {Component} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {SafeAreaProvider, SafeAreaView} from 'react-native-safe-area-context';
import 'react-native-gesture-handler';
const RootStack = createNativeStackNavigator();
// Navigator Screens
import Navigation from './src/Screens/Navigations/StackNavigation';
import Splash from './src/Screens/Splash/Splash';

function App() {
  return (
    <>
      <SafeAreaProvider>
        <NavigationContainer options>
          <RootStack.Navigator
            screenOptions={{
              headerShown: false,
            }}>
            <RootStack.Screen name="Navigation" component={Navigation} />
          </RootStack.Navigator>
        </NavigationContainer>
      </SafeAreaProvider>
    </>
  );
}

export default App;
