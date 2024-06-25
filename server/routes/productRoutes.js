import express from "express";
import Product from "../models/Product.js";

const router = express.Router();

const getProducts = async (req, res) => {
  const products = await Product.find({});
  res.status(201).json({
    products,
    pagination: {},
  });
};

router.route('/').get(getProducts);

export default router;