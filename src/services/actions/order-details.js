import { sendOrderRequest } from "../api";

export const SEND_ORDER_REQUEST = "SEND_ORDER_REQUEST";
export const SEND_ORDER_FAILED = "SEND_ORDER_FAILED";
export const SEND_ORDER_SUCCESS = "SEND_ORDER_SUCCESS";
export const CLOSE_MODAL = "CLOSE_MODAL";

export const sendOrder = (items) => (dispatch) => {
  dispatch({
    type: SEND_ORDER_REQUEST,
  });
  sendOrderRequest(items)
    .then((res) =>
      dispatch({
        type: SEND_ORDER_SUCCESS,
        order: res.order,
      })
    )
    .catch((err) =>
      dispatch({
        type: SEND_ORDER_FAILED,
      })
    );
};
