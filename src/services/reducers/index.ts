import { combineReducers } from "redux";
import { burgerConstructorReducer } from "./burger-constructor";
import { burgerIngredientsReducer } from "./burger-ingredients";
import { orderDetailsReducer } from "./order-details";
import { userReducer } from "./user";
import { wsFeedReducer } from "./ws-feed";
import { wsOrdersReducer } from "./ws-order";

export const rootReducer = combineReducers({
  burgerConstructor: burgerConstructorReducer,
  burgerIngredients: burgerIngredientsReducer,
  orderDetails: orderDetailsReducer,
  user: userReducer,
  wsFeed: wsFeedReducer,
  wsOrder: wsOrdersReducer,
});

