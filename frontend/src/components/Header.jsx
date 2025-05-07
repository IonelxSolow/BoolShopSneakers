
export default function Header() {

    return (
        <>
            <header className="d-flex justify-content-center">
                <nav className="navbar custom-header py-3 px-4 bg-light mb-4 w-100">
                    <div class="container-fluid d-flex justify-content-between align-items-center">
                        <div className="row row-cols-1 row-cols-md-3 g-0 w-100">
                            <div class="d-flex align-items-center gap-4">
                                <a href="#" class="nav-link">New Drops 🔥</a>
                                <a href="#" class="nav-link">Men ▼</a>
                                <a href="#" class="nav-link">Women ▼</a>
                            </div>
                            <a class="navbar-brand mx-auto align-middle text-center" href="#">KICKS</a>
                            <div class="d-flex justify-content-end align-items-center gap-3">
                                <a href="#" class="nav-link"><i class="bi bi-search"></i></a>
                                <a href="#" class="nav-link"><i class="bi bi-person"></i></a>
                                <a href="#" class="nav-link icon-btn">0</a>
                            </div>
                        </div>
                    </div>
                </nav>
            </header>
        </>
    )
}





