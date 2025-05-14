import { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { SearchContext } from "../context/SearchContext"

export default function SearchBar({ toggleSearch }) {
  const [searchString, setSearchString] = useState("")
  const [suggestions, setSuggestions] = useState([])
  const [allData, setAllData] = useState([])
  const { setQuery } = useContext(SearchContext)
  const navigate = useNavigate()

  useEffect(() => {
    // Recupera tutti i prodotti solo una volta
    fetch("http://localhost:3000/boolshop/api/v1/shoes")
      .then((res) => res.json())
      .then((data) => setAllData(data));
  }, []);

  function handleChange(e) {
    const value = e.target.value;
    setSearchString(value);

    if (value.length === 0) {
      setSuggestions([]);
      return;
    }

    // Filtra suggerimenti per nome, brand, colore
    const filtered = [];
    const brands = new Set();
    const names = new Set();
    const colors = new Set();

    allData.forEach((item) => {
      if (item.brand?.toLowerCase().includes(value.toLowerCase())) brands.add(item.brand);
      if (item.name?.toLowerCase().includes(value.toLowerCase())) names.add(item.name);
      if (item.variant_colors) {
        item.variant_colors.split(",").forEach((color) => {
          if (color.toLowerCase().includes(value.toLowerCase())) colors.add(color);
        });
      }
    });

    // Mostra massimo 5 suggerimenti per tipo
    filtered.push(...[...brands].slice(0, 5).map((b) => ({ type: "Brand", value: b })));
    filtered.push(...[...names].slice(0, 5).map((n) => ({ type: "Nome", value: n })));
    filtered.push(...[...colors].slice(0, 5).map((c) => ({ type: "Colore", value: c })));

    setSuggestions(filtered);
  }

  function handleSubmit(e) {
    e.preventDefault();
    // Se la ricerca corrisponde a un brand, usa brand come parametro
    const brandMatch = allData.find(
      (item) => item.brand?.toLowerCase() === searchString.toLowerCase()
    );
    if (brandMatch) {
      setQuery("");
      navigate(`/all-products?brand=${encodeURIComponent(searchString)}`);
      setSuggestions([]);
      return;
    }
    setQuery(searchString);
    navigate(`/all-products?search=${searchString}`);
    setSuggestions([]);
  }

  function handleSuggestionClick(suggestion) {
    setSearchString(suggestion.value);
    setQuery(suggestion.value);
    if (suggestion.type === "Brand") {
      navigate(`/all-products?brand=${encodeURIComponent(suggestion.value)}`);
    } else if (suggestion.type === "Colore") {
      navigate(`/all-products?color=${encodeURIComponent(suggestion.value)}`);
    } else if (suggestion.type === "Nome") {
      navigate(`/all-products?search=${encodeURIComponent(suggestion.value)}`);
    } else {
      navigate(`/all-products?search=${encodeURIComponent(suggestion.value)}`);
    }
    setSuggestions([]);
  }

  return (
    <form className="d-flex w-100 position-relative" role="search" onSubmit={handleSubmit}>
      <input className="form-control me-2"
        type="search"
        placeholder="Cerca per nome, brand, colore..."
        aria-label="Search"
        value={searchString} onChange={handleChange} autoComplete="off" />
      <button className="btn close-search" type="button" onClick={toggleSearch}>
        <i className="d-flex bi bi-x">
        </i>
      </button>
      {suggestions.length > 0 && (
        <ul
          style={{
            position: "absolute",
            top: "100%",
            left: 0,
            right: 0,
            background: "#fff",
            zIndex: 1000,
            border: "1px solid #eee",
            borderRadius: "0 0 8px 8px",
            maxHeight: 200,
            overflowY: "auto",
            listStyle: "none",
            margin: 0,
            padding: 0,
          }}
        >
          {suggestions.map((s, i) => (
            <li
              key={i}
              style={{ padding: "8px 16px", cursor: "pointer" }}
              onClick={() => handleSuggestionClick(s)}
            >
              <span style={{ fontWeight: 600 }}>{s.type}:</span> {s.value}
            </li>
          ))}
        </ul>
      )}
    </form>
  );
}