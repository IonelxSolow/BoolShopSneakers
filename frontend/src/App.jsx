import { BrowserRouter, Routes, Route } from "react-router-dom";
import { GlobalProvider } from "./context/GlobalContext";

import Home from "./pages/Home";
import DefaultLayout from "./layout/DefaultLayout";
import SingleProduct from "./pages/SingleProduct";
import Men from "./pages/Men";
import Women from "./pages/Women";
import Kids from "./pages/Kids";

export default function App() {
  return (
    <GlobalProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<DefaultLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/product/:slug" element={<SingleProduct />} />
            <Route path="/men" element={<Men />} />
            <Route path="/women" element={<Women />} />
            <Route path="/kids" element={<Kids />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </GlobalProvider>
  );
}
