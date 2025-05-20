import { Link } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { useWishlist } from "../../context/WhishlistContext";

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
  addToWishList,
  activeIndex,
  handleSizeClick,
}) {
  const [showToast, setShowToast] = useState(false);
  const [showToastWish, setShowToastWish] = useState(false);
  const [showErrorToast, setShowErrorToast] = useState(false);
  const { wishlist, removeFromWishlist } = useWishlist();

  const mainSku = product.result.variant_sku.split(",")[0];
  const variantSku = product.result.variant_sku.split(",")[1];

  console.log(wishlist);

  // Check if the current product variant is in the wishlist
  const isInWishlist = wishlist.some(
    (item) =>
      item.sku ===
      (variant === 0
        ? product.result.variant_sku.split(",")[0]
        : product.result.variant_sku.split(",")[1])
  );

  function handleAddToCart() {
    if (activeIndex === null || activeIndex === undefined) {
      setShowErrorToast(true);
      setTimeout(() => setShowErrorToast(false), 5000);
      return;
    }
    addToCart();
    setShowToast(true);
    setTimeout(() => setShowToast(false), 5000);
  }

  function handleAddToWishList(sku) {
    if (isInWishlist) {
      removeFromWishlist(sku);
    } else {
      addToWishList();
      setShowToastWish(true);
      setTimeout(() => setShowToastWish(false), 4000);
    }
  }

  useEffect(() => {
    // Get current SKU based on variant
    const currentSku = variant === 0 ? mainSku : variantSku;

    // Check if item exists in wishlist
    const exists = wishlist.some((item) => item.sku === currentSku);

    // Log for debugging
    console.log("Wishlist check:", { currentSku, exists, wishlist });
  }, [variant, mainSku, variantSku, wishlist]);

  return (
    <>
      <div className="col-12 col-xxl-3 order-3 d-flex">
        <div className="d-flex flex-column detailsContainer justify-content-between">
          <div className="d-flex justify-content-between align-items-center">
            <h1 className="fw-bold text-uppercase mb-0">
              {product.result.name}
            </h1>
            <button
              className="btn fs-5"
              onClick={() => {
                handleAddToWishList(variant === 0 ? mainSku : variantSku);
              }}
            >
              <i
                className={`bi ${
                  isInWishlist ? "bi-heart-fill text-danger" : "bi-heart"
                }`}
              ></i>
            </button>
          </div>

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
            Timeless Style. Everyday Comfort. Step into a legend with the Nike
            Air Force 1 Low an icon that blends classic basketball heritage with
            modern streetwear appeal.
          </p>

          <button
            onClick={handleAddToCart}
            className="btn btn-main-light rounded-4 fs-4 my-3"
          >
            Add to Cart
          </button>

          {showToast && (
            <div
              style={{
                position: "fixed",
                bottom: 40,
                right: 40,
                background: "#fff",
                borderRadius: 12,
                boxShadow: "0 2px 16px rgba(0,0,0,0.12)",
                padding: "24px 32px",
                display: "flex",
                alignItems: "center",
                zIndex: 9999,
                minWidth: 320,
                border: "1px solid #e0e0e0",
              }}
            >
              <span
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: 32,
                  height: 32,
                  background: "#4caf50",
                  borderRadius: "50%",
                  color: "#fff",
                  fontSize: 20,
                  marginRight: 16,
                }}
              >
                ✓
              </span>
              <span style={{ fontSize: 22, color: "#757575" }}>
                Prodotto aggiunto al carrello!
              </span>
            </div>
          )}
          {showErrorToast && (
            <div
              style={{
                position: "fixed",
                bottom: 40,
                right: 40,
                background: "#fff",
                borderRadius: 12,
                boxShadow: "0 2px 16px rgba(255,0,0,0.12)",
                padding: "24px 32px",
                display: "flex",
                alignItems: "center",
                zIndex: 9999,
                minWidth: 320,
                border: "1px solid #e57373",
              }}
            >
              <span
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: 32,
                  height: 32,
                  background: "#e53935",
                  borderRadius: "50%",
                  color: "#fff",
                  fontSize: 20,
                  marginRight: 16,
                }}
              >
                !
              </span>
              <span style={{ fontSize: 22, color: "#e53935" }}>
                Seleziona una taglia
              </span>
            </div>
          )}
          {showToastWish && (
            <div
              style={{
                position: "fixed",
                bottom: 40,
                right: 40,
                background: "#fff",
                borderRadius: 12,
                boxShadow: "0 2px 16px rgba(0,0,0,0.12)",
                padding: "24px 32px",
                display: "flex",
                alignItems: "center",
                zIndex: 9999,
                minWidth: 320,
                border: "1px solid #e0e0e0",
              }}
            >
              <span
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: 32,
                  height: 32,
                  background: "#e53935",
                  borderRadius: "50%",
                  color: "#fff",
                  fontSize: 20,
                  marginRight: 16,
                }}
              >
                <i className="bi bi-heart-fill"></i>
              </span>
              <span style={{ fontSize: 22, color: "#757575" }}>
                Prodotto aggiunto alla wishlist!
              </span>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
