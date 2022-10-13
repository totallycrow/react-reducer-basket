import React, { useContext } from "react";
import { IBasketContent } from "../types/types";
import { BasketContext } from "../App";

export default function Basket() {
  const basketController = useContext(BasketContext);

  if (!basketController) return <div>Basket</div>;

  console.log(basketController.state);

  const products = basketController.state.basketContent;
  const isBasketEmpty = basketController.state.basketContent.length === 0;
  console.log(isBasketEmpty);

  console.log("BASKET PRODUCTS");
  console.log(products);
  return (
    <div>
      {products.map((item: IBasketContent) => (
        <div>
          <div>{item.name}</div>
          <div>{item.quantity}</div>
        </div>
      ))}
      {isBasketEmpty ? (
        ""
      ) : (
        <button onClick={() => basketController.removeAllProducts()}>
          Remove All
        </button>
      )}
    </div>
  );
}
