import { Link } from "react-router-dom";

export default function DetailSection({
  product,
  colorString,
  colors,
  variant,
  setVariant,
  images,
  variantImages,
  mainSizes,
  variantSizes,
  addToCart,
  activeIndex,
}) {
  return (
    <>
      <div className="col-12 col-xxl-3 order-3 d-flex">
        <div className="d-flex flex-column detailsContainer justify-content-between">
          <h1 className="fw-bold text-uppercase">{product.result.name}</h1>
          <h2>
            <Link
              to={`/all-products?brand=${product.result.brand}`}
              className="text-secondary"
            >
              {product.result.brand}
            </Link>
          </h2>
          {!product.result.discounted_price ||
          parseFloat(product.result.discounted_price) >=
            parseFloat(product.result.price) ? (
            <p className="text-dark">
              {parseFloat(product.result.price).toFixed(2)}&#8364;
            </p>
          ) : (
            <p className="text-danger">
              <span className="text-decoration-line-through text-muted ms-2">
                {parseFloat(product.result.price).toFixed(2)}&#8364;
              </span>{" "}
              {parseFloat(product.result.discounted_price).toFixed(2)}
              &#8364;
            </p>
          )}
          <div className="d-flex justify-content-between mt-4">
            <p>
              <span className="text-secondary">Color:</span>{" "}
              <span>{colorString}</span>
            </p>
            <p>
              <span>{colors.length} </span>
              <span className="text-secondary">colors</span>
            </p>
          </div>

          <div className="d-flex gap-2 circle-thumbs-container align-items-center flex-wrap">
            {" "}
            <div
              className={`circle-thumb-wrapper ${
                variant === 0 && " active-link"
              }`}
            >
              {images && (
                <img
                  onClick={() => setVariant(0)}
                  className="circle-thumb-img"
                  src={`/assets/${images[0]}`}
                  alt=""
                />
              )}
            </div>
            <div>
              <div
                className={`circle-thumb-wrapper ${
                  variant === 1 && " active-link"
                }`}
              >
                {variantImages && (
                  <img
                    onClick={() => setVariant(1)}
                    className="circle-thumb-img"
                    src={`/assets/${variantImages[0]}`}
                    alt=""
                  />
                )}
              </div>
            </div>
          </div>
          <p className="mt-3">
            <span>Select</span> <span className="text-secondary">size:</span>
          </p>
          <div className="sizes-container d-flex gap-3 flex-wrap">
            {variant === 0
              ? mainSizes.map((size, index) => (
                  <div
                    key={index}
                    onClick={() => handleSizeClick(index)}
                    className={`size-badge ${
                      activeIndex === index && "active-link"
                    }`}
                  >
                    {size}
                  </div>
                ))
              : variantSizes.map((size, index) => (
                  <div
                    key={index}
                    onClick={() => handleSizeClick(index)}
                    className={`size-badge ${
                      activeIndex === index && "active-link"
                    }`}
                  >
                    {size}
                  </div>
                ))}
          </div>
          <p className="my-2">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Atque
            iste, quaerat iusto obcaecati suscipit modi veniam ipsam ipsum ex
            provident.
          </p>
          <button
            onClick={() => addToCart()}
            className="btn btn-main-light rounded-4 fs-4 my-3"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </>
  );
}
