import { useState } from "react";
import { useGlobalContext } from "../context/GlobalContext";
import { Link } from "react-router-dom";

export default function Home() {
  const { sneakers } = useGlobalContext();
  //switch displayer in list
  const [isList, setIsList] = useState(false);
  //switch displayer in grid
  const [isGrid, setIsGrid] = useState(true);
  //carousel logic
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 3;
  const totalPages = Math.ceil(sneakers.length / itemsPerPage);
  const currentSneakers = sneakers.slice(
    currentPage * itemsPerPage,
    currentPage * itemsPerPage + itemsPerPage
  );
  function switchDisplay() {
    setIsList(!isList);
    setIsGrid(!isGrid);
  }
  function nextPage() {
    if (currentPage < totalPages - 1) {
      setCurrentPage((prev) => prev + 1);
    }
  }

  function prevPage() {
    if (currentPage > 0) {
      setCurrentPage((prev) => prev - 1);
    }
  }

  console.log(sneakers);

  return (
    <>
      <section className="hero">
        <div className="top-bar border border-black">
          <ul className="d-flex flex-wrap list-unstyled py-4 justify-content-around mb-0">
            <li>
              <a href="">Popular</a>
            </li>
            <i className="bi bi-lightning-charge-fill"></i>
            <li>
              <a href="">Nike</a>
            </li>
            <i className="bi bi-lightning-charge-fill"></i>
            <li>
              <a href="">Jordan</a>
            </li>
          </ul>
        </div>
        <div className="mb-4 bg-light hero-container position-relative">
          <div>
            <img
              src="/hero-force1.webp"
              className="img-fluid"
              alt="hero-force1"
            />
            <button
              className="btn position-absolute btn-lg btn-nike rounded-4"
              type="button"
            >
              Nike
            </button>
          </div>
        </div>
      </section>

      <div className="container home-displayer">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h1 className="fs-4 fs-md-2">New Drops of the Society</h1>
          <button className="btn btn-main-light" onClick={switchDisplay}>
            {isGrid ? (
              <i className="bi bi-list-task"></i>
            ) : (
              <i className="bi bi-grid"></i>
            )}
          </button>
        </div>

        {isGrid && (
          <div>
            <div className="d-flex justify-content-between align-items-center mb-3">
              <button
                className="btn btn-main-light"
                onClick={prevPage}
                disabled={currentPage === 0}
              >
                <i class="bi bi-chevron-left"></i>
              </button>
              <span>
                Pagina {currentPage + 1} di {totalPages}
              </span>
              <button
                className="btn btn-main-light"
                onClick={nextPage}
                disabled={currentPage === totalPages - 1}
              >
                <i class="bi bi-chevron-right"></i>
              </button>
            </div>

            <div className="row g-3">
              {currentSneakers.map((sneaker) => (
                <div className="col-12 col-md-4" key={sneaker.id}>
                  <Link
                    to={`/product/${sneaker.name
                      .toLowerCase()
                      .replaceAll(" ", "-")}`}
                    className="text-decoration-none text-dark"
                  >
                    <div className="card h-100 text-center">
                      <img
                        className="card-img-top img-fluid"
                        src="/assets/01.webp"
                        alt={sneaker.name}
                      />
                      <div className="card-body">
                        <h5 className="card-title">{sneaker.name}</h5>
                        {!sneaker.discounted_price ||
                        parseFloat(sneaker.discounted_price) >=
                          parseFloat(sneaker.price) ? (
                          <p className="text-dark">
                            {parseFloat(sneaker.price).toFixed(2)}$
                          </p>
                        ) : (
                          <p className="text-danger">
                            {parseFloat(sneaker.discounted_price).toFixed(2)}$
                            <span className="text-decoration-line-through text-muted ms-2">
                              {parseFloat(sneaker.price).toFixed(2)}$
                            </span>
                          </p>
                        )}
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        )}

        {isList && (
          <div className="list-group">
            {sneakers.map((sneaker) => (
              <div className="list-group-item mb-3" key={sneaker.id}>
                <div className="d-flex flex-column flex-md-row">
                  <img
                    src="/assets/01.webp"
                    alt="Sneaker"
                    width="100%"
                    className="me-md-3 mb-3 mb-md-0"
                    style={{ maxWidth: "150px" }}
                  />
                  <div>
                    <h4 className="mb-2">{sneaker.name}</h4>
                    <p>{sneaker.description}</p>
                    {!sneaker.discounted_price ||
                    parseFloat(sneaker.discounted_price) >=
                      parseFloat(sneaker.price) ? (
                      <p className="mb-0">Price: {sneaker.price}$</p>
                    ) : (
                      <>
                        <p className="mb-0">Price: {sneaker.price}$</p>
                        <p>
                          Discounted:{" "}
                          {parseFloat(sneaker.discounted_price).toFixed(2)}$
                        </p>
                      </>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
