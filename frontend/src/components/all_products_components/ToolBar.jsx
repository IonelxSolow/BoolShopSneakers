import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import BrandFilter from "./BrandFilter";
import SizeFilter from "./SizeFilter";
import PriceFilter from "./PriceFilter";
import ColorFilter from "./ColorFilter";
import TagFilter from "./TagFilter";
import PromoFilter from "./PromoFilter";
export default function ToolBar({ filters, setFilters, isHidden }) {
  //variable to handle active onClick
  const [activeBrand, setActiveBrand] = useState("");
  const [activeSize, setActiveSize] = useState("");
  const [activeColor, setActiveColor] = useState("");
  const [activePrice, setActivePrice] = useState("");
  const [activeTags, setActiveTags] = useState("");
  const [activePromo, setActivePromo] = useState("");
  const [activeKeys, setActiveKeys] = useState([]);
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const currentParams = Object.fromEntries([...searchParams]);

    setActiveBrand(currentParams.brand || "");
    setActiveSize(currentParams.size || "");
    setActiveColor(currentParams.color || "");
    setActivePrice(currentParams.price || "");
    setActiveTags(currentParams.tags || "");
    setActivePromo(currentParams.onsale === "true");
    setActiveKeys(currentParams);
  }, [searchParams]);

  // to handle the filter toggle
  const handleFilterChange = (key, value) => {
    setFilters((prev) => {
      const newValue = prev[key] === value ? "" : value;

      const updated = {
        ...prev,
        [key]: newValue,
        // reset search
      };

      return updated;
    });

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
      case "tags":
        setActiveTags((prev) => (prev === value ? "" : value));
        break;
      case "onsale":
        setActivePromo((prev) => !prev);
        break;
      default:
        break;
    }
  };
  function handleResetFilters() {
    setFilters({
      brand: "",
      size: "",
      color: "",
      price: "",
      name: "",
      tags: "",
      onsale: false,
    });
  }

  return (
    <>
      <div
        className={isHidden ? "d-none" : "tool-bar col-12 col-md-4 col-lg-2"}
      >
        <div className="filters-list">
          {filters.brand === "" &&
          filters.size === "" &&
          filters.color === "" &&
          filters.price === "" &&
          filters.tags === "" &&
          filters.onsale === false ? (
            <></>
          ) : (
            <div className="filter-toggle" onClick={handleResetFilters}>
              Reset filters
            </div>
          )}
          <BrandFilter
            activeBrand={activeBrand}
            handleFilterChange={handleFilterChange}
            activeKeys={activeKeys}
          />
          <SizeFilter
            activeSize={activeSize}
            handleFilterChange={handleFilterChange}
            activeKeys={activeKeys}
          />
          <ColorFilter
            activeColor={activeColor}
            handleFilterChange={handleFilterChange}
            activeKeys={activeKeys}
          />
          <PriceFilter
            activePrice={activePrice}
            handleFilterChange={handleFilterChange}
            activeKeys={activeKeys}
          />
          <TagFilter
            activeTags={activeTags}
            handleFilterChange={handleFilterChange}
            activeKeys={activeKeys}
          />
          <PromoFilter
            activePromo={activePromo}
            setFilters={setFilters}
            setActivePromo={setActivePromo}
            activeKeys={activeKeys}
            filters={filters}
          />
        </div>
      </div>
    </>
  );
}
