import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { addCart } from "../redux/action";
import Carousel from "react-material-ui-carousel";

import "../styles/product-card.css";

const ProductCard = ({ productFromAPI }) => {
  const getRandomSubset = (
    arr,
    min = 1,
    max = arr.length,
    chanceEmpty = 0.2
  ) => {
    if (Math.random() < chanceEmpty) return [];
    const count = Math.floor(Math.random() * (max - min + 1)) + min;
    const shuffled = [...arr].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  };

  const getRandomQuantity = (min = 0, max = 15, chanceZero = 0.3) => {
    if (Math.random() < chanceZero) return 0;
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  const availableColors = ["red", "blue", "green", "yellow", "black", "white"];
  const availableSizes = ["XS", "S", "M", "L", "XL", "XXL"];

  const product = {
    ...productFromAPI,
    name: productFromAPI.title || "Unnamed product",
    images: [
      productFromAPI.image,
      `${process.env.PUBLIC_URL}/images/woman-6923510_1280.png`,
      `${process.env.PUBLIC_URL}/images/secondlife-1625903_1280.png`,
    ],
    color:
      productFromAPI.color && productFromAPI.color.length > 0
        ? productFromAPI.color
        : getRandomSubset(availableColors, 1, 3, 0.15),
    size:
      productFromAPI.size && productFromAPI.size.length > 0
        ? productFromAPI.size
        : getRandomSubset(availableSizes, 1, 4, 0.25),
    quantity: getRandomQuantity(0, 15, 0.2),
  };

  const dispatch = useDispatch();
  const [autoPlay, setAutoPlay] = useState(false);

  const [selectedColor, setSelectedColor] = useState(product.color?.[0] || "");
  const [selectedSize, setSelectedSize] = useState(product.size?.[0] || "");

  const [openSize, setOpenSize] = useState(false);
  const [openColor, setOpenColor] = useState(false);

  const sizeDropdownRef = useRef(null);
  const colorDropdownRef = useRef(null);
  useEffect(() => {
    function handleClickOutside(event) {
      if (
        sizeDropdownRef.current &&
        !sizeDropdownRef.current.contains(event.target)
      ) {
        setOpenSize(false);
      }
      if (
        colorDropdownRef.current &&
        !colorDropdownRef.current.contains(event.target)
      ) {
        setOpenColor(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const addProduct = (product) => {
    dispatch(addCart(product));
  };

  return (
    <div className="productItem card text-center h-100">
      <Link
        className={`text-reset text-decoration-none  product-link`}
        to={"/product/" + product.id}
        onMouseEnter={() => setAutoPlay(true)}
        onMouseLeave={() => setAutoPlay(false)}
      >
        <div className="image-container">
          <Carousel
            animation="slide"
            autoPlay={autoPlay}
            stopAutoPlayOnHover={false}
            interval={1500}
            indicators={false}
            navButtonsAlwaysInvisible={true}
            sx={{ pointerEvents: autoPlay ? "auto" : "none", height: "300px" }}
          >
            {product.images.map((imgSrc, idx) => (
              <img
                key={idx}
                src={imgSrc}
                alt={`${product.name} ${idx + 1}`}
                className="product-image"
              />
            ))}
          </Carousel>
        </div>
        <div className="card-body">
          <div className="card-title-box">
            <h5 className="card-title">{product.name}</h5>
          </div>
        </div>
      </Link>

      <ul className="list-group list-group-flush  product-options-list">
        <li className="list-group-item lead h-100 fw-bold m-0 border-0 w-100 shadow ">
          $ {product.price}
        </li>

        <li className="list-group-item p-0 h-100 m-0 border-0 w-100 shadow">
          {product.size?.length > 0 ? (
            <div className="dropdown" ref={sizeDropdownRef}>
              <button
                className="btn transparent dropdown-toggle"
                type="button"
                onClick={() => setOpenSize(!openSize)}
                aria-expanded={openSize}
              >
                <span className="size-box">
                  {selectedSize || "Select size"}
                </span>
              </button>

              <ul
                className={`dropdown-menu p-0 m-0 border-0 dropdown-menu-list
                 ${openSize ? "show" : ""}`}
              >
                {product.size.map((size, idx) => (
                  <li key={idx}>
                    <button
                      type="button"
                      className="dropdown-item p-1 d-flex justify-content-center align-items-center rounded-0 dropdown-menu-item"
                      onClick={() => {
                        setSelectedSize(size);
                        setOpenSize(false);
                      }}
                    >
                      {size}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <div className="text-muted pt-2">One size</div>
          )}
        </li>
        <li className="list-group-item p-0 h-100 m-0 border-0 w-100 shadow">
          {product.color?.length > 0 ? (
            <div className="dropdown" ref={colorDropdownRef}>
              <button
                className="btn transparent dropdown-toggle"
                type="button"
                onClick={() => setOpenColor(!openColor)}
                aria-expanded={openColor}
              >
                {selectedColor ? (
                  <span
                    className="color-box"
                    style={{ backgroundColor: selectedColor }}
                  />
                ) : (
                  "Select color"
                )}
              </button>

              <ul
                className={`dropdown-menu p-0 m-0 border-0 dropdown-menu-list
                 ${openColor ? " show" : ""}`}
              >
                {product.color.map((color, idx) => (
                  <li key={idx}>
                    <button
                      type="button"
                      className="dropdown-item p-1 d-flex justify-content-center align-items-center rounded-0 dropdown-menu-item"
                      onClick={() => {
                        setSelectedColor(color);
                        setOpenColor(false);
                      }}
                    >
                      <span
                        className="color-box"
                        style={{ backgroundColor: color }}
                      />
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <div className="text-muted pt-2">One color</div>
          )}
        </li>
      </ul>

      <div className="card-body">
        {product.quantity === 0 ? (
          <button className="btn btn-secondary m-1" disabled>
            Out of Stock
          </button>
        ) : (
          <button
            className="btn btn-dark m-1"
            onClick={() => {
              toast.success("Added to cart");
              addProduct(product);
            }}
          >
            Add to Cart
          </button>
        )}
      </div>
    </div>
  );
};
export default ProductCard;
