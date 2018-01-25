import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  Image,
  View,
  Dimensions,
  TouchableOpacity,
  TouchableHighlight,
  AlertIOS
} from 'react-native';
import { Grid, Col, Row } from 'react-native-easy-grid';
import MapView from 'react-native-maps';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import MapViewDirections from 'react-native-maps-directions';
import { phonecall } from 'react-native-communications';
import Time  from 'time-calculate';
import { deleteDelivery } from '../actions/deliveries';

import  styles  from '../style/style';
import style from '../style/style';



class SelectedDelivery extends Component {
  constructor(props){
    super(props);

    this.state={
      currentLocation: {
        longitude: '',
        latitude: '',
      },
      stepsRoute: {},
      duration: '',
      distance: ''
    };
    this.getDirection = this.getDirection.bind(this);
  }

  componentWillMount(){
    navigator.geolocation.getCurrentPosition(
      (location)=>{

        this.setState({currentLocation: {latitude: location.coords.latitude, longitude: location.coords.longitude}});
        this.getDirection(location);
      });
  }

  getDirection(location){
    fetch(
      'https://maps.googleapis.com/maps/api/directions/json?origin=32.054089202753005,34.767694473266594&destination='+ location.coords.latitude +','+ location.coords.longitude +'&mode=walking&alternatives=true&sensor=true&key=AIzaSyDb1iCuFIUuT-gi7Q501vySAfMBnG-B-z8',
      {mode: 'no-cors'}
    )
    .then(
        (responseText) => {

          const routes = JSON.parse(responseText['_bodyInit'])["routes"];

          //get total time
          var minutes = Number(routes[0].legs[0].duration.text.split(" ")[0]);

          const duration = Time.add(new Date(), { m: minutes}).getHours().toString() +':'+ Time.add(new Date(), { m: minutes}).getMinutes().toString();

          const distance = routes[0].legs[0].distance.text + ' away';

          this.setState({
            duration,
            distance,
            stepsRoute: routes[0].legs[0].steps
          });

        }
    )
    .catch(err=> console.warn("Direction Error", err));
  }

  render() {

    const routes = this.state.stepsRoute ? this.state.stepsRoute : null;
    const duration = this.state.duration ? this.state.duration : null;
    const distance = this.state.distance ? this.state.distance : null;
    const deleteDelivery = this.props.deleteDelivery;
    const deliveries = this.props.navigation.state.params.deliveries;
    const navigation = this.props.navigation;
    const { delivery } = this.props.navigation.state.params;
    const cords = delivery.address.geometry.coordinates;
    const cordi = this.state.currentLocation ? this.state.currentLocation : null;

    // console.warn("CORD", cordi);

    return (
      <View style={styles.topView}>
      <View style={styles.secView}>
        <MapView
          style={styles.mapView}
          region={{
            latitude: cords[1],
            longitude: cords[0],
            latitudeDelta: 0.01222,
            longitudeDelta: 0.0091}}

          showsUserLocation={true}
          followsUserLocation={true}
          showsMyLocationButton={true}
        >



     <MapViewDirections
        origin={{latitude: cords[1],
        longitude: cords[0]}}
        destination={{latitude: cordi.latitude, longitude: cordi.longitude}}
        apikey={'AIzaSyDAdxCa1UiJvyXO31fWyv2oEf_Gip6PumM'}
        strokeWidth={3}
        strokeColor="#39e5c8"
        mode="walking"
          />



     <MapView.Marker
            coordinate={{latitude: cords[1], longitude: cords[0]}}
            image={source=require('../assets/deliveredPerson.png')}
            style={styles.marker}
         />


     </MapView>
      </View>
      <TouchableHighlight style={styles.touchable} onPress={() => {
                        deleteDelivery(delivery.id);
                        navigation.navigate('Main');
        }}>
      <Image style={styles.delivered} source={require('../assets/delivered.png')}/>
        </TouchableHighlight>
      <Grid>
      <Row style= {{height: 150}}>
      <Col style={{ backgroundColor: 'white', width: 280}}>
        <Text style={styles.deliveryHumanId}>
        {"ID "  + delivery.humanId}
        </Text>
              <Text style={styles.deliveryClient}>
                {delivery.client.name}
              </Text>
              <Text style={styles.deliveryAdd}>
                  {delivery.address.street+" "+delivery.address.number+", "+delivery.address.city}
              </Text>
              <Text style={styles.distance}>
                {distance}
              </Text>

      </Col>

      <Col style={style.callClient}>
        <TouchableOpacity onPress={()=>{
          AlertIOS.alert(
            'Call '+delivery.client.name,
            delivery.client.phone,
            [
              {
                text: 'Cancel',
                onPress: () => console.log('Cancel Pressed'),
                style: 'cancel',
              },
              {
                text: 'OK',
                onPress: ()=>phonecall(delivery.client.phone,true)
              },
            ]

          );
      }}
      >
        <Image style={styles.imagePhone} source={require('../assets/callClient.png')}/>
        </TouchableOpacity>
      </Col>
      </Row>
      <Row style={{height: 10}}>
        <View style={{ margin: 5, height: 2, width: 365,  backgroundColor: '#dee0dc'}} />
      </Row>
      <Row>
      <Col style={{ width: 210}}>
      <Text style={styles.etaDay}>{delivery.eta.day}</Text>
        <Text style={styles.etaDate}>{delivery.eta.date}</Text>
        <Text style={styles.etaDuration}>
          {'Estimated arrival: ' + duration}
        </Text>
      </Col>

      <Col>
          <View style={{marginLeft: 15, marginTop: 10, backgroundColor: '#f4788b', height: 35, width: 140, shadowColor: 'gray', shadowOffset: {width: -0.5, height: 2},shadowOpacity: 1, shadowRadius: 2


        }}>
            <Text style={styles.hours}>
               {delivery.eta.from + " - "+delivery.eta.to}
            </Text>
          </View>
      </Col>
      </Row>

      <Row style={{flex: 1,
        justifyContent: 'center'}}>
          <TouchableOpacity
            style={styles.googleBTN}
            onPress={this.onPress}
          >
            <Text style={styles.googleText}> Open in Google maps </Text>
          </TouchableOpacity>

      </Row>
      </Grid>

      </View>
    )
  }

}

const mapStateToProps = state => ({
  deliveries: state.deliveries
});

const mapDispatchToProps = dispatch => ({
  deleteDelivery: bindActionCreators(deleteDelivery, dispatch)
});


export default connect(mapStateToProps, mapDispatchToProps)(SelectedDelivery);


// { !routes ? routes.map((route, index) => {

//   <MapViewDirections
//    origin={{latitude: cords[1],
//    longitude: cords[0]}}
//    destination={{latitude: route.end_location.lat, longitude: route.end_location.lat}}
//    apikey={'AIzaSyDAdxCa1UiJvyXO31fWyv2oEf_Gip6PumM'}
//    strokeWidth={3}
//    strokeColor="#39e5c8"
//    mode="walking"
//      />
// }) :
