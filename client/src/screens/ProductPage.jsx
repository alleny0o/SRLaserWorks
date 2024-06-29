import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getProduct } from "../redux/actions/productActions";
import "./ProductPage.css";

const ProductPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { loading, error, product } = useSelector((state) => state.product);

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 450);
  const imageContainerRef = useRef(null);

  const nextImage = () => {
    if (!isMobile) {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === product.images.length - 1 ? 0 : prevIndex + 1
      );
    }
  };

  const prevImage = () => {
    if (!isMobile) {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === 0 ? product.images.length - 1 : prevIndex - 1
      );
    }
  };

  const goToImage = (index) => {
    if (isMobile) {
    } else {
      setCurrentImageIndex(index);
    }
  };

  useEffect(() => {
    dispatch(getProduct(id));
  }, [dispatch, id]);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 450);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (isMobile && product && imageContainerRef.current) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              const index = parseInt(entry.target.dataset.index, 10);
              setCurrentImageIndex(index);
            }
          });
        },
        { threshold: 0.5 }
      );

      const images = imageContainerRef.current.querySelectorAll('.product-image');
      images.forEach((image) => observer.observe(image));

      return () => observer.disconnect();
    }
  }, [product, isMobile]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!product) return <div>No product data available.</div>;

  return (
    <div className="product-page">
      <div className="product-page__container">
        <nav className="breadcrumb">
          <ul className="breadcrumb__list">
            <li className="breadcrumb__item">
              <a href="/">Home</a>
            </li>
            <li className="breadcrumb__item">
              <a href="/shop">Shop</a>
            </li>
            <li className="breadcrumb__item">
              <a href="#">{product.category}</a>
            </li>
            <li className="breadcrumb__item">
              <a href="#">{product.name}</a>
            </li>
          </ul>
        </nav>

        <div className="product-display">
          <div className="product-images">
            {!isMobile && (
              <div className="thumbnail-images">
                {product.images.map((image, index) => (
                  <div
                    key={index}
                    className={`thumbnail-image ${
                      index === currentImageIndex ? "active" : ""
                    }`}
                    onClick={() => goToImage(index)}
                  >
                    <img src={image} alt={`Thumbnail ${index + 1}`} />
                  </div>
                ))}
              </div>
            )}
            <div className={`main-image ${isMobile ? 'mobile' : ''}`} ref={imageContainerRef}>
              {!isMobile && (
                <button onClick={prevImage} className="carousel-button prev">
                  &lt;
                </button>
              )}
              {product.images.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={`Product ${index + 1}`}
                  className={`product-image ${!isMobile && index === currentImageIndex ? 'active' : ''}`}
                  data-index={index}
                  style={!isMobile ? { display: index === currentImageIndex ? 'block' : 'none' } : {}}
                />
              ))}
              {!isMobile && (
                <button onClick={nextImage} className="carousel-button next">
                  &gt;
                </button>
              )}
            </div>
            {isMobile && (
              <div className="dots-container">
                {product.images.map((_, index) => (
                  <div
                    key={index}
                    className={`dot ${
                      index === currentImageIndex ? "active" : ""
                    }`}
                    onClick={() => goToImage(index)}
                  ></div>
                ))}
              </div>
            )}
          </div>

          <div className="product-details">
            <h1 className="product-name">{product.name}</h1>
            <div className="price-reviews">
              <div className="product-price">
                <span className="price--original">$60</span>
                <span className="price--current">$40</span>
                <span className="price--discount">-20%</span>
                <div className="price__slash"></div>
              </div>
              <div className="review-count">
                <span>{product.rating}</span>
                <span>
                  <i className="fa-solid fa-star"></i>
                </span>
                <span>{product.numberOfReviews} Reviews</span>
              </div>
            </div>
            <div className="line-dash"></div>
            <button className="button--add-to-cart">Add To Cart</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;