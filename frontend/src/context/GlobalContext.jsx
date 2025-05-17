import { createContext, useContext, useState, useEffect } from "react";
import { API_URL } from "../config";

const GlobalContext = createContext();

const GlobalProvider = ({ children }) => {
  const [sneakers, setSneakers] = useState({
    state: "loading",
  });

  useEffect(() => {
    fetch(`${API_URL}/boolshop/api/v1/shoes`)
      .then((res) => res.json())
      .then((data) => {
        setSneakers({
          state: "success",
          result: data,
        });
      })
      .catch((err) => {
        setSneakers({
          state: "error",
          message: err.message,
        });
        console.error(err);
      });
  }, []);

  const [sneakersBrand, setSneakersBrand] = useState({
    state: "loading",
  });

  function fetchBrand(brand) {
    fetch(`${API_URL}/boolshop/api/v1/shoes/brand/${brand}`)
      .then((res) => res.json())
      .then((data) => {
        setSneakersBrand({
          state: "success",
          result: data,
        });
      })
      .catch((err) => {
        setSneakersBrand({
          state: "error",
          message: err.message,
        });
        console.error(err);
      });
  }

  return (
    <GlobalContext.Provider value={{ sneakers, sneakersBrand, fetchBrand }}>
      {children}
    </GlobalContext.Provider>
  );
};

function useGlobalContext() {
  return useContext(GlobalContext);
}

export { useGlobalContext, GlobalProvider };
