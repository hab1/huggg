import { Type, Static } from '@sinclair/typebox';

// Define the schema for the provided JSON object
const ProductSchema = Type.Object({
    id: Type.String({ format: 'uuid' }),
    website: Type.Optional(Type.String()),
    created_at: Type.String({ format: 'date-time' }),
    updated_at: Type.String({ format: 'date-time' }),
    brand_id: Type.String({ format: 'uuid' }),
    description: Type.String(),
    campaign: Type.Union([Type.Null(), Type.String()]),
    label: Type.String(),
    internal_name: Type.String(),
    integration: Type.String(),
    price: Type.String(),
    over_18_offer: Type.Number(),
    redemption_instructions: Type.String(),
    image: Type.String(),
    subtitle: Type.String(),
    weight: Type.Number(),
    recipient_description: Type.String(),
    tag_group_id: Type.String(),
    tag_id: Type.String(),
    open_graph_image: Type.String(),
    active: Type.Number(),
    on_app: Type.Number(),
    on_imessage: Type.Number(),
    handling_fee: Type.Number(),
    sale_price: Type.Number(),
    huggg_tag: Type.Union([Type.Null(), Type.String()]),
    vat_voucher_type: Type.String(),
    vat: Type.Union([Type.Null(), Type.Number()]),
    brand_name: Type.String(),
    brand_weight: Type.Number(),
    image_url: Type.Union([Type.Null(), Type.String({ format: 'uri' })]),
    claim_image: Type.String(),
    claim_image_url: Type.Union([Type.String({ format: 'uri' }), Type.Null()]),
    imessage_image: Type.String(),
    imessage_image_url: Type.Union([Type.Null(), Type.String({ format: 'uri' })]),
    open_graph_image_url: Type.String({ format: 'uri' }),
    pivot: Type.Optional(Type.Object({
        brand_id: Type.String({ format: 'uuid' }),
        price_id: Type.String({ format: 'uuid' }),
    }))
});

// Define the TypeScript type for the schema
type ProductType = Static<typeof ProductSchema>;

// Export the schema and type
export { ProductSchema, ProductType };