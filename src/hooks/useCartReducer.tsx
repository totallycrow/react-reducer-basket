import React, { useReducer } from "react";

interface IBasketContent {
  productID: number;
  name: string;
  price: number;
  quantity: number;
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

    // spread <-------------
    switch (action.type) {
      // "updateCart" // add / remove qty
      // product Id
      // quantity 1 -1

      // if qty === 1 && payload.qty === -1
      // remove from basket

      // state.basket [{ id, qty }]
      // state.products [] <--
      // state.currentProduct <--- /products/:id

      // product.qty += action.payload.qty

      // remove from cart

      case "add":
        // Check if not in basket
        const newProduct = action.product;
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

        if (productQuantityInBasket >= newProduct.stock) return state;

        console.log("BASKET QTY");
        console.log(productQuantityInBasket);

        // else add quantity
        return {
          basketContent: state.basketContent.map((item: any) => {
            if (item.id === newProduct.id) {
              const newQuantity = item.quantity + 1;
              return { ...item, quantity: newQuantity };
            }
            return item;
          }),
        };

      case "remove":
        // Check if not in basket

        // ?????
        // the same variables that can't be moved up - undefined when resetting the state
        // --> when resetting state no action.product being passed
        const targetProduct = action.product;
        const isProductInBasket = state.basketContent.some(
          // ?????
          // ?????
          (elem: any) => elem.id === newProduct.id
        );
        if (!isProductInBasket) return state;

        // if current basket quantity is 1 remove it from basket after decreasing quantity
        if (
          state.basketContent.filter(
            (elem: any) => elem.id === targetProduct.id
          )[0].quantity === 1
        ) {
          const filteredState = state.basketContent.filter(
            (item: any) => item.id !== targetProduct.id
          );
          return { ...state, basketContent: filteredState };
        }

        // else handle decreasing quantity by 1
        return {
          basketContent: state.basketContent.map((item: any) => {
            if (item.id === newProduct.id) {
              const newQuantity = item.quantity - 1;
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

  return { addProduct, removeProduct, removeAllProducts, submitCart, state };
}
