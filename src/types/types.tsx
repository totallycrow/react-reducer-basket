export interface IBasketContent {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

export interface IProductItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

export interface IBasketState {
  basketContent: Array<IBasketContent>;
}

export interface IBasketContext {
  removeAllProducts: Function;
  updateBasket: Function;
  state: IBasketState;
}

export interface IAction {
  type: string;
  product: IProductItem;
  qty: number;
}

export interface IActionRemoveAll {
  type: string;
}

export interface IReducer {
  state: IBasketState;
  action: IAction;
  initialState: IBasketState;
}
