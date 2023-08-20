import {
ADD_ITEM,
REMOVE_ITEM,
MOVE_ITEM
} from '../actions/burger-constructor';
import update from 'immutability-helper';
import { v4 as uuidv4 } from "uuid";

const initialState = {
  draggedItems: [],
  bun: {}
};

export const burgerConstructorReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_ITEM: {
      if (action.item.type === "bun") {
        return {
          ...state,
          bun: state.bun
          ? state.bun._id === action.item._id ? state.bun : action.item
          : [...state.bun, action.item]
        }
      }
      return {
        ...state,
        draggedItems: [...state.draggedItems, {...action.item, uniqueId: uuidv4()}],
      }
    }
    case REMOVE_ITEM: {
      const index = state.draggedItems.indexOf(action.item);
      const copyItems = state.draggedItems.slice();
      copyItems.splice(index, 1);
      return {
        ...state,
        draggedItems: copyItems
      }
    }
    case MOVE_ITEM: {
      return {
        ...state,
        draggedItems: update(state.draggedItems, {
          $splice: [
            [action.dragIndex, 1],
            [action.hoverIndex, 0, state.draggedItems[action.dragIndex]],
          ],
        })
      }
    }
    default: {
      return state;
    }
  }
};
