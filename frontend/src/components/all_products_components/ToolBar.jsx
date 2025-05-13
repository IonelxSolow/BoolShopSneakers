import { useState } from "react";
import BrandFilter from "./BrandFilter";
import SizeFilter from "./SizeFilter";
import PriceFilter from "./PriceFilter"
import ColorFilter from "./ColorFilter";
import TagFilter from "./TagFilter";
export default function ToolBar({ filters, setFilters, isHidden }) {
    //variable to handle active onClick
    const [activeBrand, setActiveBrand] = useState("");
    const [activeSize, setActiveSize] = useState("");
    const [activeColor, setActiveColor] = useState("");
    const [activePrice, setActivePrice] = useState("");

    // to handle the filter toggle
    const handleFilterChange = (key, value) => {
        setFilters(() => ({
            ...filters,
            [key]: filters[key] === value ? "" : value, // Toggle value
        }));

        switch (key) {
            case "brand":
                setActiveBrand((prev) => (prev === value ? "" : value));
                break;
            case "size":
                setActiveSize((prev) => (prev === value ? "" : value));
                break;
            case "color":
                setActiveColor((prev) => (prev === value ? "" : value));
                break;
            case "price":
                setActivePrice((prev) => (prev === value ? "" : value));
                break;
            default:
                break;
        }
    };
    return (
        <>
            <div className={isHidden ? "d-none" : "tool-bar col-4 col-md-2"}>
                <div className="filters-list">
                    <BrandFilter activeBrand={activeBrand} handleFilterChange={handleFilterChange} />
                    <SizeFilter activeSize={activeSize} handleFilterChange={handleFilterChange} />
                    <ColorFilter activeColor={activeColor} handleFilterChange={handleFilterChange} />
                    <PriceFilter activePrice={activePrice} handleFilterChange={handleFilterChange} />
                    <TagFilter />
                </div>
            </div>

        </>
    )
}