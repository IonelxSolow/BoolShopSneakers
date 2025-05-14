import { useState } from "react";
import BrandFilter from "./BrandFilter";
import SizeFilter from "./SizeFilter";
import PriceFilter from "./PriceFilter";
import ColorFilter from "./ColorFilter";
import TagFilter from "./TagFilter";
import { useSearchParams } from "react-router-dom";
import { useEffect } from "react";
export default function ToolBar({ filters, setFilters, isHidden }) {
  //variable to handle active onClick
  const [activeBrand, setActiveBrand] = useState("");
  const [activeSize, setActiveSize] = useState("");
  const [activeColor, setActiveColor] = useState("");
  const [activePrice, setActivePrice] = useState("");
  const [activeTags, setActiveTags] = useState("");
  const [activeKeys, setActiveKeys] = useState([]);
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const currentParams = Object.fromEntries([...searchParams]);
    console.log(currentParams);

    setActiveBrand(currentParams.brand || "");
    setActiveSize(currentParams.size || "");
    setActiveColor(currentParams.color || "");
    setActivePrice(currentParams.price || "");
    setActiveTags(currentParams.tags || "");

    setActiveKeys(currentParams);
  }, [searchParams]);

  // to handle the filter toggle
  const handleFilterChange = (key, value) => {
    setFilters((prev) => {
      const newValue = prev[key] === value ? "" : value;
      console.log(newValue);
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
      default:
        break;
    }
  };

  return (
    <>
      <div className={isHidden ? "d-none" : "tool-bar col-4 col-md-2"}>
        <div className="filters-list">
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
            actviveTags={activeTags}
            handleFilterChange={handleFilterChange}
            activeKeys={activeKeys}
          />
        </div>
      </div>
    </>
  );
}
