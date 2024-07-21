import { Router } from 'express';
import { getBrandById, getBrands, getProductsByBrandId, getStoresByBrandId, getStoresByProductId } from '../controllers/brandController';
import { validateId } from '../middlewares';

const router = Router();

// Route to get all brands data
router.get('/brands', getBrands);

// Route to get brand by ID
router.get('/brands/:id', validateId, getBrandById);

// Route to get products by brand ID
router.get('/brands/:id/products', validateId, getProductsByBrandId);

// Route to get stores by brand ID
router.get('/brands/:id/stores', validateId, getStoresByBrandId);

// Route to get stores by product ID
router.get('/products/:productId/stores', validateId, getStoresByProductId);

export default router;