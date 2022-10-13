import React, { useReducer } from "react";
import {
  IAction,
  IBasketContent,
  IBasketContext,
  IBasketState,
  IProductItem,
} from "../types/types";

// const handlers = {
//   "add": addhandler
// }

// type action = (payload) => IState

// redux-toolkit -> slice

const initialState: IBasketState = { basketContent: [] };

const reducer = (
  state: IBasketState = initialState,
  action: IAction
): IBasketState => {
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
          basketContent: [{ ...action.product, quantity: 1 }],
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

export default function useCartReducer() {
  const [state, dispatch] = useReducer(reducer, initialState);

  const removeAllProducts = () => {
    dispatch({
      type: "remove_all",
      product: { id: 0, price: 0, quantity: 0, name: "" },
      qty: 0,
    });
  };

  const updateBasket = (product: any, newQty: number) => {
    dispatch({ type: "updateCart", product: product, qty: newQty });
  };

  return {
    removeAllProducts,
    updateBasket,
    state,
  };
}
