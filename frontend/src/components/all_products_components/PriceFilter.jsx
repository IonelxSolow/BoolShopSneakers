import { useState, useEffect } from "react";

export default function PriceFilter({
  activePrice,
  handleFilterChange,
  activeKeys,
}) {
  const [isPriceOpen, setIsPriceOpen] = useState(false);
  useEffect(() => {
    if (activeKeys.price) {
      setIsPriceOpen(true);
    }
  }, [activeKeys]);
  return (
    <>
      <div
        className="filter-items d-flex justify-content-between"
        onClick={() => setIsPriceOpen(!isPriceOpen)}
      >
        price{" "}
        {isPriceOpen ? (
          <i className="bi bi-chevron-up"></i>
        ) : (
          <i className="bi bi-chevron-down"></i>
        )}
      </div>
      {isPriceOpen && (
        <ul>
          <li
            value={"50"}
            onClick={(e) => handleFilterChange("price", "50")}
            className={activePrice === "50" ? "active-filter ps-2" : ""}
          >
            50+
          </li>
          <li
            value={"100"}
            onClick={(e) => handleFilterChange("price", "100")}
            className={activePrice === "100" ? "active-filter ps-2" : ""}
          >
            100+
          </li>
          <li
            value={"200"}
            onClick={(e) => handleFilterChange("price", "200")}
            className={activePrice === "200" ? "active-filter ps-2" : ""}
          >
            200+
          </li>
          <li
            value={"300"}
            onClick={(e) => handleFilterChange("price", "300")}
            className={activePrice === "300" ? "active-filter ps-2" : ""}
          >
            300+
          </li>
        </ul>
      )}
    </>
  );
}
