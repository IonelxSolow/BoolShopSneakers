import { useGlobalContext } from "../../context/GlobalContext";
import { act, useEffect, useState } from "react";

export default function BrandFilter({
  activeBrand,
  handleFilterChange,
  activeKeys,
}) {
  const { sneakers } = useGlobalContext();
  const [isBrandOpen, setIsBrandOpen] = useState(false);

  useEffect(() => {
    if (activeKeys.brand) {
      setIsBrandOpen(true);
    } else {
      setIsBrandOpen(false);
    }
  }, [activeKeys]);

  return (
    <>
      <div
        className="filter-items d-flex justify-content-between"
        onClick={() => setIsBrandOpen(!isBrandOpen)}
      >
        brand{" "}
        {isBrandOpen ? (
          <i className="bi bi-chevron-up"></i>
        ) : (
          <i className="bi bi-chevron-down"></i>
        )}
      </div>
      {isBrandOpen && (
        <ul>
          {(() => {
            const duplicateBrands = [];
            return sneakers.result.map((sneaker, index) => {
              if (duplicateBrands.includes(sneaker.brand)) return null;
              duplicateBrands.push(sneaker.brand);
              return (
                <li
                  onClick={() => {
                    handleFilterChange("brand", sneaker.brand);
                  }}
                  key={sneaker.id}
                  className={
                    activeBrand.toLowerCase() === sneaker.brand.toLowerCase() ? "active-filter ps-2" : ""
                  }
                >
                  {sneaker.brand}
                </li>
              );
            });
          })()}
        </ul>
      )}
    </>
  );
}
