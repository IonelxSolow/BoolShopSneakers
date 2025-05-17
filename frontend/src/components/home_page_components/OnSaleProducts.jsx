import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { API_URL } from "../../config";

export default function OnSaleProducts() {
  const [onSaleSneakers, setOnSaleSneakers] = useState({
    state: "loading",
  });
  useEffect(() => {
    fetch(`${API_URL}/boolshop/api/v1/shoes/sale`)
      .then((res) => res.json())
      .then((data) => {
        setOnSaleSneakers({
          state: "success",
          result: data,
        });
      })
      .catch((err) => {
        setOnSaleSneakers({
          state: "error",
          message: err.message,
        });
        console.error(err);
      });
  }, []);
  //grid display logic
  const [isOnSaleGrid, setIsOnSaleGrid] = useState(true);
  //carousel logic
  const [onSalePage, setOnSalePage] = useState(0);
  const itemsPerPage = 3;
  switch (onSaleSneakers.state) {
    case "loading":
      return (
        <h1>Loading...{/* Create a loader component to replace this */}</h1>
      );
    case "error":
      return (
        <>
          <h1>Error loading products</h1>
          <p>{onSaleSneakers.message}</p>
        </>
      );
    case "success":
      //switch displayer on click
      function switchOnSaleDisplay() {
        setIsOnSaleGrid(!isOnSaleGrid);
      }

      const onSaleTotalPages = Math.ceil(
        onSaleSneakers.result.length / itemsPerPage
      );
      //move back and forward for popular items
      function nextOnSalePage() {
        if (onSalePage < onSaleTotalPages - 1) {
          setOnSalePage((prev) => prev + 1);
        }
      }
      function prevOnSalePage() {
        if (onSalePage > 0) {
          setOnSalePage((prev) => prev - 1);
        }
      }

      return (
        <>
          <section className="on-sale-displayer container">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h1 className="fs-3 fs-md-2 fw-bold">On Sale Items</h1>
              <button
                className="btn btn-home-light"
                onClick={switchOnSaleDisplay}
              >
                {isOnSaleGrid ? (
                  <i className="bi bi-list-task"></i>
                ) : (
                  <i className="bi bi-grid"></i>
                )}
              </button>
            </div>

            {isOnSaleGrid ? (
              <div>
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <button
                    className="btn btn-home-light"
                    onClick={prevOnSalePage}
                    disabled={onSalePage === 0}
                  >
                    <i className="bi bi-chevron-left"></i>
                  </button>
                  <button
                    className="btn btn-home-light"
                    onClick={nextOnSalePage}
                    disabled={onSalePage === onSaleTotalPages - 1}
                  >
                    <i className="bi bi-chevron-right"></i>
                  </button>
                </div>

                <div className="row g-3">
                  {onSaleSneakers.result
                    .slice(
                      onSalePage * itemsPerPage,
                      onSalePage * itemsPerPage + itemsPerPage
                    )
                    .map((sneaker) => (
                      <div className="col-12 col-md-4" key={sneaker.id}>
                        <div className="card sneaker-card h-100 text-center">
                          <Link
                            to={`/product/${sneaker.name
                              .toLowerCase()
                              .replaceAll(" ", "-")}`}
                            className="text-decoration-none text-dark"
                            style={{ display: "block" }}
                          >
                            <img
                              className=" img-fluid"
                              src={`/assets/${
                                JSON.parse(sneaker.image_urls)[0]
                              }`}
                              alt={sneaker.name}
                            />

                            {!sneaker.discounted_price ||
                            parseFloat(sneaker.discounted_price) >=
                              parseFloat(sneaker.price) ? (
                              <p className="price-tag">
                                {parseFloat(sneaker.price).toFixed(2)}&euro;
                              </p>
                            ) : (
                              <p className="price-tag">
                                {parseFloat(sneaker.discounted_price).toFixed(
                                  2
                                )}
                                &euro;
                                <span className="text-decoration-line-through text-danger ms-2">
                                  {parseFloat(sneaker.price).toFixed(2)}&euro;
                                </span>
                              </p>
                            )}
                          </Link>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            ) : (
              <div className="list-group">
                {onSaleSneakers.result.map((sneaker) => (
                  <Link
                    className="list-group-item list-group-item-action mb-3 rounded shadow-sm hover-shadow"
                    key={sneaker.id}
                    to={`/product/${sneaker.name
                      .toLowerCase()
                      .replaceAll(" ", "-")}`}
                  >
                    <div className="d-flex flex-column flex-md-row align-items-center">
                      <div className="col-md-3 text-center mb-3 mb-md-0">
                        <img
                          src={`/assets/${JSON.parse(sneaker.image_urls)[0]}`}
                          alt={sneaker.name}
                          className="img-fluid rounded"
                          style={{ maxWidth: "200px", height: "auto" }}
                        />
                      </div>
                      <div className="col-md-9">
                        <h4 className="mb-2 fw-bold">{sneaker.name}</h4>
                        <p className="text-muted mb-3">{sneaker.description}</p>
                        <div className="d-flex align-items-center">
                          {!sneaker.discounted_price ||
                          parseFloat(sneaker.discounted_price) >=
                            parseFloat(sneaker.price) ? (
                            <p className="mb-0 fs-5 fw-bold text-primary">
                              {parseFloat(sneaker.price).toFixed(2)}&euro;
                            </p>
                          ) : (
                            <div className="d-flex align-items-center gap-2">
                              <p className="mb-0 fs-5 fw-bold text-primary">
                                {parseFloat(sneaker.discounted_price).toFixed(2)}&euro;
                              </p>
                              <p className="mb-0 text-decoration-line-through text-muted">
                                {parseFloat(sneaker.price).toFixed(2)}&euro;
                              </p>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </section>
        </>
      );
  }
}
