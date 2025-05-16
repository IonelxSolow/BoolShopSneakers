import { useState, useEffect } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import ToolBar from "../components/all_products_components/ToolBar";
import ProductDisplayer from "../components/all_products_components/ProductDisplayer";
import Pagination from "../components/all_products_components/Pagination";

export default function AllProducts() {
  const navigate = useNavigate();
  const location = useLocation();
  //filter initial state
  const [filters, setFilters] = useState({
    brand: "",
    size: "",
    color: "",
    price: "",
    name: "",
    tags: "",
    onsale: false,
  });
  //array to iterate on after filter
  const [originalSneakers, setOriginalSneakers] = useState([]);
  const [filteredSneakers, setFilteredSneakers] = useState({
    state: "loading",
  });
  //variable to handle tool-bar toggle
  const [isHidden, setIsHidden] = useState(false);
  //variable to handle sorting toggle
  const [isSortedOpen, setIsSortedOpen] = useState(false);
  // Utility: convert filters to query string using the params in the url
  const buildQueryString = (filtersObj) => {
    const params = new URLSearchParams();
    for (let key in filtersObj) {
      if (filtersObj[key]) {
        params.append(key, filtersObj[key]);
      }
    }
    return params.toString().toLowerCase();
  };

  //first rendering of the page get filter in the url with the params
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    let searchParam = params.get("search") || "";

    const newFilters = {
      brand: params.get("brand") || "",
      size: params.get("size") || "",
      color: params.get("color") || "",
      price: params.get("price") || "",
      name: params.get("name") || "",
      onsale: params.get("onsale") === "true",
      search: searchParam,
      tags: params.get("tags") || "",
    };

    if (JSON.stringify(filters) !== JSON.stringify(newFilters)) {
      setFilters(newFilters);
    }
  }, [location.search]);

  //every time filters changes replace the old url with a new one
  useEffect(() => {
    const query = buildQueryString(filters);
    navigate(`/all-products?${query}`, { replace: true });
  }, [filters]);

  // Fetch sneakers whenever filters change
  useEffect(() => {
    let url;
    const query = buildQueryString(filters);
    url = `http://localhost:3000/boolshop/api/v1/shoes/search?${query}`;

    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        const stringifiedNew = JSON.stringify(data);
        const stringifiedOld = JSON.stringify(originalSneakers);

        if (stringifiedNew !== stringifiedOld) {
          setOriginalSneakers(data);
          setFilteredSneakers({
            state: "success",
            result: data,
          });
        }
      })
      .catch((err) => {
        console.error("Failed to fetch sneakers:", err);
        setFilteredSneakers({
          state: "error",
          message: err,
        });
      });
  }, [filters]);
  //grid state
  const [isGrid, setIsGrid] = useState(true);
  //display switcher
  function switchDisplay() {
    setIsGrid(!isGrid)
  }
  //sorting
  const [sortConfig, setSortConfig] = useState({ key: "", direction: "" });
  //sorting handler
  const handleSort = (key) => {
    let direction = "asc";
    // If same key is clicked again, toggle direction
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }

    // Default to desc for dates (newest first)
    if (key === "date" && sortConfig.key !== "date") {
      direction = "desc";
    }

    const sorted = [...filteredSneakers.result].sort((a, b) => {
      if (key === "name") {
        return direction === "asc"
          ? a.name.localeCompare(b.name)
          : b.name.localeCompare(a.name);
      } else if (key === "price") {
        const priceA = parseFloat(a.discounted_price || a.price);
        const priceB = parseFloat(b.discounted_price || b.price);
        return direction === "asc" ? priceA - priceB : priceB - priceA;
      } else if (key === "date") {
        const dateA = new Date(a.updated_at);
        const dateB = new Date(b.updated_at);
        return direction === "asc"
          ? dateA.getTime() - dateB.getTime()
          : dateB.getTime() - dateA.getTime();
      }
      return 0;
    });

    setSortConfig({ key, direction });
    setFilteredSneakers({
      ...filteredSneakers,
      result: sorted,
    });
  };

  const resetSort = () => {
    setSortConfig({ key: "", direction: "" });
    // Reset to original order from API
    setFilteredSneakers({
      ...filteredSneakers,
      result: [...originalSneakers],
    });
    // Close the sort dropdown
    setIsSortedOpen(false);
  };
  //pagination
  const [currentPage, setCurrentPage] = useState(1);
  //initial number of items shown
  const [itemsPerPage, setItemsPerPage] = useState(12);
  //calculate index of last element
  const indexOfLast = currentPage * itemsPerPage;
  //calculate index of first element
  const indexOfFirst = indexOfLast - itemsPerPage;
  const totalPages = Math.ceil(filteredSneakers.result?.length / itemsPerPage);
  //getting just the first and last element for the page
  const currentItems = Array.isArray(filteredSneakers.result)
    ? filteredSneakers.result.slice(indexOfFirst, indexOfLast)
    : [];
  //toggler
  const [isItemsOpen, setIsItemsOpen] = useState(false);
  //handler that set the current page
  const changePage = (pageNum) => setCurrentPage(pageNum);
  useEffect(() => {
    setCurrentPage(1);
  }, [itemsPerPage, filters]); //it changes whenever item per page is change

  switch (filteredSneakers.state) {
    case "loading":
      return (
        <h1>Loading...{/* Create a loader component to replace this */}</h1>
      );
    case "error":
      return (
        <>
          <h1>Error loading product</h1>
          <p>{filteredSneakers.message}</p>
        </>
      );
    case "success":
      return (
        <>
          <section className="all-products">
            <div>
              {filters.search ? (
                <div
                  className="breadcrumb ms-3 mt-4 mb-2"
                  style={{ fontSize: "1.1rem" }}
                >
                  <Link
                    to="/"
                    style={{
                      textDecoration: "none",
                      fontWeight: 500,
                    }}
                  >
                    Home
                  </Link>
                  {" / "}
                  <Link
                    to="/all-products"
                    style={{
                      textDecoration: "none",
                      fontWeight: 500,
                    }}
                  >
                    Prodotti
                  </Link>
                  {" / "}
                  Risultati per: "<strong>{filters.search}</strong>"
                </div>
              ) : (
                <div
                  className="breadcrumb ms-3 mt-4 mb-2"
                  style={{ fontSize: "1.1rem" }}
                >
                  <Link
                    to="/"
                    style={{
                      textDecoration: "none",
                      fontWeight: 500,
                    }}
                  >
                    Home
                  </Link>
                  {" / "}
                  <Link
                    to="/all-products"
                    style={{
                      textDecoration: "none",
                      fontWeight: 500,
                    }}
                  >
                    Prodotti
                  </Link>
                </div>
              )}
              <h1
                className="mt-5 ms-3 all-title"
                style={{ width: 300 }}
                onClick={() =>
                  setFilters({ brand: "", size: "", color: "", price: "", tags: "", onsale: false })
                }
              >
                All Sneakers
              </h1>

              <div className="d-flex align-items-center justify-content-between pe-5">
                <div
                  onClick={() => setIsHidden((prev) => !prev)}
                  className="ms-3 mt-3 filter-toggle"
                >
                  {isHidden ? "Show Filters" : "Hide Filters"}
                </div>
                <div className=" position-relative d-flex align-items-center justify-content-end gap-3 me-3 mt-3 mb-2">
                  <div
                    onClick={() => setIsSortedOpen((prev) => !prev)}
                    className="filter-toggle"
                  >
                    {isSortedOpen ? (
                      <>
                        <i className="bi bi-funnel-fill"></i>{" "}
                        <i className="bi bi-chevron-up"></i>
                      </>
                    ) : (
                      <>
                        <i className="bi bi-funnel-fill"></i>{" "}
                        <i className="bi bi-chevron-down"></i>
                      </>
                    )}
                  </div>

                  <button
                    className="btn btn-home-light"
                    onClick={switchDisplay}
                  >
                    {isGrid ? (
                      <i className="bi bi-list-task"></i>
                    ) : (
                      <i className="bi bi-grid"></i>
                    )}
                  </button>
                  {isSortedOpen && (
                    <ul className="sort-dropdown position-absolute bg-white border rounded shadow p-2">
                      <li
                        className="py-1 px-2"
                        onClick={() => handleSort("name")}
                      >
                        Sort by Name (
                        {sortConfig.key === "name"
                          ? sortConfig.direction === "asc"
                            ? "A-Z"
                            : "Z-A"
                          : "A-Z"}
                        )
                      </li>
                      <li
                        className="py-1 px-2"
                        onClick={() => handleSort("price")}
                      >
                        Sort by Price (
                        {sortConfig.key === "price"
                          ? sortConfig.direction === "asc"
                            ? "Low → High"
                            : "High → Low"
                          : "Low → High"}
                        )
                      </li>
                      <li
                        className="py-1 px-2"
                        onClick={() => handleSort("date")}
                      >
                        Sort by Date (
                        {sortConfig.key === "date"
                          ? sortConfig.direction === "asc"
                            ? "Oldest First"
                            : "Newest First"
                          : "Newest First"}
                        )
                      </li>
                      <li className="py-1 px-2" onClick={resetSort}>
                        Reset
                      </li>
                    </ul>
                  )}
                </div>
              </div>
            </div>

            <div className="container-fluid">
              <ToolBar
                filters={filters}
                setFilters={setFilters}
                isHidden={isHidden}
              />
              <ProductDisplayer
                currentItems={currentItems}
                filteredSneakers={filteredSneakers}
                isGrid={isGrid}
              />
            </div>
            <Pagination
              itemsPerPage={itemsPerPage}
              currentPage={currentPage}
              totalPages={totalPages}
              changePage={changePage}
              isItemsOpen={isItemsOpen}
              setIsItemsOpen={setIsItemsOpen}
              setItemsPerPage={setItemsPerPage}
            />
          </section>
        </>
      );
  }
}
