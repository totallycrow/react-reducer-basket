import React from "react";
import logo from "./logo.svg";
import "./App.css";
import Basket from "./components/Basket";
import Products from "./components/Products";
import useCartReducer from "./hooks/useCartReducer";
import { sampleData } from "./sampleData";
import { useContext, createContext } from "react";
import {
  IBasketContent,
  IBasketContext,
  IBasketState,
  IProductItem,
} from "./hooks/useCartReducer";

// interface IBasket {
//   addProduct: Function;
//   removeProduct: Function;
//   removeAllProducts: Function;
//   submitCart: Function;
//   updateBasket: Function;
//   state: any;
// }

// interface IBasketState {

// }

// export const BasketContext = React.createContext<IBasket>({} as IBasket);

// // defensive programming
// export const BasketContext = createContext<IBasketContext>({
//   addProduct: (item: IProductItem) => {},
//   removeProduct: () => {},
//   removeAllProducts: () => {},
//   submitCart: () => {},

//   // how to type return object of type??
//   updateBasket: (item: IProductItem, newQty: number) => {},
//   state: {} as IBasketState,
// });

export const BasketContext = createContext<IBasketContext | null>(null);
function App() {
  console.log(sampleData);
  const basketController = useCartReducer();

  return (
    <div>
      <div>
        <BasketContext.Provider value={basketController}>
          <h1>SHOP</h1>
          <h2>Basket</h2>
          <Basket />
          <h2>Products</h2>
          <Products data={sampleData} />
        </BasketContext.Provider>
      </div>
    </div>
  );
}

export default App;
