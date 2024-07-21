import request from 'supertest';
import express from 'express';
import router from '../../src/routes/brandRoutes'; // Adjust the path as necessary

// Create a new Express app for testing
const app = express();
app.use(express.json());
app.use(router);

// Mock the controller functions
jest.mock('../../src/controllers/brandController', () => ({
    getBrands: jest.fn((req, res) => res.status(200).json({ data: 'all brands' })),
    getBrandById: jest.fn((req, res) => res.status(200).json({ data: `brand ${req.params.id}` })),
    getProductsByBrandId: jest.fn((req, res) => res.status(200).json({ data: `products for brand ${req.params.id}` })),
    getStoresByBrandId: jest.fn((req, res) => res.status(200).json({ data: `stores for brand ${req.params.id}` })),
    getStoresByProductId: jest.fn((req, res) => res.status(200).json({ data: `stores for product ${req.params.productId}` })),
}));

// Mock the middleware
jest.mock('../../src/middlewares', () => ({
    validateId: (req: any, res: any, next: any) => {
        if (req.params.id || req.params.productId) return next();
        return res.status(400).json({ error: 'Invalid ID' });
    },
}));

describe('Brand Router', () => {
    test('GET /brands should return all brands', async () => {
        const response = await request(app).get('/brands');

        expect(response.status).toBe(200);
        expect(response.body).toEqual({ data: 'all brands' });
    });

    test('GET /brands/:id should return brand by ID', async () => {
        const response = await request(app).get('/brands/1');
        expect(response.status).toBe(200);
        expect(response.body).toEqual({ data: 'brand 1' });
    });

    test('GET /brands/:id/products should return products by brand ID', async () => {
        const response = await request(app).get('/brands/1/products');
        expect(response.status).toBe(200);
        expect(response.body).toEqual({ data: 'products for brand 1' });
    });

    test('GET /brands/:id/stores should return stores by brand ID', async () => {
        const response = await request(app).get('/brands/1/stores');
        expect(response.status).toBe(200);
        expect(response.body).toEqual({ data: 'stores for brand 1' });
    });

    test('GET /products/:productId/stores should return stores by product ID', async () => {
        const response = await request(app).get('/products/1/stores');
        expect(response.status).toBe(200);
        expect(response.body).toEqual({ data: 'stores for product 1' });
    });
});
