import React, { useContext } from "react";
import useCartReducer from "../hooks/useCartReducer";
import { BasketContext } from "../App";

export default function Basket() {
  const basketController = useContext(BasketContext);

  console.log(basketController.state);

  const products = basketController.state.basketContent;
  console.log("BASKET PRODUCTS");
  console.log(products);
  return (
    <div>
      {products.map((item: any) => (
        <div>
          <div>{item.name}</div>
          <div>{item.quantity}</div>
        </div>
      ))}
    </div>
  );
}
