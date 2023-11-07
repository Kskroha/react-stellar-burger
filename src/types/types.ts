export type TIngredient = {
  uniqueId: any;
  item: any;
  id?: string;
  _id: string;
  name: string;
  type: string;
  proteins: number;
  fat: number;
  carbohydrates: number;
  calories: number;
  price: number;
  image: string;
  image_mobile: string;
  image_large: string;
  count?: number;
};

export type TInputValue = {
  name?: string;
  email?: string;
  password?: string;
  token?: string;
};

export type TOrder = {
  ingredients: Array<TIngredient>;
  _id: string;
  status: string;
  name: string;
  number: number;
  createdAt: string;
  updatedAt: string;
};

export type TUser = {
  name: string;
  email: string;
};

export type TFeedResponse = {
  success: boolean;
  orders: Array<TOrder>;
  total: number;
  totalToday: number;
};

export type TWSActions = {
  wsInit: string;
  onOpen: string;
  onClose: string;
  onError: string;
  onMessage: string;
};
