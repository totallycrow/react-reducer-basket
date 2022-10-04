import ProductCart from "./ProductCart";
import { BasketContext } from "../App";

import React, { useContext, useState } from "react";

export default function Products({ data }: any) {
  const [productData, setProductData] = useState(data);

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
              basketController.addProduct(item);
            }}
          >
            add to cart
          </button>

          {basketController.state.basketContent.some(
            (element: any) => element.id === item.id
          ) === true ? (
            <button
              onClick={() => {
                console.log("fired");
                console.log(item);
                basketController.removeProduct(item);
              }}
            >
              Remove
            </button>
          ) : (
            ""
          )}
        </div>
      ))}
    </div>
  );
}
