import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { SearchContext } from "../../context/SearchContext";

export default function SearchBar({ toggleSearch }) {
  const [searchString, setSearchString] = useState("");
  const { setQuery } = useContext(SearchContext);
  const navigate = useNavigate();
  console.log(searchString);

  function handleSubmit(e) {
    e.preventDefault();
    setQuery(searchString);
    navigate(`/all-products?search=${searchString}`);
  }

  return (
    <form className="d-flex w-100" role="search" onSubmit={handleSubmit}>
      <input
        className="form-control me-2"
        type="search"
        placeholder="Search"
        aria-label="Search"
        value={searchString}
        onChange={(e) => {
          setSearchString(e.target.value);
        }}
      />
      <button className="btn close-search" type="button" onClick={toggleSearch}>
        <i className="d-flex bi bi-x"></i>
      </button>
    </form>
  );
}
