import { orderDetailsReducer } from "./order-details";
import {
  SEND_ORDER_REQUEST,
  SEND_ORDER_SUCCESS,
  SEND_ORDER_FAILED,
  CLOSE_MODAL,
  GET_CURRENT_ORDER_FAILED,
  GET_CURRENT_ORDER_REQUEST,
  GET_CURRENT_ORDER_SUCCESS,
} from "../constants";

const state = {
  currentOrder: {},
  currentOrderRequest: false,
  currentOrderFailed: false,
  orderNumber: 0,
  orderRequest: false,
  orderFailed: false,
  isOpen: false,
};

describe("orderDetailsReducer", () => {
  it("should return the initial state", () => {
    expect(orderDetailsReducer(undefined, {})).toEqual(state);
  });

  it("should handle SEND_ORDER_REQUEST", () => {
    expect(
      orderDetailsReducer(state, {
        type: SEND_ORDER_REQUEST,
      })
    ).toEqual({
      ...state,
      orderRequest: true,
      orderFailed: false,
    });
  });

  it("should handle SEND_ORDER_SUCCESS", () => {
    expect(
      orderDetailsReducer(state, {
        type: SEND_ORDER_SUCCESS,
        order: { number: 2754 },
      })
    ).toEqual({
      ...state,
      orderNumber: 2754,
      orderRequest: false,
      isOpen: true,
    });
  });

  it("should handle SEND_ORDER_FAILED", () => {
    expect(
      orderDetailsReducer(state, {
        type: SEND_ORDER_FAILED,
      })
    ).toEqual({
      ...state,
      orderFailed: true,
    });
  });

  it("should handle CLOSE_MODAL", () => {
    expect(
      orderDetailsReducer(state, {
        type: CLOSE_MODAL,
      })
    ).toEqual({
      ...state,
      isOpen: false,
      orderNumber: 0,
      orderRequest: false,
      orderFailed: false,
    });
  });

  it("should handle GET_CURRENT_ORDER_REQUEST", () => {
    expect(
      orderDetailsReducer(state, {
        type: GET_CURRENT_ORDER_REQUEST,
      })
    ).toEqual({
      ...state,
      currentOrderRequest: true,
      currentOrderFailed: false,
    });
  });

  it("should handle GET_CURRENT_ORDER_SUCCESS", () => {
    expect(
      orderDetailsReducer(state, {
        type: GET_CURRENT_ORDER_SUCCESS,
        orders: [{ id: 1 }],
      })
    ).toEqual({
      ...state,
      currentOrder: { id: 1 },
      currentOrderRequest: false,
      isOpen: true,
    });
  });

  it("should handle GET_CURRENT_ORDER_FAILED", () => {
    expect(
      orderDetailsReducer(state, {
        type: GET_CURRENT_ORDER_FAILED,
      })
    ).toEqual({
      ...state,
      currentOrderFailed: true,
    });
  });
});
