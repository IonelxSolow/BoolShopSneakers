import { createContext, useContext, useState, useEffect } from "react";

const WishlistContext = createContext();

const WishlistProvider = ({ children }) => {
  // Initialize state directly from localStorage
  const [wishlist, setWishlist] = useState(() => {
    try {
      const savedWishlist = localStorage.getItem("wishlist");
      return savedWishlist ? JSON.parse(savedWishlist) : [];
    } catch (error) {
      console.error("Error reading from localStorage:", error);
      return [];
    }
  });

  // Only save to localStorage when wishlist changes
  useEffect(() => {
    try {
      localStorage.setItem("wishlist", JSON.stringify(wishlist));
    } catch (error) {
      console.error("Error saving to localStorage:", error);
    }
  }, [wishlist]);

  const addToWishlist = (item) => {
    setWishlist((current) => {
      if (!current.find((wishlistItem) => wishlistItem.sku === item.sku)) {
        return [...current, item];
      }
      return current;
    });
  };

  const removeFromWishlist = (sku) => {
    setWishlist((current) => current.filter((item) => item.sku !== sku));
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
