import { useState } from "react";
export default function SizeFilter({ activeSize, handleFilterChange }) {
    const sneakersSizes = [39, 40, 41, 42, 43, 44];
    const [isSizeOpen, setIsSizeOpen] = useState(false);

    return (
        <>
            <div
                className="filter-items d-flex justify-content-between"
                onClick={() => setIsSizeOpen(!isSizeOpen)}
            >
                size {isSizeOpen ? <i className="bi bi-chevron-up"></i> : <i className="bi bi-chevron-down"></i>}
            </div>
            {isSizeOpen && (
                <ul>
                    {

                        sneakersSizes.map((size, index) => {
                            return (
                                <li key={`${index}-${size}`} onClick={() => handleFilterChange("size", size)} className={activeSize === size ? "active-filter ps-2" : ""}  >
                                    {size}
                                </li>
                            );
                        })

                    }
                </ul>
            )}

        </>
    )
}