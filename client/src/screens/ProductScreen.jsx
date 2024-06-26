import "./ProductScreen.css";
import ProductCard from "../components/ProductCard";
import Pagination from "../components/Pagination";
import { useEffect, useState } from "react";
import { getProducts } from "../redux/actions/productActions";
import { useSelector, useDispatch } from "react-redux";

const ProductScreen = () => {
  const { loading, error, products, pagination, favoritesToggled } =
    useSelector((state) => state.product);
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    dispatch(getProducts(currentPage));
  }, [dispatch, currentPage]);

  const onPageChange = (page) => {
    if (page > 0 && page <= pagination.totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <section id="sr-product-screen">
      <div className="sr-product-screen-grid">
        <div className="sr-product-screen-left-header">
          <h1>Shop</h1>
          <p>Showing {products.length} products</p>
        </div>

        <div className="sr-product-screen-right-header">
          <div className="sort">
            <p>Sort by: </p>
            <select name="" id="">
              <option value="all-products" default>
                All Products
              </option>
              <option value="price-asc">Price: Lowest to Highest</option>
              <option value="price-desc">Price: Highest to Lowest</option>
              <option value="newest">Newest</option>
            </select>
          </div>
          {!favoritesToggled && (
            <Pagination
              currentPage={currentPage}
              totalPages={pagination.totalPages}
              onPageChange={onPageChange}
            />
          )}
        </div>

        <div className="sr-product-screen-filter">
          <p className="filter-heading">Filter by:</p>
          <button className="filter-subheading">Cutting Boards</button>
          <button className="filter-subheading">Coasters</button>
          <button className="filter-subheading">Puzzles</button>
        </div>

        <div className="sr-product-screen-products">
          <div className="sr-product-screen-products-grid">
            {products.map((product) => (
              <ProductCard
                key={product._id}
                product={product}
                loading={loading}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductScreen;
