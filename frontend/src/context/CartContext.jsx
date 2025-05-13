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

    // Funzione per aumentare la quantità
    function increaseQuantity(sku) {
      const skuIncrease = cart.find((item) => item.sku === sku);
      const updatedCart = cart.map((item) =>
        item.sku === skuIncrease.sku ? { ...item, quantity: item.quantity + 1 } : item
      );
      setCart(updatedCart);
    }
  
    // Funzione per diminuire la quantità
    function decreaseQuantity(sku) {
      const skuDecrease = cart.find((item) => item.sku === sku);
      const updatedCart = cart.map((item) =>
        item.sku === skuDecrease.sku && item.quantity > 1 ? { ...item, quantity: item.quantity - 1 } : item
      );
      setCart(updatedCart);
    }
  
    // Funzione per rimuovere un prodotto
    function removeItem(sku) {
      const skuRemove = cart.find((item) => item.sku === sku);
      const updatedCart = cart.filter((item) => item.sku !== skuRemove.sku);
  
      setCart(updatedCart);
    }

  // Funzione per calcolare il totale
    const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <CartContext.Provider value={{ cart, setCart: updateCart, total, increaseQuantity, decreaseQuantity, removeItem }}>
      {children}
    </CartContext.Provider>
  );
}

function useCart() {
  return useContext(CartContext);
}

export { CartProvider, useCart };
