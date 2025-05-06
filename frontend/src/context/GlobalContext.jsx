import { createContext, useContext, useState, useEffect } from "react";

const GlobalContext = createContext();


const GlobalProvider = ({ children }) => {

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [sneakers, setSneakers] = useState([]);

  useEffect (() => {

    fetch("http://localhost:3000/boolshop/api/v1/shoes")
    .then((res) => res.json())
    .then((data) => {
      setSneakers(data)
      setLoading(false)
    })
    .catch((err) => setError(err.message))
  }, [])

  return (
    <GlobalContext.Provider value={{sneakers, setLoading, setError}}>
      {children}
    </GlobalContext.Provider>
  )
}

function useGlobalContext() {

  return(useContext(GlobalContext))
}

export {useGlobalContext, GlobalProvider}