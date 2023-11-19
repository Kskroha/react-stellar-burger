import { TIngredient } from "../../types/types";
import type { TBurgerConstructorActions } from "../actions/burger-constructor";
import {
  ADD_ITEM,
  REMOVE_ITEM,
  MOVE_ITEM,
  CLEAN_CONSTRUCTOR,
} from "../constants/constants";
import update from "immutability-helper";

type TConstructorInitialState = {
  draggedItems: Array<TIngredient>;
  bun: TIngredient;
};

export const initialState: TConstructorInitialState = {
  draggedItems: [],
  bun: {} as TIngredient,
};

export const burgerConstructorReducer = (
  state = initialState,
  action: TBurgerConstructorActions
) => {
  switch (action.type) {
    case ADD_ITEM: {
      if (action.payload.item.type === "bun") {
        return {
          ...state,
          bun: state.bun
            ? state.bun._id === action.payload.item._id
              ? state.bun
              : action.payload.item
            : [...state.bun, action.payload.item],
        };
      }
      return {
        ...state,
        draggedItems: [
          ...state.draggedItems,
          { ...action.payload.item, uniqueId: action.payload.uniqueId },
        ],
      };
    }
    case REMOVE_ITEM: {
      const index = state.draggedItems.indexOf(action.item);
      const copyItems = state.draggedItems.slice();
      copyItems.splice(index, 1);
      return {
        ...state,
        draggedItems: copyItems,
      };
    }
    case MOVE_ITEM: {
      return {
        ...state,
        draggedItems: update(state.draggedItems, {
          $splice: [
            [action.dragIndex, 1],
            [action.hoverIndex, 0, state.draggedItems[action.dragIndex]],
          ],
        }),
      };
    }
    case CLEAN_CONSTRUCTOR: {
      return {
        ...initialState,
      };
    }
    default: {
      return state;
    }
  }
};
