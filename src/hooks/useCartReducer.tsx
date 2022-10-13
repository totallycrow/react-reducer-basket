import React, { useReducer } from "react";
import {
  IAction,
  IBasketContent,
  IBasketContext,
  IBasketState,
  IProductItem,
} from "../types/types";

// ******************* Consts *********************
const initialState: IBasketState = { basketContent: [] };

const cartCommands = {
  UPDATE_CART: "updateCart",
  REMOVE_ALL: "remove_all",
};

// ******************* Reducer *********************
const reducer = (
  state: IBasketState = initialState,
  action: IAction
): IBasketState => {
  const isBasketEmpty = state.basketContent.length === 0;
  const newProduct = action.product;
  const qtyChange = action.qty;
  const { UPDATE_CART, REMOVE_ALL } = cartCommands;

  switch (action.type) {
    case UPDATE_CART:
      const productInBasket = state.basketContent.filter(
        (elem: IBasketContent) => elem.id === newProduct.id
      )[0];

      if (!productInBasket)
        return {
          // immer.js
          ...state,
          basketContent: [
            ...state.basketContent,
            { ...action.product, quantity: 1 },
          ],
        };

      //   Check if not exceeding stock
      const productQuantityInBasket = productInBasket.quantity;

      if (productQuantityInBasket >= newProduct.quantity && qtyChange === 1)
        return state;

      // if current basket quantity is 1 remove it from basket after decreasing quantity
      if (productQuantityInBasket === 1 && qtyChange === -1) {
        const filteredState = state.basketContent.filter(
          (item: IBasketContent) => item.id !== newProduct.id
        );
        return { ...state, basketContent: filteredState };
      }

      // Handle selected item quantity change
      return {
        basketContent: state.basketContent.map((item: IBasketContent) => {
          if (item.id === newProduct.id) {
            const newQuantity = item.quantity + qtyChange;
            return { ...item, quantity: newQuantity };
          }
          return item;
        }),
      };

    case REMOVE_ALL:
      if (isBasketEmpty) return state;

      return initialState;

    default:
      return state;
  }
};

// ******************* USEREDUCER *********************
export default function useCartReducer() {
  const [state, dispatch] = useReducer(reducer, initialState);

  const cartActions = {
    removeAllProducts: () => {
      dispatch({
        type: cartCommands.REMOVE_ALL,
        product: { id: 0, price: 0, quantity: 0, name: "" },
        qty: 0,
      });
    },
    updateBasket: (product: IProductItem, newQty: number) => {
      dispatch({
        type: cartCommands.UPDATE_CART,
        product: product,
        qty: newQty,
      });
    },
  };

  return {
    cartActions,
    state,
  };
}
