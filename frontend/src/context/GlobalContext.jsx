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

  return (
    <GlobalContext.Provider value={{ sneakers }}>
      {children}
    </GlobalContext.Provider>
  );
};

function useGlobalContext() {
  return useContext(GlobalContext);
}

export { useGlobalContext, GlobalProvider };
