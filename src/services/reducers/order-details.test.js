import { orderDetailsReducer } from "./order-details";
import { initialState } from "./order-details";
import {
  SEND_ORDER_REQUEST,
  SEND_ORDER_SUCCESS,
  SEND_ORDER_FAILED,
  CLOSE_MODAL,
  GET_CURRENT_ORDER_FAILED,
  GET_CURRENT_ORDER_REQUEST,
  GET_CURRENT_ORDER_SUCCESS,
} from "../constants/constants";

describe("orderDetailsReducer", () => {
  it("should return the initial state", () => {
    expect(orderDetailsReducer(undefined, {})).toEqual(initialState);
  });

  it("should handle SEND_ORDER_REQUEST", () => {
    expect(
      orderDetailsReducer(initialState, {
        type: SEND_ORDER_REQUEST,
      })
    ).toEqual({
      ...initialState,
      orderRequest: true,
      orderFailed: false,
    });
  });

  it("should handle SEND_ORDER_SUCCESS", () => {
    expect(
      orderDetailsReducer(initialState, {
        type: SEND_ORDER_SUCCESS,
        order: { number: 2754 },
      })
    ).toEqual({
      ...initialState,
      orderNumber: 2754,
      orderRequest: false,
      isOpen: true,
    });
  });

  it("should handle SEND_ORDER_FAILED", () => {
    expect(
      orderDetailsReducer(initialState, {
        type: SEND_ORDER_FAILED,
      })
    ).toEqual({
      ...initialState,
      orderFailed: true,
    });
  });

  it("should handle CLOSE_MODAL", () => {
    expect(
      orderDetailsReducer(initialState, {
        type: CLOSE_MODAL,
      })
    ).toEqual({
      ...initialState,
      isOpen: false,
      orderNumber: 0,
      orderRequest: false,
      orderFailed: false,
    });
  });

  it("should handle GET_CURRENT_ORDER_REQUEST", () => {
    expect(
      orderDetailsReducer(initialState, {
        type: GET_CURRENT_ORDER_REQUEST,
      })
    ).toEqual({
      ...initialState,
      currentOrderRequest: true,
      currentOrderFailed: false,
    });
  });

  it("should handle GET_CURRENT_ORDER_SUCCESS", () => {
    expect(
      orderDetailsReducer(initialState, {
        type: GET_CURRENT_ORDER_SUCCESS,
        orders: [{ id: 1 }],
      })
    ).toEqual({
      ...initialState,
      currentOrder: { id: 1 },
      currentOrderRequest: false,
      isOpen: true,
    });
  });

  it("should handle GET_CURRENT_ORDER_FAILED", () => {
    expect(
      orderDetailsReducer(initialState, {
        type: GET_CURRENT_ORDER_FAILED,
      })
    ).toEqual({
      ...initialState,
      currentOrderFailed: true,
    });
  });
});
