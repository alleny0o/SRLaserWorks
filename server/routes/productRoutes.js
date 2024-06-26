import express from "express";
import Product from "../models/Product.js";

const router = express.Router();

const getProducts = async (req, res) => {
  const page = parseInt(req.params.page);
  const perPage = parseInt(req.params.perPage);

  const products = await Product.find({});

  if (page && perPage) {
    const totalPages = Math.ceil(products.length / perPage);
    const startIndex = (page - 1) * perPage;
    const endIndex = startIndex  + perPage;
    const slicedProducts = products.slice(startIndex, endIndex);
    res.json({products: slicedProducts, pagination: {currentPage: page, totalPages}});
  } else {
    res.json({products, pagination: {}});
  }
};

router.route('/:page/:perPage').get(getProducts);
router.route('/').get(getProducts);

export default router;