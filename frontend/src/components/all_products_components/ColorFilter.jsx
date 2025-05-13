import { useState } from "react";

export default function ColorFilter({ activeColor, handleFilterChange }) {
    const sneakersColors = ["red", "blue", "green", "yellow", "black", "white", "gray", "beige", "brown", "pink"];
    const [isColorOpen, setIsColorOpen] = useState(false);

    return (
        <>
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
                                <li key={`${index}-${color}`} onClick={() => handleFilterChange("color", color)} className={activeColor === color ? "active-filter ps-2" : ""}>
                                    {color}
                                </li>
                            );
                        })

                    }
                </ul>
            )}
        </>
    )
}