import { combineReducers } from "redux";
import { burgerConstructorReducer } from "./burger-constructor";
import { burgerIngredientsReducer } from "./burger-ingredients";
import { orderDetailsReducer } from "./order-details";
import { userReducer } from "./user";

export const rootReducer = combineReducers({
  burgerConstructor: burgerConstructorReducer,
  burgerIngredients: burgerIngredientsReducer,
  orderDetails: orderDetailsReducer,
  user: userReducer,
});
