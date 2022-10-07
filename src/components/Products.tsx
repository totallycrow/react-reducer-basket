import ProductCart from "./ProductCart";
import { BasketContext } from "../App";

import React, { useContext, useState } from "react";

export default function Products({ data }: any) {
  const productData = data;

  const basketController = useContext(BasketContext);

  return (
    <div>
      <div></div>
      {productData.map((item: any) => (
        <div>
          <div>{item.name}</div>
          <div>{item.price}</div>
          <div>{item.stock}</div>
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
            (element: any) => element.id === item.id
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
              {item.stock ===
                basketController.state.basketContent.find(
                  (el: any) => el.id === item.id
                ).quantity && <div>Max Quantity</div>}
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
