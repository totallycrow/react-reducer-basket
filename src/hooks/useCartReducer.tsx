import React, { useReducer } from "react";

interface IBasketContent {
  productID: number;
  name: string;
  price: number;
  quantity: number;
  qty: number;
}

interface IBasket {
  basketContent: Array<IBasketContent>;
}

// const handlers = {
//   "add": addhandler
// }

// type action = (payload) => IState

// redux-toolkit -> slice

export default function useCartReducer() {
  const reducer = (state: any, action: any) => {
    const isBasketEmpty = state.basketContent.length === 0;
    const newProduct = action.product;
    const qtyChange = action.qty;

    // spread <-------------
    switch (action.type) {
      case "updateCart":
        const isInBasket = state.basketContent.some(
          (elem: any) => elem.id === newProduct.id
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

        //   Check if not exceeding stock
        const productQuantityInBasket = state.basketContent.filter(
          (elem: any) => elem.id === newProduct.id
        )[0].quantity;

        if (productQuantityInBasket >= newProduct.stock && qtyChange === 1)
          return state;

        // else update quantity

        // if current basket quantity is 1 remove it from basket after decreasing quantity
        if (
          state.basketContent.filter(
            (elem: any) => elem.id === newProduct.id
          )[0].quantity === 1 &&
          qtyChange === -1
        ) {
          const filteredState = state.basketContent.filter(
            (item: any) => item.id !== newProduct.id
          );
          return { ...state, basketContent: filteredState };
        }

        return {
          basketContent: state.basketContent.map((item: any) => {
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
  const initialState = { basketContent: [] };

  const [state, dispatch] = useReducer(reducer, initialState);

  const addProduct = (product: any) =>
    dispatch({ type: "add", product: product });

  const removeProduct = (product: any) =>
    dispatch({ type: "remove", product: product });

  const removeAllProducts = () => {
    dispatch({ type: "remove_all" });
  };
  const submitCart = () => "";

  const updateBasket = (product: any, newQty: number) => {
    dispatch({ type: "updateCart", product: product, qty: newQty });
  };

  return {
    addProduct,
    removeProduct,
    removeAllProducts,
    submitCart,
    updateBasket,
    state,
  };
}
