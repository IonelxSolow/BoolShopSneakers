import { useCart } from "../context/CartContext";

export default function Wishlist() {
  const { wishlist, removeItem } = useWishlist();

  return (
    <div className="container wishlist-content d-flex flex-column">
      <h5 className="mt-3 mb-3">Your Wishlist</h5>

      <div className="wishlist-items">
        {wishlist.length > 0 ? (
          wishlist.map((item) => (
            <div
              key={item.sku}
              className="wishlist-item d-flex justify-content-between align-items-center mb-2"
            >
              <div className="d-flex flex-column flex-md-row align-items-start align-items-md-center">
                {/* Cerchietto con immagine */}
                <div
                  className="me-3"
                  style={{
                    width: "50px",
                    height: "50px",
                    borderRadius: "50%",
                    overflow: "hidden",
                    flexShrink: 0,
                  }}
                >
                  <img
                    src={`/assets/${item.image}`}
                    alt={item.name}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                </div>

                <span style={{ width: "150px" }}>{item.name}</span>
              </div>

              <button
                className="btn btn-danger"
                onClick={() => removeItem(item.sku)}
              >
                Remove
              </button>
            </div>
          ))
        ) : (
          <p>Your wishlist is empty.</p>
        )}
      </div>
    </div>
  );
}