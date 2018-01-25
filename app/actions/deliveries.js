import { LOAD_DELIVERIES, DELETE_DELIVERY, weekdays } from '../const/actions';

const loadDeliveries = deliveries => ({ type:  LOAD_DELIVERIES, deliveries});

export const asyncLoadDeliverie = () => (dispatch, getState) => {
  //load all deliveries from server (in this case its a local file)
  const deliveries = require('../../deliveryMock.json');
  // Setting the following data inside eta obj
  //day name,
  //date format dd/mm/yyyy,
  //time from & to as hh:mm
  deliveries.map(delivery =>{


    var day = new Date(delivery.to).getDay();

    // if(!day){
    //   var day = new Date(delivery.to).getDay();
    // }
    // for each delivery set another obj eta
    delivery.eta = {};
    // set the day name
    delivery.eta.day = weekdays[day];
    const dateFormate = delivery.from.split('-');

    delivery.eta.date = dateFormate[2].slice(0,2)+ '.' + dateFormate[1] + '.' + dateFormate[0];

    delivery.eta.from = dateFormate[2].slice(3,8);

    delivery.eta.to = delivery.to.split('T')[1].slice(0,5);

  });
  // console.warn(deliveries);
  dispatch(loadDeliveries(deliveries));
}

export const deleteDelivery = deliveryId => ({type: DELETE_DELIVERY, deliveryId});


