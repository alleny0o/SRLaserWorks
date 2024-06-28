import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getProduct } from '../redux/actions/productActions';
import './ProductPage.css'

const ProductPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { loading, error, product } = useSelector((state) => state.product);

  useEffect(() => {
    dispatch(getProduct(id));
  }, [dispatch, id]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!product) return <div>No product data available.</div>;

  return (
    <div className="product-page">
      <div className="product-page__container">
        <nav className="breadcrumb">
          <ul className="breadcrumb__list">
            <li className="breadcrumb__item"><a href="/">Home</a></li>
            <li className="breadcrumb__item"><a href="/shop">Shop</a></li>
            <li className="breadcrumb__item"><a href="#">{product.category}</a></li>
            <li className="breadcrumb__item"><a href="#">{product.name}</a></li>
          </ul>
        </nav>

        <div className="product-display">
          <div className="product-images">
            <div className="thumbnail-images">
              {product.images.map((image, index) => (
                <div key={index} className="thumbnail-image">
                  <img src={image} alt={`Thumbnail ${index + 1}`} />
                </div>
              ))}
            </div>
            <div className="main-image">
              <img src={product.images[0]} alt={product.name} />
              <div className="dots-container">
                {product.images.map((_, index) => (
                  <div key={index} className="dot"></div>
                ))}
              </div>
            </div>
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
                <span><i className="fa-solid fa-star"></i></span>
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