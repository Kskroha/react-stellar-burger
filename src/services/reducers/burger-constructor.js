import {
ADD_ITEM,
REMOVE_ITEM,
MOVE_ITEM,
COUNT_TOTAL
} from '../actions/burger-constructor';
import update from 'immutability-helper';

const initialState = {
  draggedItems: [],
  bun: {},
  totalPrice: 0
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
        draggedItems: [...state.draggedItems, {...action.item, uniqueId: `${ action.item.name }_${ new Date().getTime() }`}],
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
    case COUNT_TOTAL: {
      const itemsPrice = state.draggedItems.reduce((acc, item) => {
        let sum = 0;
        sum = acc + item.price;
        return sum;
      }, 0);
      const bunsPrice = state.bun.price * 2;
      return {
        ...state,
        totalPrice: itemsPrice + bunsPrice
      }
    }
    default: {
      return state;
    }
  }
};
