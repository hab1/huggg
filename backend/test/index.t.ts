import request from 'supertest';
import app from '../src';

// Mock the middleware
jest.mock('../src/routes/brandRoutes', () => {
    const express = require('express');
    const router = express.Router();

    router.get('/api/brands/123', (req: any, res: any) => {
        res.status(200).json({ message: 'Mocked Hello, World!' });
    });

    return router;
});
describe('Express App', () => {
    describe('GET /api/brands/:id', () => {
        it('should return brand by id', async () => {
            const response = await request(app).get('/api/brands/123');
            expect(response.status).toBe(200);
            expect(response.body.message).toBe('Hello, World!');
        });
    });
});