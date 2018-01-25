import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  TouchableHighlight,
  Text,
  View,
  Image,
  TextInput,
  ScrollView,
  Dimensions
} from 'react-native';
// import { StackNavigator } from 'react-navigation';
import { Button, Container, Header, Content, Card, CardItem, Body } from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';
import { deleteDelivery } from '../actions/deliveries';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import  styles  from '../style/style';

  class Main extends Component {
    constructor(props){
      super(props);
    }


    render() {

      const { deliveries, deleteDelivery, navigation } = this.props;

      return (

        <ScrollView>
          <Container style={{marginTop: 20}}>

          <View style={styles.navBar}>
            <View style={styles.leftContainer}>
              <Image source={require('../assets/Logo.png')} style={ styles.logo}/>

            </View>
            <Text style={styles.text}>
              Future Orders
            </Text>
            <View style={styles.rightContainer}>
            <Image style={styles.drawer} source={require('../assets/drawerRight.png')} />
            </View>
          </View>
            <Content>
              {
                deliveries.map( delivery => { return (
                  <TouchableHighlight key={delivery.id} onPress={() => { navigation.navigate('Delivery', {delivery, deleteDelivery, deliveries})}}>
                  <Card  style={styles.cardFrame}>
                <CardItem header style={styles.headerCard}>
                  <Grid>
                    <Col>
                      <Row><Text style={styles.textCard}>{delivery.eta.day}</Text></Row>
                      <Row><Text style={styles.textCard}>{delivery.eta.date}</Text></Row>
                    </Col>
                    <Col>
                      <Row ><Text style={styles.arrival}>Arrive between</Text></Row>
                      <Row><Text style={styles.fromTo}>{delivery.eta.from+ " - "+delivery.eta.to}</Text></Row>
                    </Col>
                  </Grid>
                </CardItem>
                  <CardItem style={styles.bodyCard}>
                    <Grid>
                    <Col style={{width: 250 }}>
                    <Body style={styles.body}>
                      <Text style={styles.humanId}>
                        {"ID " + delivery.humanId}
                      </Text>

                      <Text style={styles.clientName}>
                        {delivery.client.name}
                      </Text>
                      <Text style={styles.address}>
                        {delivery.address.street+" "+delivery.address.number+", "+delivery.address.city}
                      </Text>
                      </Body>
                      </Col>
                      <Col >
                        <Image style={styles.locationIcon} source={require('../assets/roundLogo.png')}/>
                      </Col>

                    </Grid>
                  </CardItem>

                  </Card>
                  </TouchableHighlight>

                )  })
                            }
                  </Content>

          </Container>
        </ScrollView>
      );
    }

}


const mapStateToProps = state => ({
  deliveries: state.deliveries
});

const mapDispatchToProps = dispatch => ({
  deleteDelivery: bindActionCreators(deleteDelivery, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(Main);

