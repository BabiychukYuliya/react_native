import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import LoginScreen from './Screens/LoginScreen';
import RegistrationScreen from './Screens/RegistrationScreen';
import { useState, useCallback } from "react";
import { useFonts } from "expo-font";
import * as SplashScreen from 'expo-splash-screen';




export default function App() {
  const [statusLog, setStatusLog] = useState(false);
  const [fontsLoaded] = useFonts({
    'Roboto-Regular': require('../myNewProject/assets/font/Roboto-Regular.ttf'),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);


  if (!fontsLoaded) {
    return null;
  }

  return (
    // <RegistrationScreen></RegistrationScreen>
    <LoginScreen></LoginScreen>
  )
}


