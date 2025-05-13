import { useCart } from "../context/CartContext"

export default function IncreaseDecrease({ item }) {

  const { increaseQuantity, decreaseQuantity } = useCart()

  return (

    <div className="d-flex align-items-center">
      <button
        className="btn btn-sm btn-outline-secondary me-2"
        onClick={() => decreaseQuantity(item.sku)}
      >
        -
      </button>
      <span>{item.quantity}</span>
      <button
        className="btn btn-sm btn-outline-secondary ms-2"
        onClick={() => increaseQuantity(item.sku)}
      >
        +
      </button>
    </div>
  )
}