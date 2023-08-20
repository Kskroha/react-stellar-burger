import {
  SEND_ORDER_REQUEST,
  SEND_ORDER_SUCCESS,
  SEND_ORDER_FAILED,
  CLOSE_MODAL
} from '../actions/order-details';

const initialState = {
  orderNumber: 0,
  orderRequest: false,
  orderFailed: false,
  isOpen: false
};

export const orderDetailsReducer = (state = initialState, action) => {
  switch (action.type) {
    case SEND_ORDER_REQUEST: {
      return {
        ...state,
        orderRequest: true,
        orderFailed: false,
      };
    }
    case SEND_ORDER_SUCCESS: {
      return {
        ...state,
        orderNumber: action.order.number,
        orderRequest: false,
        isOpen: true
      };
    }
    case SEND_ORDER_FAILED: {
      return {
        ...initialState,
        orderFailed: true
      };
    }
    case CLOSE_MODAL: {
      return {
        ...state,
        isOpen: false,
        orderNumber: 0,
        orderRequest: false,
        orderFailed: false
      };
    }
    default: {
      return state;
    }
  }
};
