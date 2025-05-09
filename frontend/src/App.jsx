import { BrowserRouter, Routes, Route } from "react-router-dom";
import { GlobalProvider } from "./context/GlobalContext";

import Home from "./pages/Home";
import DefaultLayout from "./layout/DefaultLayout";
import SingleProduct from "./pages/SingleProduct";
<<<<<<< HEAD
import Men from "./pages/Men";
import Women from "./pages/Women";
import Kids from "./pages/Kids";
=======
import AllProducts from "./pages/AllProducts";
>>>>>>> 477771a6cb74f011b1d60b7b40460056988a0278

export default function App() {
  return (
    <GlobalProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<DefaultLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/product/:slug" element={<SingleProduct />} />
<<<<<<< HEAD
            <Route path="/men" element={<Men />} />
            <Route path="/women" element={<Women />} />
            <Route path="/kids" element={<Kids />} />
=======
            <Route path="/all-products" element={<AllProducts />} />
>>>>>>> 477771a6cb74f011b1d60b7b40460056988a0278
          </Route>
        </Routes>
      </BrowserRouter>
    </GlobalProvider>
  );
}
