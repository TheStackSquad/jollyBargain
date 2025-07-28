// backend/routes/productRoutes.js

import express from "express";
import {
  authenticate,
  requireAdmin,
  requirePermission,
} from "../middleware/auth.js";
import * as productController from "../controllers/productController.js";
import { upload } from "../backendUtils/uploadHandler.js";

const router = express.Router();

router.get("/", productController.getProducts);

router.get("/:id", productController.getProductById);

router.post(
  "/",
  authenticate,
  requireAdmin,
  requirePermission("manage_products"),
  upload.array("images", 5),
  productController.createProduct,
);

router.put(
  "/:id",
  authenticate,
  requireAdmin,
  requirePermission("manage_products"),
  upload.array("images", 5),
  productController.updateProduct,
);

router.delete(
  "/:id",
  authenticate,
  requireAdmin,
  requirePermission("manage_products"),
  productController.deleteProduct,
);

export default router;
