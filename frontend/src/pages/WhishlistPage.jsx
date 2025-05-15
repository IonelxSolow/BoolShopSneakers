import { useWishlist } from "../context/WhishlistContext";
import { useCart } from "../context/CartContext";

export default function WishlistPage() {
  const { wishlist, removeFromWishlist } = useWishlist();
  const { cart, setCart } = useCart();

  console.log(wishlist);
  console.log(cart);

  function addToCart(sku) {
    const item = wishlist.find((item) => item.sku === sku);
    if (!item) return;

    const alreadyInCart = cart.find((cartItem) => cartItem.sku === sku);

    if (alreadyInCart) {
      // Se vuoi aumentare la quantità:
      setCart(
        cart.map((cartItem) =>
          cartItem.sku === sku
            ? { ...cartItem, quantity: (cartItem.quantity || 1) + 1 }
            : cartItem
        )
      );
    } else {
      setCart([...cart, { ...item, quantity: 1 }]);
    }

    // Rimuovi dalla wishlist solo se vuoi
    removeFromWishlist(item.sku);
  }

  return (
    <div className="cart-page container my-4">
      {/* Carrello */}
      <h1 className="fs-3 fs-md-2 fw-bold">Your Wishlist</h1>
      {wishlist.length > 0 ? (
        <div
          className="cart-items mb-4 container rounded-3 p-4"
          style={{ backgroundColor: "var(--bs-secondary)" }}
        >
          {wishlist.map((item) => (
            <div key={item.id} className="cart-item card mb-2">
              <div className="card-body d-flex align-items-center">
                <div className="flex-grow-1">
                  <div className="d-flex align-items-center">
                    {/*immagine */}
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
                    <h6>{item.name}</h6>
                  </div>
                  <div className="d-flex flex-column flex-md-row align-items-start align-items-md-center">
                    <span className="mb-2 mb-md-0" style={{ width: "150px" }}>
                      Price: {Number(item.price).toFixed(2)} €
                    </span>
                  </div>
                </div>
                <div className="d-flex align-items-center">
                  <button
                    className="btn btn-sm btn-success ms-2"
                    onClick={() => addToCart(item.sku)}
                  >
                    <i className="bi bi-cart-plus"></i>
                  </button>
                  <button
                    className="btn btn-sm btn-danger ms-3"
                    onClick={() => removeFromWishlist(item.sku)}
                  >
                    <i className="bi bi-trash"></i>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div
          className="cart-items mb-4 container rounded-3 p-4 d-flex align-items-center justify-content-between"
          style={{ backgroundColor: "var(--bs-secondary)" }}
        >
          <h3 className="text-light m-0">Your wishlist is empty!</h3>
        </div>
      )}
    </div>
  );
}
