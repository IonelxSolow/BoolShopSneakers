import { BrowserRouter, Routes, Route } from "react-router-dom";
import { GlobalProvider } from "./context/GlobalContext";
import { CartProvider } from "./context/CartContext";
import { SearchProvider } from "./context/SearchContext";

import Home from "./pages/Home";
import DefaultLayout from "./layout/DefaultLayout";
import SingleProduct from "./pages/SingleProduct";
import Men from "./pages/Men";
import Women from "./pages/Women";
import Kids from "./pages/Kids";
import AllProducts from "./pages/AllProducts";
import CartPage from "./pages/CartPage";
import Checkout from "./pages/Checkout";

export default function App() {
  return (
    <GlobalProvider>
      <SearchProvider>

        <CartProvider>
          <BrowserRouter>
            <Routes>
              <Route element={<DefaultLayout />}>
                <Route path="/" element={<Home />} />
                <Route path="/product/:slug" element={<SingleProduct />} />
                <Route path="/men" element={<Men />} />
                <Route path="/women" element={<Women />} />
                <Route path="/kids" element={<Kids />} />
                <Route path="/all-products?" element={<AllProducts />} />
                <Route path="/cart" element={<CartPage />} />
                <Route path="/checkout" element={<Checkout />} />
              </Route>
            </Routes>
          </BrowserRouter>
        </CartProvider>
      </SearchProvider>
    </GlobalProvider>
  );
}
