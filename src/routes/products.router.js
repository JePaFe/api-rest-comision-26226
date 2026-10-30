import { Router } from "express";

import {
  getProducts,
  getProductById,
  createProduct,
  deleteProduct,
  updateProduct,
} from "../controllers/products.controller.js";

const router = Router();

router.post("/", createProduct);

router.get("/", getProducts);
router.get("/:id", getProductById);

router.put("/:id", updateProduct);

router.delete("/:id", deleteProduct);

export default router;
