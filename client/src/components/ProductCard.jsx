import "./ProductCard.css";
import CardLoader from "./CardLoader";
import { useSelector, useDispatch } from "react-redux";
import { MdOutlineFavorite, MdOutlineFavoriteBorder } from "react-icons/md";
import { removeFromFavorites, addToFavorites } from "../redux/actions/productActions";

const ProductCard = ({ product, loading }) => {

  const { favorites } = useSelector((state) => state.product);
  const dispatch = useDispatch();

  return loading ? (
    <div id="sr-product-loader-card">
      <CardLoader />
    </div>
  ) : (
    <div id="sr-product-card">
      <div className="product-image-container">
        <img src={product.images[0]} alt="Product Image" />
        <div>
          <p>Click to View Item</p>
        </div>
      </div>
      {product.stock < 5 && product.stock > 0 ? (
        <div className="badge yellow">Only {product.stock} left</div>
      ) : product.stock === 0 ? (
        <div className="badge red">Out of stock :(</div>
      ) : (
        <div className="badge green">In stock</div>
      )}

      {product.productIsNew && (
        <div className="new-product-badge">New Product</div>
      )}

      <h1 className="truncate-text">
        {product.brand} {` `} {product.name}
      </h1>

      <p className="truncate-text">{product.subtitle}</p>

      <div className="flex-container">
        <p>{product.category}</p>
        <p>${product.price}</p>
      </div>

      {favorites.includes(product._id) ? (
        <button className="favorites" onClick={() => dispatch(removeFromFavorites(product._id))}>
          <MdOutlineFavorite />
        </button>
      ) : (
        <button className="favorites" onClick={() => dispatch(addToFavorites(product._id))}>
          <MdOutlineFavoriteBorder />
        </button>
      )}
    </div>
  );
};

export default ProductCard;
