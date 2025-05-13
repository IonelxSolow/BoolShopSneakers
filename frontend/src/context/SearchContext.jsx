import { createContext, useContext, useState, useEffect } from "react";

const SearchContext = createContext();

const SearchProvider = ({ children }) => {
    const [query, setQuery] = useState("")

    return (
        <SearchContext.Provider value={{ query, setQuery }}>
            {children}
        </SearchContext.Provider>
    )
}

export { SearchContext, SearchProvider }
