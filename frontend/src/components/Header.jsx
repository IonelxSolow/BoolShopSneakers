import { useState, useEffect } from "react"
import { NavLink } from "react-router-dom"

export default function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false)

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth > 768) {
                setIsMenuOpen(false);
            }
        };

        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    return (
        <>
            <header>
                <nav className="navbar custom-header py-3">
                    <div className="container d-flex justify-content-between align-items-center">
                        <button className="burger-menu d-md-none" onClick={toggleMenu}>
                            <i className="bi bi-list"></i>
                        </button>
                        <div className={`menu-list d-md-flex ${isMenuOpen ? "open" : "d-none"}`}>
                            <div className="d-flex flex-column flex-md-row gap-3">
                                <NavLink to="/men" className="nav-link" onClick={() => setIsMenuOpen(false)}>
                                    Men
                                </NavLink>
                                <NavLink to="/women" className="nav-link" onClick={() => setIsMenuOpen(false)}>
                                    Women
                                </NavLink>
                                <NavLink to="/kids" className="nav-link" onClick={() => setIsMenuOpen(false)}>
                                    Kids
                                </NavLink>
                            </div>
                        </div>
                        <a className="navbar-brand mx-auto text-center fw-bolder" href="#">
                            <h4 className="fw-bolder m-0">KICKSOCIETY</h4>
                        </a>
                        <div className="d-flex justify-content-end align-items-center gap-3">
                            <a href="#" className="nav-link"><i className="bi bi-search"></i></a>
                            <a href="#" className="nav-link"><i className="bi bi-person"></i></a>
                            <a href="#" className="nav-link icon-btn">0</a>
                        </div>
                    </div>
                </nav>
            </header>
        </>
    )
}





