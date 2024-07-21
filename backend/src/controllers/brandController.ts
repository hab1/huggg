import { Request, Response } from 'express';
import BrandService from '../services/BrandService';

// Load brand service
const brandService = new BrandService();

/**
 * Returns all data from API
 * 
 * @param req - The request object
 * @param res - The response object used to send the JSON response.
 * 
 * @returns Entire API Response
 */
export const getBrands = async (req: Request, res: Response) => {
    try {
        const brands: any = await brandService.getBrands();
        res.json(brands);
    } catch (error) {
        handleServerError(res, error);
    }
};

/**
 * Retrieves a brand by its ID.
 * 
 * @param req - The request object, containing the brand ID in the URL parameters.
 * @param res - The response object used to send the JSON response.
 * 
 * @returns A JSON object representing the brand if found, or a 404 status with an error message if not found.
 */
export const getBrandById = async (req: Request, res: Response) => {
    try {
        const brand: any = await brandService.getBrandById(req.params.id);

        if (!brand) {
            return res.status(404).json({ message: 'Brand not found.' });
        }

        res.json(brand);
    } catch (error) {
        handleServerError(res, error);
    }
};

/**
 * Retrieves products by brand ID.
 * 
 * @param req - The request object, containing the brand ID in the URL parameters.
 * @param res - The response object used to send the JSON response.
 * 
 * @returns A JSON object representing the products if found, or a 404 status with an error message if not found.
 */
export const getProductsByBrandId = async (req: Request, res: Response) => {
    try {
        const response: any = await brandService.getProductsByBrandId(req.params.id);

        if (!response) {
            return res.status(404).json({ message: 'Brand not found.' });
        }

        res.json(response);
    } catch (error) {
        handleServerError(res, error);
    }
};

/**
 * Retrieves stores by brand ID.
 * 
 * @param req - The request object, containing the brand ID in the URL parameters.
 * @param res - The response object used to send the JSON response.
 * 
 * @returns A JSON object representing the stores if found, or a 404 status with an error message if not found.
 */
export const getStoresByBrandId = async (req: Request, res: Response) => {
    try {
        const response: any = await brandService.getStoresByBrandId(req.params.id);

        if (!response) {
            return res.status(404).json({ message: 'Brand not found.' });
        }

        res.json(response);
    } catch (error) {
        handleServerError(res, error);
    }
};

/**
 * Retrieves stores by product ID.
 * 
 * @param req - The request object, containing the product ID in the URL parameters.
 * @param res - The response object used to send the JSON response.
 * 
 * @returns A JSON object representing the stores if found, or a 404 status with an error message if not found.
 */
export const getStoresByProductId = async (req: Request, res: Response) => {
    try {
        const productId = req.params.productId;
        const response: any = await brandService.getStoresByProductId(productId);

        if (!response) {
            return res.status(404).json({ message: `Stores not found for product ${productId}` });
        }
        res.json(response);
    } catch (error) {
        handleServerError(res, error);
    }
};

/**
 * Handles server errors by sending an appropriate HTTP response.
 * 
 * @param res - The response object used to send the HTTP response.
 * @param error - The error object to handle.
 */
const handleServerError = (res: Response, error: any) => {
    const statusCode = 500;

    const message = error instanceof Error
        ? error.message
        : 'An unknown error occurred';

    res.status(statusCode).json({ message });
};