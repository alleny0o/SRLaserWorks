import { useSelector, useDispatch } from "react-redux";
import { toggleFavorites } from "../redux/actions/productActions";
import { MdOutlineFavorite, MdOutlineFavoriteBorder } from "react-icons/md";

const Header = () => {
  const dispatch = useDispatch();
  const { favoritesToggled } = useSelector((state) => state.product);

  return (
    <>
      {favoritesToggled ? (
        <div className='icon-button-container' onClick={() => dispatch(toggleFavorites(false))}>
          <MdOutlineFavorite />
        </div>
      ) : (
        <div className='icon-button-container' onClick={() => dispatch(toggleFavorites(true))}>
          <MdOutlineFavoriteBorder />
        </div>
      )}
    </>
  );
};

export default Header;
