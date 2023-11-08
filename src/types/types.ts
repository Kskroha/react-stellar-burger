export type TIngredient = {
  uniqueId: any;
  item: any;
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
};

export type TInputValue = {
  name?: string;
  email?: string;
  password?: string;
  token?: string;
};
