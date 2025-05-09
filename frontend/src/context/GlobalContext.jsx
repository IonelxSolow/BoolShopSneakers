import { createContext, useContext, useState, useEffect } from "react";

const GlobalContext = createContext();

const GlobalProvider = ({ children }) => {
  const [sneakers, setSneakers] = useState({
    state: "loading",
  });

  useEffect(() => {
    fetch("http://localhost:3000/boolshop/api/v1/shoes")
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
        console.error;
      });
  }, []);

  const [sneakersBrand, setSneakersBrand] = useState({
    state: "loading",
  });

  function fetchBrand(brand) {
    fetch(`http://localhost:3000/boolshop/api/v1/shoes/brand/${brand}`)
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
        console.error;
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
