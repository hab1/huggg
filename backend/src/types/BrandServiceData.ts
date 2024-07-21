import { Type, Static } from '@sinclair/typebox';
import { BrandApiSchema, ProductSchema, StoreSchema } from '.';

// Extend the base schema and modify just one field
const BrandServiceDataSchema = Type.Object({
    data: Type.Array(BrandApiSchema),
    embedded: Type.Object({
        stores: Type.Array(StoreSchema),
        products: Type.Array(ProductSchema)
    })
});

// Define the TypeScript type for the schema
type BrandServiceDataType = Static<typeof BrandServiceDataSchema>;

// Export the schema and type
export { BrandServiceDataSchema, BrandServiceDataType };