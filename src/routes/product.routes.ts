import { Router } from 'express';
import ProductController from '../controllers/product.controller';
import validationProduct from '../middlewares/product.validation';

const router = Router();

const productController = new ProductController();

router.post(
  '/products',
  validationProduct.validationProductProperties,
  validationProduct.validationProductValues,
  validationProduct.validationProductTypes,
  productController.create,
);
router.get('/products', productController.getAll);

export default router;