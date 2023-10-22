export type TLocation = {
  background: {
		pathname: string;
		search: string;
		hash: string;
		state: null;
		key: string;
	}
	from: string;
	state?: object;
};

export type TIngredient = {
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

export type TUser = {
  name: string;
  email: string;
};

export type TInputValue = {
  name?: string;
  email?: string;
  password?: string;
  token?: string;
}
