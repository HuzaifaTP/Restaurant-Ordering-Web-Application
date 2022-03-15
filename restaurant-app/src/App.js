import React, { useState } from "react";
// import { NavBar } from "./components";
import { BrowserRouter as Router } from "react-router-dom";
import "./App.css";
// import Cart from './components/Cart/Cart';
import { foodCategoryList } from "./constants";
import { foodItemList } from "./constants";
import RoutesFile from "./router/RoutesFile";

// const { testConnection} = require('./models');

// testConnection();

const foodCategory = { foodCategoryList };
const foodItem = { foodItemList };

function App() {
  const [cartItems, setCartItems] = useState([]);
  const [totalFoodItems, setTotalFoodItems] = useState(9);

  function itemExists(cartItems, product) {
    const exist = cartItems.find((item) => item.id === product.id);
    if (exist) {
      return exist;
    }
    return false;
  }

  const addItemPopUpScreen = (instruction, count, product) => {
    const exist = cartItems.find((item) => item.id === product.id);

    if (exist) {
      if (instruction === null) {
        setCartItems(
          cartItems.map((item) =>
            item.id === product.id ? { ...exist, qty: exist.qty + count } : item
          )
        );
      } else {
        setCartItems([
          ...cartItems,
          {
            ...product,
            qty: count,
            instruction: instruction,
            id: totalFoodItems + 1,
          },
        ]);
        setTotalFoodItems(totalFoodItems + 1);
      }
    } else {
      setCartItems([
        ...cartItems,
        { ...product, qty: count, instruction: instruction },
      ]);
    }

    console.log(cartItems);
  };

  const addSpecialInstruction = (product, instruction) => {
    setCartItems(
      cartItems.map((item) =>
        item.id === product.id ? { ...item, instruction: instruction } : item
      )
    );
  };

  const addItem = (product) => {
    const exist = itemExists(cartItems, product);
    if (exist) {
      setCartItems(
        cartItems.map((item) =>
          item.id === product.id ? { ...exist, qty: exist.qty + 1 } : item
        )
      );
    } else {
      setCartItems([...cartItems, { ...product, qty: 1 }]);
      // console.log(cartItems)
    }
  };
  const removeItem = (pdt) => {
    const exist = itemExists(cartItems, pdt);
    if (exist.qty <= 1) {
      setCartItems(cartItems.filter((x) => x.id !== pdt.id));
    } else {
      setCartItems(
        cartItems.map((x) =>
          x.id === pdt.id ? { ...exist, qty: exist.qty - 1 } : x
        )
      );
    }
  };

  return (
    <Router>
      <div className="App">
        <RoutesFile
          foodCategory={foodCategory}
          foodItem={foodItem}
          cartItems={cartItems}
          addItem={addItem}
          removeItem={removeItem}
          itemExists={itemExists}
          addItemPopUpScreen={addItemPopUpScreen}
        />
      </div>
    </Router>
  );
}

export default App;
