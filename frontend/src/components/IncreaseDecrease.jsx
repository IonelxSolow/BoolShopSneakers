import { useCart } from "../context/CartContext"

export default function IncreaseDecrease({ item }) {

  const { increaseQuantity, decreaseQuantity } = useCart()

  return (

    <div className="d-flex align-items-center justify-content-start">
      <button
        className="btn btn-sm btn-outline-secondary me-2"
        style={{ width: "24px", height: "24px", padding: "0", display: "flex", alignItems: "center", justifyContent: "center" }}
        onClick={() => decreaseQuantity(item.sku)}
      >
        -
      </button>
      <span className="text-center" style={{ width: "30px" }}>{item.quantity}</span>
      <button
        className="btn btn-sm btn-outline-secondary ms-2"
        style={{ width: "24px", height: "24px", padding: "0", display: "flex", alignItems: "center", justifyContent: "center" }}
        onClick={() => increaseQuantity(item.sku)}
      >
        +
      </button>
    </div>
  )
}