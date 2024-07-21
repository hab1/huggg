import { Type, Static } from '@sinclair/typebox';
import { ProductSchema } from './Product';
import { StoreSchema } from './Store';

// Define the schema for the provided JSON object
const BrandSchema = Type.Object({
    id: Type.String({ format: 'uuid' }),
    created_at: Type.String({ format: 'date-time' }),
    updated_at: Type.String({ format: 'date-time' }),
    name: Type.String(),
    internal_name: Type.String(),
    logo: Type.String({ default: 'placeholder.jpg', minLength: 3 }),
    colour: Type.String(),
    success: Type.String(),
    share: Type.String(),
    weight: Type.Number(),
    deleted_at: Type.Union([Type.Null(), Type.String({ format: 'date-time' })]),
    expiry: Type.Number(),
    website: Type.Union([Type.Null(), Type.String({ format: 'uri' })]),
    integration_id: Type.Number(),
    user_id: Type.String(),
    email: Type.Union([Type.Null(), Type.String({ format: 'email' })]),
    vat: Type.Union([Type.Null(), Type.Number()]),
    faq: Type.Union([Type.Null(), Type.String()]),
    description: Type.String(),
    redeem: Type.Union([Type.Null(), Type.String()]),
    location_text: Type.Union([Type.Null(), Type.String()]),
    map_pin_url: Type.String({ format: 'uri' }),
    consolidated: Type.Number(),
    default_location_description_markdown: Type.String(),
    products: Type.Array(
        Type.Union([
            Type.String({ format: 'uuid' }),
            ProductSchema
        ])
    ),
    consolidated_products: Type.Array(
        Type.Union([
            Type.String({ format: 'uuid' }),
            ProductSchema
        ])
    ),
    stores: Type.Array(
        Type.Union([
            Type.String({ format: 'uuid' }),
            StoreSchema
        ])
    ),
    logo_url: Type.String({ format: 'uri' })
});

// Define the TypeScript type for the schema
type BrandType = Static<typeof BrandSchema>;

// Export the schema and type
export { BrandSchema, BrandType };