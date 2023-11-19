import { burgerIngredientsReducer } from "./burger-ingredients";
import { initialState } from "./burger-ingredients";
import {
  GET_INGREDIENTS_REQUEST,
  GET_INGREDIENTS_SUCCESS,
  GET_INGREDIENTS_FAILED,
} from "../constants/constants";
import { BUN_CRATER, INGREDIENT_MAIN } from "../constants/tests";

describe("burgerIngredientsReducer", () => {
  it("should return the initial state", () => {
    expect(burgerIngredientsReducer(undefined, {})).toEqual(initialState);
  });

  it("should handle GET_INGREDIENTS_REQUEST", () => {
    expect(
      burgerIngredientsReducer(initialState, {
        type: GET_INGREDIENTS_REQUEST,
      })
    ).toEqual({
      ingredients: [],
      ingredientsRequest: true,
      ingredientsFailed: false,
    });
  });

  it("should handle GET_INGREDIENTS_SUCCESS", () => {
    expect(
      burgerIngredientsReducer(initialState, {
        type: GET_INGREDIENTS_SUCCESS,
        items: [INGREDIENT_MAIN, BUN_CRATER],
      })
    ).toEqual({
      ingredients: [INGREDIENT_MAIN, BUN_CRATER],
      ingredientsRequest: false,
      ingredientsFailed: false,
    });
  });

  it("should handle GET_INGREDIENTS_FAILED", () => {
    expect(
      burgerIngredientsReducer(initialState, {
        type: GET_INGREDIENTS_FAILED,
      })
    ).toEqual({
      ingredients: [],
      ingredientsRequest: false,
      ingredientsFailed: true,
    });
  });
});
