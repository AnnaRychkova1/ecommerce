import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { addCart } from "../redux/action";
import css from "./ProductCard.module.css";
import Carousel from "react-material-ui-carousel";

const ProductCard = ({ product }) => {
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
    <div
      className="productItem card text-center h-100"
      onMouseEnter={() => setAutoPlay(true)}
      onMouseLeave={() => setAutoPlay(false)}
    >
      <Link
        className={`text-reset text-decoration-none  ${css.productLink}`}
        to={"/product/" + product.id}
      >
        <div className={css.imageContainer}>
          <Carousel
            animation="slide"
            autoPlay={autoPlay}
            stopAutoPlayOnHover={false}
            interval={1500}
            indicators={false}
            navButtonsAlwaysInvisible={true}
            sx={{ pointerEvents: autoPlay ? "auto" : "none" }}
          >
            {product.images.map((imgSrc, idx) => (
              <img
                key={idx}
                src={imgSrc}
                alt={`${product.name} ${idx + 1}`}
                className={css.productImage}
              />
            ))}
          </Carousel>
        </div>
        <div className="card-body">
          <div className={css.cardTitleBox}>
            <h5 className="card-title">{product.name}</h5>
          </div>
        </div>
      </Link>

      <ul className={`list-group list-group-flush  ${css.myListInline}`}>
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
                {selectedSize || "Select size"}
              </button>

              <ul
                className={`dropdown-menu p-0 m-0 border-0 ${
                  css.myDropdownMenu
                } ${openSize ? "show" : ""}`}
              >
                {product.size.map((size, idx) => (
                  <li key={idx}>
                    <button
                      type="button"
                      className={`dropdown-item  ${css.myDropdownItem} `}
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
                    className={css.colorBox}
                    style={{ backgroundColor: selectedColor }}
                  />
                ) : (
                  "Select color"
                )}
              </button>
              <ul
                className={`dropdown-menu p-0 m-0 border-0 ${
                  css.myDropdownMenu
                } ${openColor ? " show" : ""}`}
              >
                {product.color.map((color, idx) => (
                  <li key={idx}>
                    <button
                      type="button"
                      className={`dropdown-item p-1 d-flex justify-content-center align-items-center rounded-0  ${css.myDropdownItem} `}
                      onClick={() => {
                        setSelectedColor(color);
                        setOpenColor(false);
                      }}
                    >
                      <span
                        className={css.colorBox}
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
