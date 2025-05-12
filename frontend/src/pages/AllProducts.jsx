import { useGlobalContext } from "../context/GlobalContext";
import { useState } from "react";

export default function AllProducts() {
    const { sneakers } = useGlobalContext();

    const [filters, setFilters] = useState({
        brand: "",
        size: "",
        color: "",
        price: "",
        tag: "",
    });
    const [filteredSneakers, setFilteredSneakers] = useState([]);
    const [isBrandOpen, setIsBrandOpen] = useState(false);
    const [isPriceOpen, setIsPriceOpen] = useState(false);
    const [isSizeOpen, setIsSizeOpen] = useState(false);
    const [isColorOpen, setIsColorOpen] = useState(false);
    const [isTagOpen, setIsTagOpen] = useState(false);

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
                                                {sneakers.result.map((sneaker) => {
                                                    return (
                                                        <li key={sneaker.id} onClick={() => { handleFilterChange("size", sneaker.variant_sizes) }}>
                                                            {sneaker.variant_sizes}
                                                        </li>
                                                    );
                                                })}
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
                                                <li>color 1</li>
                                                <li>color 2</li>
                                                <li>color 3</li>
                                                <li>color 4</li>
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
                                                <li>0 - 50$</li>
                                                <li>50 - 100$</li>
                                                <li>100 - 200$</li>
                                                <li>200+$</li>
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
                                    {sneakers.result.map((sneaker) => {
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
