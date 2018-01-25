import React, { Component } from 'react';
import { AppRegistry } from 'react-native';
import App from './App';
import { Provider } from 'react-redux';
import store from './app/store';

AppRegistry.registerComponent('deliveryApp', () => {
  return class extends Component {
    render(){
      return (
        <Provider store={store}>
          <App />
        </Provider>
      );
    }
  }
});
