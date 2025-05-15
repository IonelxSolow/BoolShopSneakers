import { BrowserRouter, Routes, Route } from "react-router-dom";
import { GlobalProvider } from "./context/GlobalContext";
import { CartProvider } from "./context/CartContext";
import { SearchProvider } from "./context/SearchContext";

import Home from "./pages/Home";
import DefaultLayout from "./layout/DefaultLayout";
import SingleProduct from "./pages/SingleProduct";
import AllProducts from "./pages/AllProducts";
import CartPage from "./pages/CartPage";
import WishlistPage from "./pages/WhishlistPage";
import Checkout from "./pages/Checkout";
import OrderConfirmation from "./pages/OrderConfirmation";
import OrderDetails from "./pages/OrderDetails";
import NotFound from "./pages/NotFound";
import { WishlistProvider } from "./context/WhishlistContext";
import PopUp from "./components/PopUp";

export default function App() {
  return (

    <GlobalProvider>
      <SearchProvider>
        <WishlistProvider>
          <CartProvider>
            <BrowserRouter>
              <PopUp />
              <Routes>
                <Route element={<DefaultLayout />}>
                  <Route path="/" element={<Home />} />
                  <Route path="/product/:slug" element={<SingleProduct />} />
                  <Route path="/all-products?" element={<AllProducts />} />
                  <Route path="/cart" element={<CartPage />} />
                  <Route path="/wishlist" element={<WishlistPage />} />
                  <Route path="/checkout" element={<Checkout />} />
                  <Route
                    path="/order-confirmation"
                    element={<OrderConfirmation />}
                  />
                  <Route
                    path="/account/orders/:orderId"
                    element={<OrderDetails />}
                  />
                  <Route path="*" element={<NotFound />} />
                </Route>
              </Routes>
            </BrowserRouter>
          </CartProvider>
        </WishlistProvider>
      </SearchProvider>
    </GlobalProvider>
  );
}
