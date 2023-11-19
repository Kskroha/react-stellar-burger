import { burgerConstructorReducer } from "./burger-constructor";
import {
  ADD_ITEM,
  REMOVE_ITEM,
  MOVE_ITEM,
  CLEAN_CONSTRUCTOR,
} from "../constants";

const state = {
  draggedItems: [],
  bun: {},
};

describe("burgerConstructorReducer", () => {
  it("should return the initial state", () => {
    expect(burgerConstructorReducer(undefined, {})).toEqual(state);
  });

  it("should handle ADD_ITEM", () => {
    expect(
      burgerConstructorReducer(
        state,
        {
          type: ADD_ITEM,
          payload: {item: {
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
        }}
      )
    ).toEqual({
      draggedItems: [
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
      ],
      bun: {},
    });
  });

  it("should add new bun when handling ADD_ITEM", () => {
    expect(
      burgerConstructorReducer(
        state,
        {
          type: ADD_ITEM,
          payload: {item: {
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
          }},
        }
      )
    ).toEqual({
      draggedItems: [],
      bun: {
        _id: "643d69a5c3f7b9001cfa093c",
        name: "Краторная булка N-200i",
        type: "bun",
        proteins: 80,
        fat: 24,
        carbohydrates: 53,
        calories: 420,
        price: 1255,
        image: "https://code.s3.yandex.net/react/code/bun-02.png",
        image_mobile: "https://code.s3.yandex.net/react/code/bun-02-mobile.png",
        image_large: "https://code.s3.yandex.net/react/code/bun-02-large.png",
        __v: 0,
      },
    });
  });

  it("should swap buns when handling ADD_ITEM", () => {
    expect(
      burgerConstructorReducer(
        {
          draggedItems: [],
          bun: {
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
        },
        {
          type: ADD_ITEM,
          payload: {item: {
            _id: "643d69a5c3f7b9001cfa093d",
            name: "Флюоресцентная булка R2-D3",
            type: "bun",
            proteins: 44,
            fat: 26,
            carbohydrates: 85,
            calories: 643,
            price: 988,
            image: "https://code.s3.yandex.net/react/code/bun-01.png",
            image_mobile:
              "https://code.s3.yandex.net/react/code/bun-01-mobile.png",
            image_large:
              "https://code.s3.yandex.net/react/code/bun-01-large.png",
            __v: 0,
          }},
        }
      )
    ).toEqual({
      draggedItems: [],
      bun: {
        _id: "643d69a5c3f7b9001cfa093d",
        name: "Флюоресцентная булка R2-D3",
        type: "bun",
        proteins: 44,
        fat: 26,
        carbohydrates: 85,
        calories: 643,
        price: 988,
        image: "https://code.s3.yandex.net/react/code/bun-01.png",
        image_mobile: "https://code.s3.yandex.net/react/code/bun-01-mobile.png",
        image_large: "https://code.s3.yandex.net/react/code/bun-01-large.png",
        __v: 0,
      },
    });
  });

  it("should handle MOVE_ITEM", () => {
    expect(
      burgerConstructorReducer(
        {
          draggedItems: [
            {
              _id: "643d69a5c3f7b9001cfa0944",
              name: "Соус традиционный галактический",
              type: "sauce",
              proteins: 42,
              fat: 24,
              carbohydrates: 42,
              calories: 99,
              price: 15,
              image: "https://code.s3.yandex.net/react/code/sauce-03.png",
              image_mobile:
                "https://code.s3.yandex.net/react/code/sauce-03-mobile.png",
              image_large:
                "https://code.s3.yandex.net/react/code/sauce-03-large.png",
              __v: 0,
            },
            {
              _id: "643d69a5c3f7b9001cfa0946",
              name: "Хрустящие минеральные кольца",
              type: "main",
              proteins: 808,
              fat: 689,
              carbohydrates: 609,
              calories: 986,
              price: 300,
              image: "https://code.s3.yandex.net/react/code/mineral_rings.png",
              image_mobile:
                "https://code.s3.yandex.net/react/code/mineral_rings-mobile.png",
              image_large:
                "https://code.s3.yandex.net/react/code/mineral_rings-large.png",
              __v: 0,
            },
          ],
          bun: {},
        },
        {
          type: MOVE_ITEM,
          dragIndex: 0,
          hoverIndex: 1,
        }
      )
    ).toEqual({
      draggedItems: [
        {
          _id: "643d69a5c3f7b9001cfa0946",
          name: "Хрустящие минеральные кольца",
          type: "main",
          proteins: 808,
          fat: 689,
          carbohydrates: 609,
          calories: 986,
          price: 300,
          image: "https://code.s3.yandex.net/react/code/mineral_rings.png",
          image_mobile:
            "https://code.s3.yandex.net/react/code/mineral_rings-mobile.png",
          image_large:
            "https://code.s3.yandex.net/react/code/mineral_rings-large.png",
          __v: 0,
        },
        {
          _id: "643d69a5c3f7b9001cfa0944",
          name: "Соус традиционный галактический",
          type: "sauce",
          proteins: 42,
          fat: 24,
          carbohydrates: 42,
          calories: 99,
          price: 15,
          image: "https://code.s3.yandex.net/react/code/sauce-03.png",
          image_mobile:
            "https://code.s3.yandex.net/react/code/sauce-03-mobile.png",
          image_large:
            "https://code.s3.yandex.net/react/code/sauce-03-large.png",
          __v: 0,
        },
      ],
      bun: {},
    });
  });

  it("should handle REMOVE_ITEM", () => {
    expect(
      burgerConstructorReducer(
        {
          draggedItems: [
            {
              _id: "643d69a5c3f7b9001cfa0944",
              name: "Соус традиционный галактический",
              type: "sauce",
              proteins: 42,
              fat: 24,
              carbohydrates: 42,
              calories: 99,
              price: 15,
              image: "https://code.s3.yandex.net/react/code/sauce-03.png",
              image_mobile:
                "https://code.s3.yandex.net/react/code/sauce-03-mobile.png",
              image_large:
                "https://code.s3.yandex.net/react/code/sauce-03-large.png",
              __v: 0,
            },
          ],
          bun: {},
        },
        {
          type: REMOVE_ITEM,
          item: {
            _id: "643d69a5c3f7b9001cfa0944",
            name: "Соус традиционный галактический",
            type: "sauce",
            proteins: 42,
            fat: 24,
            carbohydrates: 42,
            calories: 99,
            price: 15,
            image: "https://code.s3.yandex.net/react/code/sauce-03.png",
            image_mobile:
              "https://code.s3.yandex.net/react/code/sauce-03-mobile.png",
            image_large:
              "https://code.s3.yandex.net/react/code/sauce-03-large.png",
            __v: 0,
          },
        }
      )
    ).toEqual(state);
  });

  it("should handle CLEAN_CONSTRUCTOR", () => {
    expect(
      burgerConstructorReducer(
        {
          draggedItems: [
            {
              _id: "643d69a5c3f7b9001cfa0944",
              name: "Соус традиционный галактический",
              type: "sauce",
              proteins: 42,
              fat: 24,
              carbohydrates: 42,
              calories: 99,
              price: 15,
              image: "https://code.s3.yandex.net/react/code/sauce-03.png",
              image_mobile:
                "https://code.s3.yandex.net/react/code/sauce-03-mobile.png",
              image_large:
                "https://code.s3.yandex.net/react/code/sauce-03-large.png",
              __v: 0,
            },
            {
              _id: "643d69a5c3f7b9001cfa0946",
              name: "Хрустящие минеральные кольца",
              type: "main",
              proteins: 808,
              fat: 689,
              carbohydrates: 609,
              calories: 986,
              price: 300,
              image: "https://code.s3.yandex.net/react/code/mineral_rings.png",
              image_mobile:
                "https://code.s3.yandex.net/react/code/mineral_rings-mobile.png",
              image_large:
                "https://code.s3.yandex.net/react/code/mineral_rings-large.png",
              __v: 0,
            },
          ],
          bun: {
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
        },
        {
          type: CLEAN_CONSTRUCTOR,
        }
      )
    ).toEqual(state);
  });
});
