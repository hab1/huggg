import { Type, Static } from '@sinclair/typebox';
import { BrandSchema } from './Brand';

// Extend the base schema and modify just one field
const BrandApiSchema = Type.Intersect([
    BrandSchema,
    // Modify only the fields that change
    Type.Object({
        consolidated_products: Type.Array(Type.String({ format: 'uuid' })),
        products: Type.Array(Type.String({ format: 'uuid' })),
        stores: Type.Array(Type.String({ format: 'uuid' })),
    }),
]);

// Define the TypeScript type for the schema
type BrandAPIType = Static<typeof BrandApiSchema>;

// Export the schema and type
export { BrandApiSchema, BrandAPIType };