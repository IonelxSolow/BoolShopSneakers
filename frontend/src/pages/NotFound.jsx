import { Link } from 'react-router-dom';

export default function NotFound() {
    return (
        <div className="container min-vh-100 d-flex align-items-center justify-content-center">
            <div className="text-center">
                <h1 className="display-1 fw-bold">404</h1>
                <h2 className="fs-1 mb-4">Page Not Found</h2>
                <p className="lead mb-4">
                    Sorry, we couldn't find the page you're looking for.
                </p>
                <div className="d-flex justify-content-center gap-3">
                    <Link to="/" className="btn btn-main-light">
                        Back to Home
                    </Link>
                    <Link to="/all-products" className="btn btn-outline-dark">
                        Browse Products
                    </Link>
                </div>
            </div>
        </div>
    );
}