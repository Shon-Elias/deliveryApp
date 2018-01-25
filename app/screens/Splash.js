import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  Button
} from 'react-native';
import { StackNavigator } from 'react-navigation';
import { asyncLoadDeliverie } from '../actions/deliveries';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import  styles  from '../style/style';


class Splash extends Component {
  static navigationOptions = {
    header: null
  }

  constructor(){
    super()
  }

  componentWillMount() {
    const { loadDeliveries, navigation } = this.props;
    loadDeliveries();
    setTimeout(()=>{
      navigation.navigate('Main');
    }, 3000)
  }


  render() {
    return (

      <View style={styles.container}>
          <Image style={styles.image}source={require('../assets/Logo.png')}/>
          <Text style ={styles.appName}>SUPPLIER DELIVERY</Text>
        </View>

    );
  }
}


const mapDispatchToProps = dispatch => ({
  loadDeliveries: bindActionCreators(asyncLoadDeliverie, dispatch)
});

export default connect(null, mapDispatchToProps)(Splash);



// const styles = StyleSheet.create({
//   container: {
//     alignItems: 'center',
//     backgroundColor: '#426190',
//     flex: 1,
//     justifyContent: 'center'
//   },
//   text: {
//     color: 'white',
//     fontWeight: 'bold',
//     fontSize: 30
//   }
// })
