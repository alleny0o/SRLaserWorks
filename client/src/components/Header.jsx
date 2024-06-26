import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { toggleFavorites } from "../redux/actions/productActions";
import { MdOutlineFavorite, MdOutlineFavoriteBorder } from "react-icons/md";
import "./Header.css";

const Header = () => {
  const dispatch = useDispatch();
  const { favoritesToggled } = useSelector((state) => state.product);
  const [search, setSearch] = useState(false);
  const [sidebar, setSidebar] = useState(false);

  return (
    <>
      <div className="sr-header">
        <header id="sr-header-page" className="sr-page-home">
          <div className="inner-header">
            <div className="container wide">
              <div className="wrap">
                <div className="header-left">
                  <div className="menu-bar" onClick={(e) => {e.preventDefault(); setSidebar(true)}}>
                    <a href="" className="menu-trigger">
                      <i className="fa-solid fa-bars"></i>
                    </a>
                  </div>
                  <div className="list-inline">
                    <ul>
                      <li>
                        <a href="">
                          <i className="fa-regular fa-user"></i>
                        </a>
                      </li>
                      <li>
                        <a href="">
                          <MdOutlineFavorite />
                          <span className="item-floating">7</span>
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="header-center">
                  <nav className="menu">
                    <ul>
                      <li>
                        <a href="/">
                          <span>Home</span>
                        </a>
                      </li>
                      <li>
                        <a href="">
                          <span>About</span>
                        </a>
                      </li>
                      <li>
                        <a href="/shop">
                          <span>Shop</span>
                        </a>
                      </li>
                    </ul>
                    <ul>
                      <li>
                        <a href="">
                          <span>Specials</span>
                        </a>
                      </li>
                      <li>
                        <a href="">
                          <span>Sale</span>
                        </a>
                      </li>
                    </ul>
                  </nav>
                  <div className="branding">
                    <a href="/">S&R LaserWorks</a>
                  </div>
                </div>
                <div className="header-right">
                  <div className="list-inline">
                    <ul>
                      <li>
                        <a
                          href=""
                          onClick={(e) => {
                            e.preventDefault();
                            setSearch(true);
                          }}
                        >
                          <i className="fas fa-search"></i>
                        </a>
                      </li>
                      <li>
                        <a href="">
                          <span className="item-floating">0</span>
                          <i className="fa-solid fa-cart-shopping"></i>
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className={search ? "search-float active" : "search-float"}>
            <div className="container wide">
              <form className="search-form">
                <i className="fas fa-search search-icon"></i>
                <input
                  type="search"
                  className="search-input"
                  placeholder="Search products..."
                />
                <i className="fa-solid fa-xmark close-icon"></i>
              </form>
            </div>
          </div>
        </header>
        <div
          className={search ? "overlay active" : "overlay"}
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              setSearch(false);
            }
          }}
        ></div>
      </div>
    </>
  );
};

export default Header;
