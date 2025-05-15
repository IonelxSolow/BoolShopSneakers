import { createContext, useContext, useState, useEffect } from "react";

const WishlistContext = createContext();

const WishlistProvider = ({ children }) => {
  const [wishlist, setWishlist] = useState([]);

  // Carica la wishlist da localStorage all'inizio
  useEffect(() => {
    const savedWishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
    setWishlist(savedWishlist);
  }, []);

  // Salva la wishlist in localStorage ogni volta che cambia
  useEffect(() => {
    localStorage.setItem("wishlist", JSON.stringify(wishlist));
  }, [wishlist]);

  // Aggiungi un prodotto alla wishlist
  const addToWishlist = (item) => {
    if (!wishlist.find((wishlistItem) => wishlistItem.id === item.id)) {
      setWishlist([...wishlist, item]);
    }
  };

  // Rimuovi un prodotto dalla wishlist
  const removeFromWishlist = (id) => {
    const updatedWishlist = wishlist.filter((item) => item.id !== id);
    setWishlist(updatedWishlist);
  };

  return (
    <WishlistContext.Provider
      value={{ wishlist, addToWishlist, removeFromWishlist, setWishlist }}
    >
      {children}
    </WishlistContext.Provider>
  );
};

function useWishlist() {
  return useContext(WishlistContext);
}

export { WishlistProvider, useWishlist };