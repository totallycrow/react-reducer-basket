import ProductCart from "./ProductCart";
import { BasketContext } from "../App";
import {
  IBasketContent,
  IBasketContext,
  IBasketState,
  IProductItem,
} from "../hooks/useCartReducer";

import React, { useContext, useState } from "react";

interface IPropsData {
  data: Array<IProductItem>;
}

export default function Products({ data }: IPropsData) {
  console.log("Products Component fired");
  console.log(data);
  const productData = data;

  const basketController = useContext(BasketContext);
  if (!basketController) return <div>Product List</div>;

  return (
    <div>
      <div></div>
      {productData.map((item: IProductItem) => (
        <div>
          <div>{item.name}</div>
          <div>{item.price}</div>
          <div>{item.quantity}</div>
          <button
            onClick={() => {
              console.log("fired");
              console.log(item);
              basketController.updateBasket(item, 1);
            }}
          >
            add to cart
          </button>

          {basketController.state.basketContent.some(
            (element: IBasketContent) => element.id === item.id
          ) === true ? (
            <div>
              <button
                onClick={() => {
                  console.log("fired");
                  console.log(item);
                  basketController.updateBasket(item, -1);
                }}
              >
                Remove
              </button>
              {item.quantity ===
                basketController.state.basketContent.find(
                  (el: IBasketContent) => el.id === item.id
                )?.quantity && <div>Max Quantity</div>}
            </div>
          ) : (
            ""
          )}
          <div>{}</div>
        </div>
      ))}
    </div>
  );
}
