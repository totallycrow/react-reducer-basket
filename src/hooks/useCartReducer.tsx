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

export default function useCartReducer() {
  const reducer = (state: any, action: any) => {
    const newProduct = action.product;
    const isInBasket = state.basketContent.some(
      (elem: any) => elem.id === newProduct.id
    );

    switch (action.type) {
      case "add":
        // Check if not in basket
        if (!isInBasket)
          return {
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
        if (!isInBasket) return state;

        if (
          state.basketContent.filter(
            (elem: any) => elem.id === newProduct.id
          )[0].quantity === 0
        )
          return state;

        return {
          basketContent: state.basketContent.map((item: any) => {
            if (item.id === newProduct.id) {
              const newQuantity = item.quantity - 1;
              return { ...item, quantity: newQuantity };
            }
            return item;
          }),
        };

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
  const removeAllProducts = () => "";
  const submitCart = () => "";

  return { addProduct, removeProduct, removeAllProducts, submitCart, state };
}
