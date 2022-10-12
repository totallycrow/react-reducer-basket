import React, { useReducer } from "react";

export interface IBasketContent {
  id: number;
  name: string;
  price: number;
  quantity: number;
  qty: number;
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
  addProduct: Function;
  removeProduct: Function;
  removeAllProducts: Function;
  submitCart: Function;
  updateBasket: Function;
  state: IBasketState;
}

export interface IAction {
  type: string;
  product: IProductItem;
  qty: number;
}

// const handlers = {
//   "add": addhandler
// }

// type action = (payload) => IState

// redux-toolkit -> slice

const reducer = (state: IBasketState, action: IAction, initialState) => {
  const isBasketEmpty = state.basketContent.length === 0;
  const newProduct = action.product;
  const qtyChange = action.qty;

  // spread <-------------
  switch (action.type) {
    case "updateCart":
      const isInBasket = state.basketContent.some(
        (elem: IBasketContent) => elem.id === newProduct.id
      );
      if (!isInBasket)
        return {
          // immer.js
          ...state,
          basketContent: [
            ...state.basketContent,
            { ...action.product, quantity: 1 },
          ],
        };

      // bigOnotation  n * 4  / space1
      // state.basketContent.length * 4

      //   Check if not exceeding stock
      const productQuantityInBasket = state.basketContent.filter(
        (elem: IBasketContent) => elem.id === newProduct.id
      )[0].quantity;

      if (productQuantityInBasket >= newProduct.quantity && qtyChange === 1)
        return state;

      // else update quantity

      // if current basket quantity is 1 remove it from basket after decreasing quantity
      if (
        state.basketContent.filter(
          (elem: IBasketContent) => elem.id === newProduct.id
        )[0].quantity === 1 &&
        qtyChange === -1
      ) {
        const filteredState = state.basketContent.filter(
          (item: IBasketContent) => item.id !== newProduct.id
        );
        return { ...state, basketContent: filteredState };
      }

      return {
        basketContent: state.basketContent.map((item: IBasketContent) => {
          if (item.id === newProduct.id) {
            const newQuantity = item.quantity + qtyChange;
            return { ...item, quantity: newQuantity };
          }
          return item;
        }),
      };

    case "remove_all":
      if (isBasketEmpty) return state;

      return initialState;

    default:
      return state;
  }
};

const usePrepareCartActions = (dispatch) => {
  const removeAllProducts = () => {
    dispatch({ type: "REMOVE_ALL" });
  };

  const updateBasket = (product: any, newQty: number) => {
    dispatch({ type: "updateCart", product: product, qty: newQty });
  };
};

export default function useCartReducer() {
  const initialState = { basketContent: [] };

  const [state, dispatch] = useReducer(reducer, initialState);

  return {
    removeAllProducts,
    updateBasket,
    state,
  };
}
