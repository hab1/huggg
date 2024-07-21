import { Type, Static } from '@sinclair/typebox';

// Define the schema for the provided JSON object
const StoreSchema = Type.Object({
    id: Type.String(),
    brand_id: Type.String(),
    latitude: Type.String(),
    latitiude: Type.String(), // Typo: should it be latitude? 
    longitude: Type.String(),
    website: Type.Union([Type.String(), Type.Null()]),
    name: Type.String(),
    description: Type.String(),
    visible: Type.Number(),
    description_markdown: Type.String(),
    image: Type.String(),
    image_url: Type.String(),
});

// Define the TypeScript type for the schema
type StoreType = Static<typeof StoreSchema>;

// Export the schema and type
export { StoreSchema, StoreType };