import { ProductData } from "./ProductData";
import { StoreData } from "./StoreData";

export interface BrandData {
    id: string;
    created_at: string;
    updated_at: string;
    name: string;
    internal_name: string;
    logo: string;
    colour: string;
    success: string;
    share: string;
    weight: number;
    deleted_at: string | null;
    expiry: number;
    website: string;
    integration_id: number;
    user_id: string;
    email: string;
    vat: number;
    faq: string | null;
    description: string;
    redeem: string;
    location_text: string;
    map_pin_url: string;
    consolidated: number;
    default_location_description_markdown: string;
    products: ProductData[];
    consolidated_products: ProductData[];
    stores: StoreData[];
    logo_url: string;
}