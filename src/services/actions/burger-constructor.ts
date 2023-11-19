import { ADD_ITEM, REMOVE_ITEM, MOVE_ITEM, CLEAN_CONSTRUCTOR } from "../constants/constants";
import { TIngredient } from "../../types/types";

export interface IAddItemAction {
  readonly type: typeof ADD_ITEM;
  readonly payload: TIngredient;
}

export interface IRemoveItemAction {
  readonly type: typeof REMOVE_ITEM;
  readonly item: TIngredient;
}

export interface IMoveItemAction {
  readonly type: typeof MOVE_ITEM;
  readonly dragIndex: number;
  readonly hoverIndex: number;
}

export interface ICleanConstructorAction {
  readonly type: typeof CLEAN_CONSTRUCTOR;
}

export type TBurgerConstructorActions =
  | IAddItemAction
  | IRemoveItemAction
  | IMoveItemAction
  | ICleanConstructorAction;
