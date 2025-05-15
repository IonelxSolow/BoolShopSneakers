import { Link } from "react-router-dom";
export default function ProductDisplayer({ currentItems, filteredSneakers }) {

    return (
        <>
            <div className="products-displayer col-8 col-md-10 row">
                {filteredSneakers.result.error ? (
                    <div className="text-center w-100 my-5">
                        <h4>No sneakers found matching your filters.</h4>
                    </div>
                ) : (
                    currentItems.map((sneaker) => (
                        <div className="col-sm-12 col-md-6 col-lg-4 mb-4" key={sneaker.id}>
                            <Link
                                to={`/product/${sneaker.name.toLowerCase().replaceAll(" ", "-")}`}
                                className="text-decoration-none text-dark"
                            >
                                <div className="card h-100 text-center">
                                    <img
                                        className="card-img-top img-fluid"
                                        src={`/assets/${JSON.parse(sneaker.image_urls)[0]}`}

                                        alt={sneaker.name}
                                    />

                                    <div className="card-body">
                                        <h5 className="card-title">{sneaker.name}</h5>
                                        {!sneaker.discounted_price ||
                                            parseFloat(sneaker.discounted_price) >= parseFloat(sneaker.price) ? (
                                            <p className="text-dark">
                                                {parseFloat(sneaker.price).toFixed(2)}$
                                            </p>
                                        ) : (
                                            <p className="text-danger">
                                                {parseFloat(sneaker.discounted_price).toFixed(2)}$
                                                <span className="text-decoration-line-through text-muted ms-2">
                                                    {parseFloat(sneaker.price).toFixed(2)}$
                                                </span>
                                            </p>
                                        )}
                                    </div>
                                </div>
                            </Link>
                        </div>
                    ))
                )}
            </div>
        </>
    )
}