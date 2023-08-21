import {
  OPEN_MODAL,
  CLOSE_MODAL
} from '../actions/ingredient-details';

const initialState = {
  currentPreview: {},
  isOpen: false
};

export const ingredientDetailsReducer = (state = initialState, action) => {
  switch (action.type) {
    case OPEN_MODAL: {
      return { ...state, isOpen: true, currentPreview: action.item };
    }
    case CLOSE_MODAL: {
      return { ...state, isOpen: false, currentPreview: {}};
    }
    default: {
      return state;
    }
  }
};
