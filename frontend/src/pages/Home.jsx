import { useState } from "react";
import { useGlobalContext } from "../context/GlobalContext";

export default function Home() {
    const { sneakers } = useGlobalContext()
    const [isList, setIsList] = useState(false)
    const [isGrid, setIsGrid] = useState(true)
    function switchDisplay() {
        setIsList(!isList)
        setIsGrid(!isGrid)
    }
    console.log(sneakers)

    return (
        <>
            <section className="hero">
                <div className="top-bar border border-black">
                    <ul className="d-flex flex-wrap list-unstyled py-4 justify-content-around">
                        <li><a href="">Popular</a></li>
                        <i className="bi bi-lightning-charge-fill"></i>
                        <li><a href="">Nike</a></li>
                        <i className="bi bi-lightning-charge-fill"></i>
                        <li><a href="">Jordan</a></li>
                    </ul>
                </div>
                <div className="mb-4 bg-light hero-container position-relative">
                    <div>
                        <img src="/hero-force1.webp" className="img-fluid" alt="hero-force1" />
                        <button className="btn position-absolute btn-lg btn-nike rounded-4" type="button">
                            Nike
                        </button>
                    </div>
                </div>
            </section>

            <div className="container home-displayer">
                <div className="d-flex justify-content-between align-items-center mb-3">
                    <h1 className="fs-4 fs-md-2">New Drops of the Society</h1>
                    <button className="btn btn-outline-secondary" onClick={switchDisplay}>
                        {isGrid ? <i className="bi bi-list-task"></i> : <i className="bi bi-grid"></i>}
                    </button>
                </div>

                {isGrid && (
                    <div className="row g-3">
                        {sneakers.map((sneaker) => (
                            <div className="col-12 col-sm-6 col-md-4 col-lg-3" key={sneaker.id}>
                                <div className="card position-relative h-100">
                                    <img className="card-img-top img-fluid" src="/assets/01.webp" alt="Title" />
                                    <div className="card-body d-flex flex-column justify-content-between">
                                        <h4 className="card-title text-center text-uppercase">{sneaker.name}</h4>
                                        {
                                            !sneaker.discounted_price || parseFloat(sneaker.discounted_price) >= parseFloat(sneaker.price) ? (
                                                <div className="btn btn-price bg-main position-absolute">
                                                    {parseFloat(sneaker.price).toFixed(2)}$
                                                </div>
                                            ) : (
                                                <div className="btn btn-price bg-red position-absolute">
                                                    {parseFloat(sneaker.discounted_price).toFixed(2)}$
                                                    <span> /</span>
                                                    <span className="text-decoration-line-through ms-2 text-white-50">
                                                        {parseFloat(sneaker.price).toFixed(2)}$
                                                    </span>
                                                </div>
                                            )
                                        }
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {isList && (
                    <div className="list-group">
                        {sneakers.map((sneaker) => (
                            <div className="list-group-item mb-3" key={sneaker.id}>
                                <div className="d-flex flex-column flex-md-row">
                                    <img src="/assets/01.webp" alt="Sneaker" width="100%" className="me-md-3 mb-3 mb-md-0" style={{ maxWidth: '150px' }} />
                                    <div>
                                        <h4 className="mb-2">{sneaker.name}</h4>
                                        <p>{sneaker.description}</p>
                                        {
                                            !sneaker.discounted_price || parseFloat(sneaker.discounted_price) >= parseFloat(sneaker.price) ?
                                                (<p className="mb-0">Price: {sneaker.price}$</p>) :
                                                (
                                                    <>
                                                        <p className="mb-0">Price: {sneaker.price}$</p>
                                                        <p>Discounted: {parseFloat(sneaker.discounted_price).toFixed(2)}$</p>
                                                    </>
                                                )

                                        }

                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </>


    );
}