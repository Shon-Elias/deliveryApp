import { LOAD_DELIVERIES, DELETE_DELIVERY } from '../const/actions';


export default (state = null, action) => {
	switch (action.type) {
		case LOAD_DELIVERIES:
      return action.deliveries;
    case DELETE_DELIVERY:
      return state.filter(delivery => delivery.id !== action.deliveryId);
  }
  return state;
}
