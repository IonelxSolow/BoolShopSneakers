import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { useGlobalContext } from "../context/GlobalContext";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import SuggestedItems from "../components/single_page_components/SuggestedItems";
import Thumbnails from "../components/single_page_components/Thumbnails.Jsx";
import Carousel from "../components/single_page_components/Carousel";
import DetailSection from "../components/single_page_components/DetailSection";

export default function SingleProduct() {
  const { sneakers } = useGlobalContext();
  const { cart, setCart } = useCart();
  const { slug } = useParams();
  const [productId, setProductId] = useState({
    state: "loading",
  });
  const [product, setProduct] = useState({
    state: "loading",
  });
  const [counter, setCounter] = useState(0);
  const [variant, setVariant] = useState(0);
  const [activeIndex, setActiveIndex] = useState(null);
  const [suggestedItems, setSuggestedItems] = useState([]);

  // gets the sneaker id starting from the slug so i can correctly to the fetch call
  function getSneakerId() {
    if (sneakers.state === "success") {
      const sneaker = sneakers.result.find((sneaker) => {
        if (sneaker.name.toLowerCase().replaceAll(" ", "-") === slug) {
          return sneaker;
        }
      });
      if (sneaker) {
        setProductId({
          state: "success",
          id: sneaker.id,
        });
      }
    }
  }

  // fetches the single sneaker with the dynamic id taken from the page url
  function fetchSneaker() {
    fetch(`http://localhost:3000/boolshop/api/v1/shoes/${productId.id}`)
      .then((res) => res.json())
      .then((data) => {
        setProduct({
          state: "success",
          result: data,
        });
      })
      .catch((err) => {
        setProduct({
          state: "error",
          message: err.message,
        });
        console.error(err);
      });
  }

  // each time the sneakers array or slug changes, call the function to get the new dynamic ID
  useEffect(() => {
    getSneakerId();
  }, [sneakers, slug]);

  // only when the id has been successfully stored, then the fetch call to the show route gets called
  useEffect(() => {
    if (productId.state === "success") fetchSneaker();
  }, [productId]);

  // used to change the activeIndex of the size selection to add style when selected
  function handleSizeClick(index) {
    setActiveIndex(index);
  }

  useEffect(() => {
    if (product.state === "success") {
      fetch(
        `http://localhost:3000/boolshop/api/v1/shoes/search/?tags=${product.result.tags}`
      )
        .then((res) => res.json())
        .then((data) => {
          setSuggestedItems(data);
        })
        .catch((err) => err.message);
    }
  }, [product]);

  // switch case to ensure every situation is handled correctly
  switch (product.state) {
    case "loading":
      return (
        <h1>Loading...{/* Create a loader component to replace this */}</h1>
      );
    case "error":
      return (
        <>
          <h1>Error loading product</h1>
          <p>{product.message}</p>
        </>
      );
    case "success":
      function addToCart() {
        const newItem = {
          name: product.result.brand + " " + product.result.name,
          color: variant === 0 ? colors[0] : colors[1],
          size:
            variant === 0 ? mainSizes[activeIndex] : variantSizes[activeIndex],
          price: product.result.price,
          image: variant === 0 ? images[0] : variantImages[0],
          sku:
            variant === 0
              ? product.result.variant_sku.split(",")[0]
              : product.result.variant_sku.split(",")[1],
          quantity: 1,
          variant_id:
            variant === 0
              ? product.result.variant_ids.split(",")[0]
              : product.result.variant_ids.split(",")[1],
        };

        // check if item already is in cart
        const existingItem = cart.find(
          (cartItem) => cartItem.sku === newItem.sku
        );
        let updatedCart;
        if (existingItem) {
          updatedCart = cart.map((item) =>
            item.sku === newItem.sku
              ? { ...item, quantity: item.quantity + 1 }
              : item
          );
        } else {
          updatedCart = [...cart, newItem];
        }

        setCart(updatedCart);
      }

      // parses the string with an array format into an actual array

      const images = JSON.parse(product.result.image_urls);
      const variantImages = JSON.parse(product.result.variants[1].image_urls);

      const suggestedImages = [];
      suggestedItems.map((item, index) => {
        if (index < 5 && item.name != product.result.name) {
          suggestedImages.push(item.image_urls);
        }
      });

      const suggestedItemsCrop = [];
      suggestedItems.map((item, index) => {
        if (index < 5 && item.name != product.result.name) {
          suggestedItemsCrop.push(item);
        }
      });

      const parsedImages = suggestedImages.map((image) => {
        return JSON.parse(image);
      });

      const colors = [];
      product.result.variants.map((variant) => {
        colors.push(variant.color);
      });

      const mainSizes = JSON.parse(product.result.variants[0].size);
      const variantSizes = JSON.parse(product.result.variants[1].size);
      const colorString = colors.join(", ");

      return (
        <>
          <div className="container single-page mt-4">
            <div className="row mx-1 pt-4">
              <Thumbnails
                variant={variant}
                images={images}
                variantImages={variantImages}
                counter={counter}
                setCounter={setCounter}
              />
              <Carousel
                variant={variant}
                images={images}
                variantImages={variantImages}
                counter={counter}
                setCounter={setCounter}
              />
              <DetailSection
                product={product}
                colorString={colorString}
                colors={colors}
                variant={variant}
                setVariant={setVariant}
                images={images}
                variantImages={variantImages}
                mainSizes={mainSizes}
                variantSizes={variantSizes}
                addToCart={addToCart}
                activeIndex={activeIndex}
                handleSizeClick={handleSizeClick}
              />
            </div>
            <SuggestedItems
              suggestedItemsCrop={suggestedItemsCrop}
              parsedImages={parsedImages}
            />
          </div>
        </>
      );
  }
}
