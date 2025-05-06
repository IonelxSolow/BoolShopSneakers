import { use } from "react";
import { createContext, useContext, useState, useEffect } from "react";

const GlobalContext = createContext();

function useFetchSneakers() {
  const [sneakers, setSneakers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect (() => {

    fetch("http://localhost:3000/boolshop/api/v1/shoes")
    .then((res) => res.json())
    .then((data) => {
      setSneakers(data)
      setLoading(false)
    })
    .catch((err) => setError(err.message))
  }, [])

  return sneakers
}

const GlobalProvider = ({ children }) => {

  const sneakers = useFetchSneakers()

  return (
    <GlobalContext.Provider value={{sneakers}}>
      {children}
    </GlobalContext.Provider>
  )
}

function useGlobalContext() {

  return(useContext(GlobalContext))
}

export {useGlobalContext, GlobalProvider}