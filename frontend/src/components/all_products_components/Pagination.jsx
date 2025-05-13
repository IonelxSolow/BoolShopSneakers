export default function Pagination({
    totalPages,
    currentPage,
    changePage,
    setIsItemsOpen,
    setItemsPerPage,
    itemsPerPage,
    isItemsOpen }) {
    return (
        <>
            <nav className="mt-4">
                <ul className="custom-pagination">
                    {[...Array(totalPages)].map((_, i) => (
                        <li key={i} className={`custom-page-item ${currentPage === i + 1 ? "active" : ""}`}>
                            <button className="custom-page-link" onClick={() => changePage(i + 1)}>
                                {i + 1}
                            </button>
                        </li>
                    ))}
                </ul>
            </nav>
            {/*component for change the number of elements shown*/}
            <div className="position-relative ms-3 mt-3">
                <div className="filter-toggle" onClick={() => setIsItemsOpen(prev => !prev)}>
                    Show: {itemsPerPage} / page <i className="bi bi-chevron-down"></i>
                </div>
                {isItemsOpen && (
                    <ul className="pagination-dropdown position-absolute bg-white border rounded shadow p-2">
                        {[6, 12, 24, 48].map((num) => (
                            <li key={num} className="py-1 px-2 pagination-option" onClick={() => {
                                setItemsPerPage(num);
                                setIsItemsOpen(false);
                            }}>
                                {num} items per page
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </>
    )
}