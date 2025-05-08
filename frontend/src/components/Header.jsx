import { useState } from "react"

export default function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false)

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen)
    }

    return (
        <>
            <header>
                <nav className="navbar custom-header py-3 px-2">
                    <div className="container d-flex justify-content-between align-items-center">
                        <button className="burger-menu d-md-none" onClick={toggleMenu}>
                            <i className="bi bi-list"></i>
                        </button>
                        <div className={`menu-list d-md-flex ${isMenuOpen ? "open" : "d-none"}`}>
                            <a href="#" className="nav-link">New Drops 🔥</a>
                            <a href="#" className="nav-link">Men ▼</a>
                            <a href="#" className="nav-link">Women ▼</a>
                        </div>
                        <a className="navbar-brand mx-auto text-center" href="#">KICKS</a>
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





