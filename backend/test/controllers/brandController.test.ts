import { Request, Response } from 'express';
import * as brandController from '../../src/controllers/brandController';
import BrandService from '../../src/services/BrandService';
import { CustomException } from '../utils/CustomException';

import { getBrands } from '../../src/controllers/brandController';


// Mocking the BrandService methods
jest.mock('../../src/services/BrandService');
const MockBrandService = BrandService as jest.MockedClass<typeof BrandService>;

describe('BrandController', () => {
    let req: Partial<Request>;
    let res: Partial<Response>;

    beforeEach(() => {
        req = {
            params: {
                id: 'valid-id',
                productId: 'valid-product-id',
            },
        } as Partial<Request>;

        res = {
            json: jest.fn(),
            status: jest.fn().mockReturnThis(),
            send: jest.fn(),
        } as Partial<Response>;
    });

    afterEach(() => {
        jest.clearAllMocks();
    })

    describe('getBrands', () => {
        it('should return all brands when found', async () => {
            const mockBrand = { id: 'valid-id', name: 'Brand A' };
            MockBrandService.prototype.getBrands.mockResolvedValueOnce(mockBrand as never);

            await brandController.getBrands(req as Request, res as Response);

            expect(res.json).toHaveBeenCalledWith(mockBrand);
        });


        it('should handle server error', async () => {
            const mockError = new Error('Internal Server Error');
            MockBrandService.prototype.getBrands.mockRejectedValueOnce(mockError as never);

            await brandController.getBrands(req as Request, res as Response);

            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith({ message: mockError.message });
        });
    });

    describe('getBrandById', () => {
        it('should return brand when found', async () => {
            const mockBrand = { id: 'valid-id', name: 'Brand A' };
            MockBrandService.prototype.getBrandById.mockResolvedValueOnce(mockBrand as any);

            await brandController.getBrandById(req as Request, res as Response);

            expect(res.json).toHaveBeenCalledWith(mockBrand);
        });

        it('should return 404 if brand not found', async () => {
            MockBrandService.prototype.getBrandById.mockResolvedValueOnce(null);

            await brandController.getBrandById(req as Request, res as Response);

            expect(res.status).toHaveBeenCalledWith(404);
            expect(res.json).toHaveBeenCalledWith({ message: 'Brand not found.' });
        });

        it('should handle server error', async () => {
            const mockError = new Error('Internal Server Error');
            MockBrandService.prototype.getBrandById.mockRejectedValueOnce(mockError);

            await brandController.getBrandById(req as Request, res as Response);

            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith({ message: mockError.message });
        });
    });

    describe('getProductsByBrandId', () => {
        it('should return product when found', async () => {
            const mockBrand = { id: 'valid-id', name: 'Brand A' };
            MockBrandService.prototype.getProductsByBrandId.mockResolvedValueOnce(mockBrand as any);

            await brandController.getProductsByBrandId(req as Request, res as Response);

            expect(res.json).toHaveBeenCalledWith(mockBrand);
        });

        it('should return 404 if brand not found', async () => {
            MockBrandService.prototype.getProductsByBrandId.mockResolvedValueOnce(null);

            await brandController.getProductsByBrandId(req as Request, res as Response);

            expect(res.status).toHaveBeenCalledWith(404);
            expect(res.json).toHaveBeenCalledWith({ message: 'Brand not found.' });
        });

        it('should handle server error', async () => {
            const mockError = new Error('Internal Server Error');
            MockBrandService.prototype.getProductsByBrandId.mockRejectedValueOnce(mockError);

            await brandController.getProductsByBrandId(req as Request, res as Response);

            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith({ message: mockError.message });
        });
    });

    describe('getStoresByBrandId', () => {
        it('should return product when found', async () => {
            const mockBrand = { id: 'valid-id', name: 'Brand A' };
            MockBrandService.prototype.getStoresByBrandId.mockResolvedValueOnce(mockBrand as any);

            await brandController.getStoresByBrandId(req as Request, res as Response);

            expect(res.json).toHaveBeenCalledWith(mockBrand);
        });

        it('should return 404 if brand not found', async () => {
            MockBrandService.prototype.getStoresByBrandId.mockResolvedValueOnce(null);

            await brandController.getStoresByBrandId(req as Request, res as Response);

            expect(res.status).toHaveBeenCalledWith(404);
            expect(res.json).toHaveBeenCalledWith({ message: 'Brand not found.' });
        });

        it('should handle server error', async () => {
            const mockError = new Error('Internal Server Error');
            MockBrandService.prototype.getStoresByBrandId.mockRejectedValueOnce(mockError);

            await brandController.getStoresByBrandId(req as Request, res as Response);

            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith({ message: mockError.message });
        });
    });

    describe('getStoresByProductId', () => {
        it('should return product when found', async () => {
            const mockBrand = { id: 'valid-id', name: 'Brand A' };
            MockBrandService.prototype.getStoresByProductId.mockResolvedValueOnce(mockBrand as any);

            await brandController.getStoresByProductId(req as Request, res as Response);

            expect(res.json).toHaveBeenCalledWith(mockBrand);
        });

        it('should return 404 if product not found', async () => {
            MockBrandService.prototype.getStoresByProductId.mockResolvedValueOnce(null);

            await brandController.getStoresByProductId(req as Request, res as Response);

            expect(res.status).toHaveBeenCalledWith(404);
            expect(res.json).toHaveBeenCalledWith({ message: 'Stores not found for product valid-product-id' });
        });

        it('should handle server error', async () => {
            const mockError = new Error('Internal Server Error');
            MockBrandService.prototype.getStoresByProductId.mockRejectedValueOnce(mockError);

            await brandController.getStoresByProductId(req as Request, res as Response);

            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith({ message: mockError.message });
        });
    });

    describe('handleServerError', () => {
        it('should call handleServerError on service failure', async () => {
            MockBrandService.prototype.getStoresByProductId.mockRejectedValueOnce(new Error('Test error'));

            await brandController.getStoresByProductId(req as Request, res as Response);

            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith({ message: 'Test error' });
        });

        it('should call handleServerError on service failure with custom error', async () => {
            MockBrandService.prototype.getStoresByProductId.mockRejectedValueOnce(new CustomException('Test error'));

            await brandController.getStoresByProductId(req as Request, res as Response);

            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith({ message: 'An unknown error occurred' });
        });
    });
});
