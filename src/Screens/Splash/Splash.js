/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, {useEffect, useState} from 'react';
import {View, Image, StyleSheet, Text} from 'react-native';
import styles from './Style';
import auth from '@react-native-firebase/auth';
const Splash = ({navigation}) => {
  const [userLoggedIn, setUserLoggedIn] = useState(null);
  const [userId, setUserId] = useState(null);
  useEffect(() => {
    setTimeout(() => {
      auth().onAuthStateChanged(user => {
        // console.warn(user);
        if (user) {
          setUserLoggedIn(true);
          console.log('user logged' + user.email);
          setUserId(user.uid);
          console.log('ids' + user.uid);
          navigation.replace('HomePage2');
        } else {
          setUserLoggedIn(false);
          navigation.replace('LoginScreen');
        }
      });
    }, 2000);
  }, []);

  return (
    <View style={styles.MainView}>
      <Image
        source={require('../../Assets/Logo.png')}
        style={styles.imgSplash}
      />
      <Text style={styles.txtScavenger}>Scavenger</Text>
    </View>
  );
};
export default Splash;
