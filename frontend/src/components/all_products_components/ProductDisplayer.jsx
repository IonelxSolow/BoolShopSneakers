import { Link } from "react-router-dom";
export default function ProductDisplayer({ currentItems, filteredSneakers }) {
  return (
    <>
      <div className="products-displayer  col-8 col-md-10 row">
        {filteredSneakers.result.error ? (
          <div className="text-center w-100 my-5">
            <h4>No sneakers found matching your filters.</h4>
          </div>
        ) : (
          currentItems.map((sneaker) => (
            <div className="col-sm-12 col-md-6 col-lg-4 mb-4" key={sneaker.id}>
              <Link
                to={`/product/${sneaker.name
                  .toLowerCase()
                  .replaceAll(" ", "-")}`}
                className="text-decoration-none text-dark"
              >
                <div className="img-wrapper position-relative">
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
                      if (daysDiff < 10) {
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
                    <p className="text-main-lighttext-main-light">
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
        )}
      </div>
    </>
  );
}
