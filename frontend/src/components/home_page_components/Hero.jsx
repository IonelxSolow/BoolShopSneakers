import { Link } from "react-router-dom";

export default function Hero() {
    return (
        <>
            <section className="hero">
                <div className="top-bar border border-black">
                    <ul className="container d-flex flex-wrap list-unstyled py-4 px-2 justify-content-between mb-0 responsive-font">
                        <li>
                            <Link to="/all-products">sneakers</Link>
                        </li>
                        <i className="bi bi-lightning-charge-fill responsive-font"></i>
                        <li>
                            <Link to="/all-products?brand=Jordan">Jordan</Link>
                        </li>
                        <i className="bi bi-lightning-charge-fill responsive-font"></i>
                        <li>
                            <Link to="/all-products?brand=New+balance">new balance</Link>

                        </li>
                    </ul>
                </div>
                <div className="mb-4 bg-light hero-container position-relative">
                    <div className="container position-absolute bottom-0 start-50 translate-middle-x text-end mb-5">
                        <Link
                            className="btn btn-lg btn-nike rounded-4"
                            type="button"
                            to="/all-products?brand=Nike"
                        >
                            Nike
                        </Link>
                    </div>
                </div>
            </section>

        </>
    )
}