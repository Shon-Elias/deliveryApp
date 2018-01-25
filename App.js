import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  TextInput,
  Button
} from 'react-native';
import { DrawerNavigator } from 'react-navigation';
import Splash from './app/screens/Splash';
import Main from './app/screens/Main';
import SelectedDelivery from './app/screens/SelectedDelivery';



const Navigation = DrawerNavigator({
  Home: {
    screen: Splash,
  },
  Main: {
    screen: Main,
  },
  Delivery: {
    screen: SelectedDelivery,
  }
});

export default Navigation;
