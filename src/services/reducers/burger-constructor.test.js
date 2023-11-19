import { burgerConstructorReducer } from "./burger-constructor";
import { initialState } from "./burger-constructor";
import {
  ADD_ITEM,
  REMOVE_ITEM,
  MOVE_ITEM,
  CLEAN_CONSTRUCTOR,
} from "../constants/constants";
import { BUN_CRATER, BUN_FLUORESCENT, INGREDIENT_MAIN, INGREDIENT_SAUCE, TEST_BUN, TEST_INGREDIENT } from "../constants/tests";

describe("burgerConstructorReducer", () => {
  it("should return the initial state", () => {
    expect(burgerConstructorReducer(undefined, {})).toEqual(initialState);
  });

  it("should handle ADD_ITEM", () => {
    expect(
      burgerConstructorReducer(
        initialState,
        {
          type: ADD_ITEM,
          payload: {item: INGREDIENT_MAIN,
        }}
      )
    ).toEqual({
      draggedItems: [
        INGREDIENT_MAIN,
      ],
      bun: {},
    });
  });

  it("should add new bun when handling ADD_ITEM", () => {
    expect(
      burgerConstructorReducer(
        initialState,
        {
          type: ADD_ITEM,
          payload: {item: BUN_CRATER},
        }
      )
    ).toEqual({
      draggedItems: [],
      bun: BUN_CRATER,
    });
  });

  it("should swap buns when handling ADD_ITEM", () => {
    expect(
      burgerConstructorReducer(
        {
          draggedItems: [],
          bun: BUN_CRATER,
        },
        {
          type: ADD_ITEM,
          payload: {item: BUN_FLUORESCENT},
        }
      )
    ).toEqual({
      draggedItems: [],
      bun: BUN_FLUORESCENT,
    });
  });

  it("should handle MOVE_ITEM", () => {
    expect(
      burgerConstructorReducer(
        {
          draggedItems: [
            INGREDIENT_SAUCE,
            INGREDIENT_MAIN,
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
        INGREDIENT_MAIN,
        INGREDIENT_SAUCE,
      ],
      bun: {},
    });
  });

  it("should handle REMOVE_ITEM", () => {
    expect(
      burgerConstructorReducer(
        {
          draggedItems: [
            INGREDIENT_SAUCE,
          ],
          bun: {},
        },
        {
          type: REMOVE_ITEM,
          item: INGREDIENT_SAUCE,
        }
      )
    ).toEqual(initialState);
  });

  it("should handle CLEAN_CONSTRUCTOR", () => {
    expect(
      burgerConstructorReducer(
        {
          draggedItems: [
            INGREDIENT_SAUCE,
            INGREDIENT_MAIN,
          ],
          bun: TEST_BUN,
        },
        {
          type: CLEAN_CONSTRUCTOR,
        }
      )
    ).toEqual(initialState);
  });
});
