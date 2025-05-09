import { useGlobalContext } from "../context/GlobalContext"
import { useState } from "react"

export default function AllProducts() {
    const { sneakers } = useGlobalContext()
    const [selectedBrand, setSelectedBrand] = useState('');
    const [selectedPrice, setSelectedPrice] = useState('');
    const [selectedSize, setSelectedSize] = useState('');
    const [selectedColor, setSelectedColor] = useState('');
    const [selectedTag, setSelectedTag] = useState('');
    const [isBrandOpen, setIsBrandOpen] = useState(false);
    const [isPriceOpen, setIsPriceOpen] = useState(false);
    const [isSizeOpen, setIsSizeOpen] = useState(false);
    const [isColorOpen, setIsColorOpen] = useState(false);
    const [isTagOpen, setIsTagOpen] = useState(false);
    return (
        <>
            <section className="all-products">

                <div className="container">
                    <h1>All Sneakers</h1>
                    <div className="container-fluid  d-flex justify-content-between m-auto">
                        <div className="tool-bar col-4">
                            <div className="filters-list">
                                <div className="filter-items" onClick={() => setIsBrandOpen(!isBrandOpen)}>
                                    brand {isBrandOpen ? '▲' : '▼'}
                                </div>
                                {isBrandOpen && (
                                    <ul>
                                        <li>brand 1</li>
                                        <li>brand 2</li>
                                        <li>brand 3</li>
                                        <li>brand 4</li>
                                    </ul>
                                )}
                                <div className="filter-items" onClick={() => setIsSizeOpen(!isSizeOpen)}>
                                    size{isSizeOpen ? '▲' : '▼'}
                                </div>
                                {isSizeOpen && (
                                    <ul>
                                        <li>size-1</li>
                                        <li>size-2</li>
                                        <li>size-3</li>
                                        <li>size-4</li>
                                    </ul>
                                )}
                                <div className="filter-items" onClick={() => setIsColorOpen(!isColorOpen)}>
                                    color {isColorOpen ? '▲' : '▼'}
                                </div>
                                {isColorOpen && (
                                    <ul>
                                        <li>color 1</li>
                                        <li>color 2</li>
                                        <li>color 3</li>
                                        <li>color 4</li>
                                    </ul>
                                )}
                                <div className="filter-items" onClick={() => setIsPriceOpen(!isPriceOpen)}>
                                    price {isPriceOpen ? '▲' : '▼'}
                                </div>
                                {isPriceOpen && (
                                    <ul>
                                        <li>0 - 50$</li>
                                        <li>50 - 100$</li>
                                        <li>100 - 200$</li>
                                        <li>200+$</li>
                                    </ul>
                                )}
                                <div className="filter-items" onClick={() => setIsTagOpen(!isTagOpen)}>
                                    categories {isTagOpen ? '▲' : '▼'}
                                </div>
                                {isTagOpen && (
                                    <ul>
                                        <li>category 1</li>
                                        <li>category 2</li>
                                        <li>category 3</li>
                                        <li>category 4</li>
                                    </ul>
                                )}
                            </div>
                        </div>
                        <div className="products-displayer col-8 row">
                            {
                                sneakers.map((sneaker) => {
                                    return (
                                        <div className="col-4 mb-4" key={sneaker.id}>
                                            <div className="card">
                                                <img className="card-img-top" src="assets/01.webp" alt={sneaker.name} />
                                                <div className="card-body">
                                                    <h4 className="card-title">{sneaker.name}</h4>
                                                    <p className="card-text">{sneaker.description}</p>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}