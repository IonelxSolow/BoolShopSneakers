import { Link } from "react-router-dom";

export default function SuggestedItems({ suggestedItemsCrop, parsedImages }) {
  return (
    <>
      <h1 className="pt-3 px-3 fw-bold text-uppercase">You might also like:</h1>
      <div className="suggestedItemsContainer d-flex pt-3 pb-4 px-3 gap-4">
        {suggestedItemsCrop.map((sneaker, index) => (
          <div key={sneaker.id} className="suggestedItem">
            <div className="suggestedItemWrapper">
              <Link
                to={`/product/${sneaker.name
                  .toLowerCase()
                  .replaceAll(" ", "-")}`}
              >
                <img
                  className="img-fluid"
                  src={`/assets/${parsedImages[index][0]}`}
                  alt=""
                />
              </Link>
            </div>
            <div className="pt-2">
              <h4 className="fw-bold text-uppercase ">
                <Link
                  to={`/product/${sneaker.name
                    .toLowerCase()
                    .replaceAll(" ", "-")}`}
                >
                  {sneaker.name}
                </Link>
              </h4>
              <h6>
                <Link
                  to={`/all-products?brand=${sneaker.brand}`}
                  className="text-secondary"
                >
                  {sneaker.brand}
                </Link>
              </h6>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
