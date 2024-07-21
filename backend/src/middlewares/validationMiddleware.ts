import { Request, Response, NextFunction } from 'express';
import { param, validationResult } from 'express-validator';

/**
 * Middleware array for validating `id` and `productId` parameters in the route.
 * 
 * This middleware array performs the following checks:
 * - Validates the `id` parameter if it exists and ensures it is in UUID format.
 * - Validates the `productId` parameter if it exists and ensures it is in UUID format.
 * - Checks for validation errors and returns a 400 response with the errors if any validation fails.
 */
export const validateId = [
    // Check 'id' parameter in the route
    param('id').optional().isUUID().withMessage('Invalid ID format'),
    // Check 'productId' parameter in the route if it exists
    param('productId').optional().isUUID().withMessage('Invalid product ID format'),
    (req: Request, res: Response, next: NextFunction) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];