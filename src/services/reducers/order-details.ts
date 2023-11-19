import { TOrder } from "../../types/types";
import { TOrderDetailsActions } from "../actions/order-details";
import {
  SEND_ORDER_REQUEST,
  SEND_ORDER_SUCCESS,
  SEND_ORDER_FAILED,
  CLOSE_MODAL,
  GET_CURRENT_ORDER_FAILED,
  GET_CURRENT_ORDER_REQUEST,
  GET_CURRENT_ORDER_SUCCESS,
} from "../constants/constants";

type TOrderDetailsInitialState = {
  currentOrder: TOrder;
  currentOrderRequest: boolean,
  currentOrderFailed: boolean,
  orderNumber: number,
  orderRequest: boolean,
  orderFailed: boolean,
  isOpen: boolean,
};

export const initialState: TOrderDetailsInitialState = {
  currentOrder: {} as TOrder,
  currentOrderRequest: false,
  currentOrderFailed: false,
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
    case GET_CURRENT_ORDER_REQUEST: {
      return {
        ...state,
        currentOrderRequest: true,
        currentOrderFailed: false,
      };
    }
    case GET_CURRENT_ORDER_SUCCESS: {
      return {
        ...state,
        currentOrder: action.orders[0],
        currentOrderRequest: false,
        isOpen: true,
      };
    }
    case GET_CURRENT_ORDER_FAILED: {
      return {
        ...initialState,
        currentOrderFailed: true,
      };
    }
    default: {
      return state;
    }
  }
};
