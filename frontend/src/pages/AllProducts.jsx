import { useGlobalContext } from "../context/GlobalContext";
import { useState, useEffect } from "react";

export default function AllProducts() {
    const { sneakers } = useGlobalContext();

    const [filters, setFilters] = useState({
        brand: "",
        size: "",
        color: "",
        price: "",
        /* tag: "",  implement further*/
    });
    const [filteredSneakers, setFilteredSneakers] = useState([]);
    const [isBrandOpen, setIsBrandOpen] = useState(false);
    const sneakersSizes = [37, 38, 39, 40, 41, 42, 43, 44, 45];
    const [isPriceOpen, setIsPriceOpen] = useState(false);
    const sneakersColors = ["red", "blue", "green", "yellow", "black", "white", "gray", "beige", "brown", "pink"];
    const [isSizeOpen, setIsSizeOpen] = useState(false);
    const [isColorOpen, setIsColorOpen] = useState(false);
    const [isTagOpen, setIsTagOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // Utility: convert filters to query string
    const buildQueryString = (filtersObj) => {
        const params = new URLSearchParams();
        for (let key in filtersObj) {
            if (filtersObj[key]) {
                params.append(key, filtersObj[key]);
            }
        }
        return params.toString(); // brand=nike&size=42
    };

    // Fetch sneakers whenever filters change
    useEffect(() => {
        const query = buildQueryString(filters);
        const url = `http://localhost:3000/boolshop/api/v1/shoes/search?${query}`;
        console.log(url)
        setLoading(true);
        fetch(url)
            .then((res) => res.json())
            .then((data) => {
                setFilteredSneakers(data); // assume API returns { result: [...] }
                setError(null);
                console.log(data)
            })
            .catch((err) => {
                console.error("Failed to fetch sneakers:", err);
                setError("Something went wrong!");
            })
            .finally(() => setLoading(false));
    }, [filters]);

    const handleFilterChange = (key, value) => {
        setFilters(() => ({
            ...filters,
            [key]: value,
        }));
    };

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
            console.log(filters)


            return (
                <>
                    <section className="all-products">
                        <div className="container-fluid">
                            <h1>All Sneakers</h1>
                            <div className="container-fluid  d-flex justify-content-between m-auto">
                                <div className="tool-bar col-4 col-md-2">
                                    <div className="filters-list">
                                        <div
                                            className="filter-items d-flex justify-content-between"
                                            onClick={() => setIsBrandOpen(!isBrandOpen)}
                                        >
                                            brand {isBrandOpen ? <i className="bi bi-chevron-up"></i> : <i className="bi bi-chevron-down"></i>}
                                        </div>
                                        {isBrandOpen && (
                                            <ul>
                                                {(() => {
                                                    const duplicateBrands = [];
                                                    return sneakers.result.map((sneaker, index) => {
                                                        if (duplicateBrands.includes(sneaker.brand)) return null;
                                                        duplicateBrands.push(sneaker.brand);
                                                        return <li onClick={() => { handleFilterChange("brand", sneaker.brand) }} key={sneaker.id}>{sneaker.brand}</li>;
                                                    });
                                                })()}
                                            </ul>
                                        )
                                        }
                                        <div
                                            className="filter-items d-flex justify-content-between"
                                            onClick={() => setIsSizeOpen(!isSizeOpen)}
                                        >
                                            size {isSizeOpen ? <i className="bi bi-chevron-up"></i> : <i className="bi bi-chevron-down"></i>}
                                        </div>
                                        {isSizeOpen && (
                                            <ul>
                                                {
                                                    //map through colors and return li for each size
                                                    sneakersSizes.map((size, index) => {
                                                        return (
                                                            <li key={`${index}-${size}`} onClick={() => handleFilterChange("size", size)}>
                                                                {size}
                                                            </li>
                                                        );
                                                    })

                                                }
                                            </ul>
                                        )}

                                        <div
                                            className="filter-items d-flex justify-content-between"
                                            onClick={() => setIsColorOpen(!isColorOpen)}
                                        >
                                            color {isColorOpen ? <i className="bi bi-chevron-up"></i> : <i className="bi bi-chevron-down"></i>}
                                        </div>
                                        {isColorOpen && (
                                            <ul>
                                                {
                                                    //map through colors and return li for each color
                                                    sneakersColors.map((color, index) => {
                                                        return (
                                                            <li key={`${index}-${color}`} onClick={() => handleFilterChange("color", color)}>
                                                                {color}
                                                            </li>
                                                        );
                                                    })

                                                }
                                            </ul>
                                        )}
                                        <div
                                            className="filter-items d-flex justify-content-between"
                                            onClick={() => setIsPriceOpen(!isPriceOpen)}
                                        >
                                            price {isPriceOpen ? <i className="bi bi-chevron-up"></i> : <i className="bi bi-chevron-down"></i>}
                                        </div>
                                        {isPriceOpen && (
                                            <ul>
                                                <li value={50} onClick={(e) => handleFilterChange("price", e.target.value)}>50+</li>
                                                <li value={100} onClick={(e) => handleFilterChange("price", e.target.value)}>100+</li>
                                                <li value={200} onClick={(e) => handleFilterChange("price", e.target.value)}>200+</li>
                                                <li value={300} onClick={(e) => handleFilterChange("price", e.target.value)}>300+</li>
                                            </ul>
                                        )}
                                        <div
                                            className="filter-items d-flex justify-content-between"
                                            onClick={() => setIsTagOpen(!isTagOpen)}
                                        >
                                            categories {isTagOpen ? <i className="bi bi-chevron-up"></i> : <i className="bi bi-chevron-down"></i>}
                                        </div>
                                        {isTagOpen && (
                                            <ul>
                                                <li>category 1</li>
                                                <li>category 2</li>
                                                <li>category 3</li>
                                                <li>category 4</li>
                                            </ul>
                                        )}
                                    </div>
                                </div>
                                <div className="products-displayer col-8 col-md-10 row">
                                    {filteredSneakers.map((sneaker) => {
                                        return (
                                            <div className="col-sm-12 col-md-4 mb-4" key={sneaker.id}>
                                                <div className="card">
                                                    <img
                                                        className="card-img-top"
                                                        src={`/assets/${JSON.parse(sneaker.image_urls)[0]}`}
                                                        alt={sneaker.name}
                                                    />
                                                    <div className="card-body">
                                                        <h4 className="card-title">{sneaker.name}</h4>
                                                        <p className="card-text">{sneaker.description}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>
                    </section>
                </>
            );
    }
}
