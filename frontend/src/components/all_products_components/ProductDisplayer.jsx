export default function ProductDisplayer({ filteredSneakers }) {

    return (
        <>
            <div className="products-displayer col-8 col-md-10 ps-3 row">
                {filteredSneakers.map((sneaker) => {
                    return (
                        <div className="col-sm-12 col-md-6 col-lg-4 mb-4" key={sneaker.id}>
                            <div className="card">
                                <img
                                    className="card-img-top"
                                    src={`/assets/${JSON.parse(sneaker.image_urls)[0]}`}
                                    alt={sneaker.name}
                                />
                                <div className="card-body">
                                    <h4 className="card-title">{sneaker.name}</h4>
                                    <p className="card-text">{sneaker.description}</p>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </>
    )
}