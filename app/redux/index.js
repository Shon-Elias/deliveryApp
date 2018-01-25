import { AsyncStorage } from 'react-native';




/* --------------------------- ACTION-CREATORS --------------------------- */
const setDeliveries = (deliveries) => ({ type: SET_DELIVERIES, deliveries });
const setCurrentDelivery = (delivery, deliveryIndex) => ({ type: SET_CURRENT_DELIVERY, delivery, deliveryIndex });
const unsetCurrentDelivery = () => ({ type: UNSET_CURRENT_DELIVERY });

/* ------------------------------- REDUCERS ------------------------------- */
const dummyDeliveryObj = {
	index: null,
	deliveryInfo: {}
}

const dummyDeliveryObjCreator = () => Object.assign({}, dummyDeliveryObj);

const initialState = {
	name: '',
	deliveries: [],
	locations: [],
  currentDelivery: dummyDeliveryObjCreator()
}

export default (state = initialState, action) => {
	let newState = Object.assign({}, state);
	newState.currentDelivery = Object.assign({}, newState.currentDelivery);
	switch (action.type) {
		case SET_DELIVERIES:
			newState.deliveries = action.deliveries;
			break;
		case SET_CURRENT_DELIVERY:
			newState.currentDelivery.deliveryInfo = action.delivery;
			newState.currentDelivery.index = action.deliveryIndex;
			break;
		case UNSET_CURRENT_DELIVERY:
			newState.currentDelivery = dummyDeliveryObjCreator();
			break;

		default:
			break;
	}
	return newState;
}

/* ------------------------------ DISPATCHERS ------------------------------ */
export const getdeliveriesFromAsyncStorage = () => {
	return dispatch => {
		AsyncStorage.getItem('deliveries')
		.then((deliveries) => {
			deliveries = deliveries || '[]';
        	dispatch(setDeliveries(JSON.parse(deliveries)));
    	})
    	.catch(console.error.bind(console));
	}
}

export const saveNewDelivery = (currentDeliveries, newDelivery) => {
	currentDeliveries.push(newDelivery);
	return !currentDeliveries.length ?
		createDeliveriesInAsyncStorage(currentDeliveries) : updateDeliveriesInAsyncStorage(currentDeliveries);
}

export const updateDelivery = (currentDeliveries, updatedDelivery, deliveryIndex) => {
	currentDeliveries[deliveryIndex] = updatedDelivery;
	return updateDeliveriesInAsyncStorage(currentDeliveries);
}

export const selectDelivery = (delivery, deliveryIndex) => {
	return setCurrentDelivery(delivery, deliveryIndex);
}

export const unselectDelivery = () => {
	return unsetCurrentDelivery();
}

export const deleteSelectedDelivery = (currentDeliveries, deliveryIndex) => {
	const updatedDeliveries = currentDeliveries.filter((delivery, index) => index !== deliveryIndex);
	return updateDeliveriesInAsyncStorage(updatedDeliveries);
}

export const createDeliveriesInAsyncStorage = (deliveries) => {
	return dispatch => {
		return AsyncStorage.setItem('deliveries', JSON.stringify(deliveries), (err) => {
	      if (err){
	        console.error(err);
	      }
	      dispatch(setDeliveries(deliveries));
	    })
	}
}

const updateDeliveriesInAsyncStorage = (deliveries) => {
	return dispatch => {
		return AsyncStorage.setItem('deliveries', JSON.stringify(deliveries), (err) => {
      if (err){
        console.error(err);
      }
      dispatch(setDeliveries(deliveries));
	  });
	}
}
