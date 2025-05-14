import { useState, useEffect } from "react";

export default function TagFilter({
  activeTags,
  handleFilterChange,
  activeKeys,
}) {
  const [isTagOpen, setIsTagOpen] = useState(false);

  useEffect(() => {
    if (activeKeys.tags) {
      setIsTagOpen(true);
    } else {
      setIsTagOpen(false);
    }
  }, [activeKeys]);

  const tags = ["Children", "Running", "Sports", "Man", "Woman"];
  return (
    <>
      <div
        className="filter-items d-flex justify-content-between"
        onClick={() => setIsTagOpen(!isTagOpen)}
      >
        categories{" "}
        {isTagOpen ? (
          <i className="bi bi-chevron-up"></i>
        ) : (
          <i className="bi bi-chevron-down"></i>
        )}
      </div>
      {isTagOpen && (
        <ul>
          {tags.map((tag, index) => (
            <li
              key={index}
              onClick={() => {
                handleFilterChange("tags", tag);
              }}
              className={activeTags === tag ? "active-filter ps-2" : ""}
            >
              {tag}
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
