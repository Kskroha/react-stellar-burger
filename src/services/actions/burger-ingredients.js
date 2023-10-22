import { getIngredientsRequest } from "../api";

export const GET_INGREDIENTS_REQUEST = "GET_INGREDIENTS";
export const GET_INGREDIENTS_FAILED = "GET_INGREDIENTS_FAILED";
export const GET_INGREDIENTS_SUCCESS = "GET_INGREDIENTS_SUCCESS";

export const getIngredients = () => (dispatch) => {
  dispatch({
    type: GET_INGREDIENTS_REQUEST,
  });
  getIngredientsRequest()
    .then((res) =>
      dispatch({
        type: GET_INGREDIENTS_SUCCESS,
        items: res.data,
      })
    )
    .catch((err) =>
      dispatch({
        type: GET_INGREDIENTS_FAILED,
      })
    );
};
