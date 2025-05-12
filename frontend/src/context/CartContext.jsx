import { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext();

function CartProvider({ children }) {
  const [cart, setCart] = useState([]);

  if (cart) {
    useEffect(() => {
      const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
      setCart(savedCart);
    }, []);
  }

  function updateCart(newCart) {
    setCart(newCart);
    localStorage.setItem("cart", JSON.stringify(newCart));
  }

  return (
    <CartContext.Provider value={{ cart, setCart: updateCart }}>
      {children}
    </CartContext.Provider>
  );
}

function useCart() {
  return useContext(CartContext);
}

export { CartProvider, useCart };
