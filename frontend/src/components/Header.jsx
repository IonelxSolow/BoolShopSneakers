import { useState, useEffect } from "react"

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
                                <a href="#" className="nav-link container">Men</a>
                                <a href="#" className="nav-link container">Women</a>
                                <a href="#" className="nav-link container">Kids</a>
                            </div>
                        </div>
                        <a className="navbar-brand mx-auto text-center fw-bolder" href="#">
                            <h4 className="fw-bold">KICKSOCIETY</h4>
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





