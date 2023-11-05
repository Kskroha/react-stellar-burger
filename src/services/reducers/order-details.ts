import { TOrderDetailsActions } from "../actions/order-details";
import {
  SEND_ORDER_REQUEST,
  SEND_ORDER_SUCCESS,
  SEND_ORDER_FAILED,
  CLOSE_MODAL,
} from "../constants";

type TOrderDetailsInitialState = {
  orderNumber: number,
  orderRequest: boolean,
  orderFailed: boolean,
  isOpen: boolean,
};

const initialState: TOrderDetailsInitialState = {
  orderNumber: 0,
  orderRequest: false,
  orderFailed: false,
  isOpen: false,
};

export const orderDetailsReducer = (state = initialState, action: TOrderDetailsActions) => {
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
        isOpen: true,
      };
    }
    case SEND_ORDER_FAILED: {
      return {
        ...initialState,
        orderFailed: true,
      };
    }
    case CLOSE_MODAL: {
      return {
        ...state,
        isOpen: false,
        orderNumber: 0,
        orderRequest: false,
        orderFailed: false,
      };
    }
    default: {
      return state;
    }
  }
};
