import { useState } from "react";

export default function TagFilter() {
    const [isTagOpen, setIsTagOpen] = useState(false);

    return (
        <>
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
        </>
    )
}