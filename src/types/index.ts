import { Action, ActionCreator } from "redux";
import { TBurgerConstructorActions } from "../services/actions/burger-constructor";
import { TBurgerInredientsActions } from "../services/actions/burger-ingredients";
import { TOrderDetailsActions } from "../services/actions/order-details";
import { TUserActions } from "../services/actions/user";
import { ThunkAction } from "redux-thunk";
import { store } from "../services/store";

export type RootState = ReturnType<typeof store.getState>;

export type ApplicationActions = TUserActions | TOrderDetailsActions | TBurgerInredientsActions | TBurgerConstructorActions;

export type AppThunk<ReturnType = void> = ActionCreator<
  ThunkAction<ReturnType, Action, RootState, ApplicationActions>
>;

export type AppDispatch = typeof store.dispatch;
