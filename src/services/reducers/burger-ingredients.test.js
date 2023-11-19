import { burgerIngredientsReducer } from "./burger-ingredients";
import {
  GET_INGREDIENTS_REQUEST,
  GET_INGREDIENTS_SUCCESS,
  GET_INGREDIENTS_FAILED,
} from "../constants";

const state = {
  ingredients: [],
  ingredientsRequest: false,
  ingredientsFailed: false,
};

describe("burgerIngredientsReducer", () => {
  it("should return the initial state", () => {
    expect(burgerIngredientsReducer(undefined, {})).toEqual(state);
  });

  it("should handle GET_INGREDIENTS_REQUEST", () => {
    expect(
      burgerIngredientsReducer(
        state,
        {
          type: GET_INGREDIENTS_REQUEST,
        }
      )
    ).toEqual({
      ingredients: [],
      ingredientsRequest: true,
      ingredientsFailed: false,
    });
  });

  it("should handle GET_INGREDIENTS_SUCCESS", () => {
    expect(
      burgerIngredientsReducer(
        state,
        {
          type: GET_INGREDIENTS_SUCCESS,
          items: [
            {
              _id: "643d69a5c3f7b9001cfa0941",
              name: "Биокотлета из марсианской Магнолии",
              type: "main",
              proteins: 420,
              fat: 142,
              carbohydrates: 242,
              calories: 4242,
              price: 424,
              image: "https://code.s3.yandex.net/react/code/meat-01.png",
              image_mobile:
                "https://code.s3.yandex.net/react/code/meat-01-mobile.png",
              image_large:
                "https://code.s3.yandex.net/react/code/meat-01-large.png",
              __v: 0,
            },
            {
              _id: "643d69a5c3f7b9001cfa093c",
              name: "Краторная булка N-200i",
              type: "bun",
              proteins: 80,
              fat: 24,
              carbohydrates: 53,
              calories: 420,
              price: 1255,
              image: "https://code.s3.yandex.net/react/code/bun-02.png",
              image_mobile:
                "https://code.s3.yandex.net/react/code/bun-02-mobile.png",
              image_large:
                "https://code.s3.yandex.net/react/code/bun-02-large.png",
              __v: 0,
            },
          ],
        }
      )
    ).toEqual({
      ingredients: [
        {
          _id: "643d69a5c3f7b9001cfa0941",
          name: "Биокотлета из марсианской Магнолии",
          type: "main",
          proteins: 420,
          fat: 142,
          carbohydrates: 242,
          calories: 4242,
          price: 424,
          image: "https://code.s3.yandex.net/react/code/meat-01.png",
          image_mobile:
            "https://code.s3.yandex.net/react/code/meat-01-mobile.png",
          image_large:
            "https://code.s3.yandex.net/react/code/meat-01-large.png",
          __v: 0,
        },
        {
          _id: "643d69a5c3f7b9001cfa093c",
          name: "Краторная булка N-200i",
          type: "bun",
          proteins: 80,
          fat: 24,
          carbohydrates: 53,
          calories: 420,
          price: 1255,
          image: "https://code.s3.yandex.net/react/code/bun-02.png",
          image_mobile:
            "https://code.s3.yandex.net/react/code/bun-02-mobile.png",
          image_large: "https://code.s3.yandex.net/react/code/bun-02-large.png",
          __v: 0,
        },
      ],
      ingredientsRequest: false,
      ingredientsFailed: false,
    });
  });

  it("should handle GET_INGREDIENTS_FAILED", () => {
    expect(
      burgerIngredientsReducer(
        state,
        {
          type: GET_INGREDIENTS_FAILED,
        }
      )
    ).toEqual({
      ingredients: [],
      ingredientsRequest: false,
      ingredientsFailed: true,
    });
  });
});
