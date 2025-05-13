import { useGlobalContext } from "../context/GlobalContext";
import { useState, useEffect } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import ToolBar from "../components/all_products_components/ToolBar";
import ProductDisplayer from "../components/all_products_components/ProductDisplayer";

export default function AllProducts() {
    const { sneakers } = useGlobalContext();
    const navigate = useNavigate();
    const location = useLocation();
    //filter initial state
    const [filters, setFilters] = useState({
        brand: "",
        size: "",
        color: "",
        price: "",
        name: "",
        /* tag: "",  implement further*/
    });
    //array to iterate on after filter
    const [filteredSneakers, setFilteredSneakers] = useState([]);
    //loading and error handlers(futher implementetion)
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    //variable to handle tool-bar toggle
    const [isHidden, setIsHidden] = useState(false)

    // Utility: convert filters to query string using the params in the url
    const buildQueryString = (filtersObj) => {
        const params = new URLSearchParams();
        for (let key in filtersObj) {
            if (filtersObj[key]) {
                params.append(key, filtersObj[key]);
            }
        }
        return params.toString();
    };
    //first rendering of the page get filter in the url with the params
    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const newFilters = {
            brand: params.get("brand") || "",
            size: params.get("size") || "",
            color: params.get("color") || "",
            price: params.get("price") || "",
            name: params.get("name") || "",
            search: params.get("search") || "",
        };
        setFilters(newFilters);
    }, [location.search]);
    //every time filters changes replace the old url with a new one
    useEffect(() => {
        const query = buildQueryString(filters);//converter in use
        navigate(`/all-products?${query}`, { replace: true });
    }, [filters]);

    // Fetch sneakers whenever filters change
    useEffect(() => {
        const query = buildQueryString(filters);
        const url = `http://localhost:3000/boolshop/api/v1/shoes/search?${query}`;
        setLoading(true);
        fetch(url)
            .then((res) => res.json())
            .then((data) => {
                setFilteredSneakers(data);
                setError(null);
            })
            .catch((err) => {
                console.error("Failed to fetch sneakers:", err);
                setError("Something went wrong!");
            })
            .finally(() => setLoading(false));
    }, [filters]);

    switch (sneakers.state) {
        case "loading":
            return (
                <h1>Loading...{/* Create a loader component to replace this */}</h1>
            );
        case "error":
            return (
                <>
                    <h1>Error loading product</h1>
                    <p>{product.message}</p>
                </>
            );
        case "success":
            return (
                <>
                    <section className="all-products">
                        <div>
                            <h1 className="mt-5 ms-3"
                                onClick={() => setFilters({ brand: "", size: "", color: "", price: "" })}>
                                All Sneakers
                            </h1>
                            <div onClick={() => setIsHidden((prev) => !prev)} className="ms-3 mt-3 filter-toggle">
                                {isHidden ? "Show Filters" : "Hide Filters"}
                            </div>
                        </div>
                        <div className="container-fluid">
                            <ToolBar
                                filters={filters}
                                setFilters={setFilters}
                                isHidden={isHidden}
                            />
                            <ProductDisplayer filteredSneakers={filteredSneakers} />
                        </div>
                    </section>
                </>
            );
    }
}
