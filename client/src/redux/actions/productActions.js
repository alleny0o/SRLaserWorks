import {
  setLoading,
  setError,
  setProducts,
  setPagination,
} from "../slices/product";
import axios from "axios";

export const getProducts = (page, favoriteToggle) => async (dispatch) => {
  dispatch(setLoading());
  try {
    const { data } = await axios.get("/api/products");
    const { products, pagination } = data;
    dispatch(setProducts(products));
    dispatch(setPagination(pagination));
  } catch (error) {
    dispatch(
      setError(
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
          ? error.message
          : "An unexpected error occured... Please try again later."
      )
    );
  }
};
