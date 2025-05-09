export default function SearchBar({ toggleSearch }) {
  return (
    <form className="d-flex w-100" role="search">
      <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
      <button className="btn" style={{ backgroundColor: "var(--bs-secondary)", color: "white" }} type="close" onClick={toggleSearch}>
        <i className="d-flex bi bi-x">
        </i>
      </button>
    </form>
  );
}