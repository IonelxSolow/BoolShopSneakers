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
  const [activeKeys, setActiveKeys] = useState([]);
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const currentParams = Object.fromEntries([...searchParams]);
    console.log(currentParams);

    const newActiveKeys = [];
    for (const key in currentParams) {
      const element = currentParams[key];
      console.log(element);
      if (element) {
        newActiveKeys.push(element);
      }
    }
    setActiveKeys(newActiveKeys);
  }, [searchParams]);

  console.log(activeKeys);

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
          />
          <SizeFilter
            activeSize={activeSize}
            handleFilterChange={handleFilterChange}
          />
          <ColorFilter
            activeColor={activeColor}
            handleFilterChange={handleFilterChange}
          />
          <PriceFilter
            activePrice={activePrice}
            handleFilterChange={handleFilterChange}
          />
          <TagFilter />
        </div>
      </div>
    </>
  );
}
