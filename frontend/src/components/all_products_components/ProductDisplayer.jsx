import { useState } from "react";
import { Link } from "react-router-dom";
export default function ProductDisplayer({
  currentItems,
  filteredSneakers,
  isGrid,
}) {

  return (
    <>
      <div className="products-displayer col-8 col-md-8 row">
        {filteredSneakers.result.error ? (
          <div className="text-center w-100 my-5">
            <h4>No sneakers found matching your filters.</h4>
            <img src="/assets/01.webp" width={500} alt="" />
          </div>
        ) : isGrid ? (
          currentItems.map((sneaker) => (
            <div className="col-sm-12 col-md-6 col-lg-4 mb-4" key={sneaker.id}>
              <Link
                to={`/product/${sneaker.name
                  .toLowerCase()
                  .replaceAll(" ", "-")}`}
                className="text-decoration-none text-dark"
              >
                <div className="img-wrapper  position-relative">
                  <div
                    className="badges-container position-absolute top-0 start-0 m-2"
                    style={{ zIndex: 2, display: "flex", gap: "0.25rem" }}
                  >
                    {/* Badge Novità */}
                    {(() => {
                      const updatedAt = new Date(sneaker.updated_at);
                      const now = new Date();
                      const daysDiff =
                        (now - updatedAt) / (1000 * 60 * 60 * 24);
                      if (daysDiff < 8) {
                        return (
                          <span className="badge bg-primary">New Drops</span>
                        );
                      }
                      return null;
                    })()}
                    {/* Badge Sconto */}
                    {sneaker.discounted_price &&
                      parseFloat(sneaker.discounted_price) <
                      parseFloat(sneaker.price) && (
                        <span className="badge bg-danger">On Sale</span>
                      )}
                  </div>
                  <img
                    className="card-img-top img-fluid"
                    src={`/assets/${JSON.parse(sneaker.image_urls)[0]}`}
                    alt={sneaker.name}
                  />
                </div>
                <div className="pt-3 px-3">
                  {sneaker.brand === "New Balance" ? (
                    <h5 className="card-title fw-bold">{sneaker.name}</h5>
                  ) : (
                    <h5 className="card-title fw-bold">
                      {sneaker.brand} {sneaker.name}
                    </h5>
                  )}

                  {!sneaker.discounted_price ||
                    parseFloat(sneaker.discounted_price) >=
                    parseFloat(sneaker.price) ? (
                    <p className="">
                      {parseFloat(sneaker.price).toFixed(2)}&#8364;
                    </p>
                  ) : (
                    <p>
                      {parseFloat(sneaker.discounted_price).toFixed(2)}&#8364;
                      <span className="text-decoration-line-through text-secondary ms-2">
                        {parseFloat(sneaker.price).toFixed(2)}&#8364;
                      </span>
                    </p>
                  )}
                </div>
              </Link>
            </div>
          ))
        ) : (
          <div className="list-group col-8">
            {currentItems.map((sneaker) => (
              <Link
                className="list-card"
                key={sneaker.id}
                to={`/product/${sneaker.name
                  .toLowerCase()
                  .replaceAll(" ", "-")}`}
              >
                <img
                  src={`/assets/${JSON.parse(sneaker.image_urls)[0]}`}
                  className="img-fluid"
                  alt="Sneaker"
                />
                <div className="listcard-content">
                  <h2 className="listcard-title my-3">{sneaker.name}</h2>
                  <div className="price-section">
                    {!sneaker.discounted_price ||
                      parseFloat(sneaker.discounted_price) >=
                      parseFloat(sneaker.price) ? (
                      <span className="text-dark mb-2">
                        {sneaker.price}&euro;
                      </span>
                    ) : (
                      <>
                        <span className="mb-2 pe-1">
                          {parseFloat(sneaker.discounted_price).toFixed(2)}
                          &euro;
                        </span>{" "}
                        <span className="original-price">
                          {sneaker.price}&euro;
                        </span>
                      </>
                    )}
                    <p className="description">{sneaker.brand}</p>
                    <p className="description">{sneaker.description}</p>
                    <div
                      className="badges-container"
                    >
                      {/* Badge Novità */}
                      {(() => {
                        const updatedAt = new Date(sneaker.updated_at);
                        const now = new Date();
                        const daysDiff =
                          (now - updatedAt) / (1000 * 60 * 60 * 24);
                        if (daysDiff < 8) {
                          return (
                            <span className="badge bg-primary me-2">New Drops</span>
                          );
                        }
                        return null;
                      })()}
                      {/* Badge Sconto */}
                      {sneaker.discounted_price &&
                        parseFloat(sneaker.discounted_price) <
                        parseFloat(sneaker.price) && (
                          <span className="badge bg-danger">On Sale</span>
                        )}
                    </div>
                  </div>
                  <div className="d-flex gap-2 mb-3">
                    <span className="badge bg-light text-dark">
                      {sneaker.color}
                    </span>
                    {Array.isArray(sneaker.variants) &&
                      sneaker.variants[0] &&
                      sneaker.variants[0].size
                      ? (() => {
                        try {
                          const sizes = JSON.parse(sneaker.variants[0].size);
                          return Array.isArray(sizes) && sizes.length > 0 ? (
                            <span className="badge bg-light text-dark">
                              {sizes.length} sizes
                            </span>
                          ) : null;
                        } catch {
                          return null;
                        }
                      })()
                      : null}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
