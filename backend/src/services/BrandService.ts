import fs from 'fs';
import path from 'path';
import { BrandAPIType, BrandServiceDataType, BrandType, ProductType, StoreType } from '../types';

/**
 * Service class for handling brand-related data and operations.
 * 
 * This service class is responsible for loading brand data from an API, caching brand,
 * product, and store information, and providing methods to retrieve this information
 * as needed.
 */
class BrandService {
    private brandData: BrandServiceDataType;
    private brandsCache: Map<string, BrandType>;
    private productsCache: Map<string, ProductType>;
    private storesCache: Map<string, StoreType>;

    /**
     * Constructor
     */
    constructor() {
        this.brandData = this.loadDataFromApi();

        // Cached dictionaries
        this.brandsCache = new Map();
        this.productsCache = new Map();
        this.storesCache = new Map();
    }

    /**
     * Loads brand data
     * 
     * This method reads the brand example data provided. Update this function
     * if data is loaded from an API source.
     */
    private loadDataFromApi(): any {
        try {
            const brandsFilePath = path.join(__dirname, '../data/brands.json');
            return JSON.parse(fs.readFileSync(brandsFilePath, 'utf8'));
        } catch (error) {
            console.error(error);
            throw new Error('Failed to initialise BrandService.');
        }
    }

    /**
     * Retrieves a store from the cache or returns `null` if the store is not found in the cache.
     * 
     * This method first checks if the store associated with the given `id` is already present
     * in the cache. If a cached store is found, it is returned. If the store is not in the cache,
     * the method returns `null`, indicating that the store needs to be loaded from a data source.
     * 
     * @param id - The unique identifier of the store to retrieve. 
     * @returns The store object if it is found in the cache; otherwise, returns `null` if the store
     * is not found.
     */
    private async getCachedOrLoadStore(id: string): Promise<StoreType | null> {
        const cachedStore = this.storesCache.get(id);
        if (cachedStore) {
            return cachedStore;
        }

        return null;
    }

    /**
     * Retrieves a product from the cache or returns `null` if the product is not found in the cache.
     * 
     * This method first checks if the product with the specified `id` is present in the cache.
     * If the product is found in the cache, it is returned. If not found, the method returns
     * `null`, indicating that the product is not available in the cache.
     * 
     * @param id - The unique identifier of the product to retrieve.
     * @returns The product object if it is found in the cache; otherwise, returns `null` if
     * the product is not found in the cache.
     */
    private async getCachedOrLoadProduct(id: string): Promise<ProductType | null> {
        const cachedProduct = this.productsCache.get(id);
        if (cachedProduct) {
            return cachedProduct;
        }

        return null;
    }

    /**
     * This method returns the `brandData` object, which contains information about brands.
     * 
     * @returns The `brandData` object, which is of type `BrandServiceDataType`.
     */
    getBrands(): BrandServiceDataType {
        return this.brandData;
    }

    /**
     * Retrieves stores by their IDs, using the cache or data source as needed.
     * 
     * This method accepts a single store ID or an array of store IDs and returns an array of
     * `StoreType`.
     * 
     * @param ids - A single store ID or an array of store IDs to retrieve.
     * @returns Array of `StoreType` objects.
     */
    async getStoresById(ids: string[] | string): Promise<StoreType[]> {
        const storeIds = Array.isArray(ids) ? ids : [ids];
        const stores: StoreType[] = this.brandData.embedded.stores;

        const fetchPromises = storeIds.map(async (storeId) => {
            const cachedStore = await this.getCachedOrLoadStore(storeId);
            if (cachedStore) {
                return cachedStore;
            }

            const store = stores.find(store => store.id === storeId);
            if (store) {
                this.storesCache.set(storeId, store);
                return store;
            }

            return null;
        });

        return Promise.all(fetchPromises).then(results => results.filter(result => result !== null)) as Promise<StoreType[]>;
    }

    /**
     * Retrieves products by their IDs, using the cache or data source as needed.
     * 
     * This method accepts a single product ID or an array of product IDs and returns an array of
     * `ProductType`.
     * 
     * @param ids - A single product ID or an array of product IDs to retrieve.
     * @returns Array of `ProductType` objects.
     */
    async getProductsById(ids: string[] | string): Promise<ProductType[]> {
        const productIds = Array.isArray(ids) ? ids : [ids];
        const products: ProductType[] = this.brandData.embedded.products;

        const fetchPromises = productIds.map(async (productId) => {
            const cachedProduct = await this.getCachedOrLoadProduct(productId);
            if (cachedProduct) {
                return cachedProduct;
            }

            const product = products.find(product => product.id === productId);
            if (product) {
                this.productsCache.set(productId, product);
                return product;
            }

            return null;
        });

        return Promise.all(fetchPromises).then(results => results.filter(result => result !== null)) as Promise<ProductType[]>;
    }

    /**
     * Retrieves a brand by its ID, using the cache or data source as needed.
     * 
     * @param id - The unique identifier of the brand to retrieve.
     * 
     * @returns A promise that resolves to the `BrandType` object.
     * - If the brand is not found, the method returns `null`.
     */
    async getBrandById(id: string): Promise<BrandType | null> {
        const cachedBrand = this.brandsCache.get(id);
        if (cachedBrand) {
            return cachedBrand;
        }

        const brandData = this.brandData.data;
        const brandObject = brandData.find(brandObject => brandObject.id === id);

        if (brandObject) {
            const brandResponse = JSON.parse(JSON.stringify(brandObject));
            const [stores, products, consolidatedProducts] = await Promise.all([
                this.getStoresById(brandObject.stores),
                this.getProductsById(brandObject.products),
                this.getProductsById(brandObject.consolidated_products)
            ]);

            brandResponse.stores = stores;
            brandResponse.products = products;
            brandResponse.consolidated_products = consolidatedProducts;

            this.brandsCache.set(id, brandResponse);
            return brandResponse;
        }

        return null;
    }

    /**
     * Retrieves products associated with a specific brand by the brand's ID.
     * 
     * @param id - The unique identifier of the brand.
     * 
     * @returns A promise that resolves to an array of `ProductType` objects.
     * - If the brand is not found, an empty array is returned.
     */
    async getProductsByBrandId(id: string): Promise<ProductType[] | null> {
        const brandData = this.brandData.data;
        const brandObject = brandData.find(brandObject => brandObject.id === id);

        if (brandObject) {
            return await this.getProductsById([
                ...brandObject.products,
                ...brandObject.consolidated_products
            ]);
        }

        return [];
    }

    /**
     * Retrieves stores associated with a specific brand by the brand's ID.
     * 
     * @param id - The unique identifier of the brand.
     * 
     * @returns A promise that resolves to an array of `StoreType`.
     * - If the brand is not found, the method returns `null`.
     */
    async getStoresByBrandId(id: string): Promise<StoreType[] | null> {
        const brandData = this.brandData.data;
        const brandObject = brandData.find(brandObject => brandObject.id === id);

        if (brandObject) {
            return await this.getStoresById(brandObject.stores);
        }

        return null;
    }

    /**
     * Retrieves stores associated with a specific product by the product's ID.
     * 
     * This method first retrieves the product using the provided product ID. If the product is found,
     * it then retrieves the brand associated with that product and returns the stores linked to that brand.
     * 
     * (!) NOTE: With consolidated products, a pivot only points to one brand,
     * so we need to traverse all the brands.
     * 
     * @param id - The unique identifier of the product.
     * 
     * @returns A promise that resolves to an array of `StoreType`.
     * - If the brand is not found, an empty array is returned.
     * - If the product is not found, the method returns `null`.
     */
    async getStoresByProductId(id: string): Promise<StoreType[] | null> {
        const products: ProductType[] = await this.getProductsById(id);

        if (products.length) {
            // Get the only product found
            const [product]: ProductType[] = products;

            // Return brands for that specific product
            const brand: BrandType | null = await this.getBrandById(product.brand_id);
            if (brand) {
                // If the brand is consolidated ('1'), it means the product is available
                // at multiple brands + stores. So a single product may belong to
                // multiple brands, as well as its "true" parent.
                if (brand.consolidated === 1) {
                    const brands = await this.getBrandsWithProductId(id);
                    const storePromises = brands.map(brand => this.getStoresById(brand.stores));
                    const storeArrays = await Promise.all(storePromises);

                    // Flatten the array of arrays and return
                    return storeArrays.flat() as StoreType[];
                }

                return brand.stores as StoreType[];
            }

            return [];
        }

        return null;
    }

    /**
     * Retrieves an array of brands that contain the specified product ID in their consolidated products.
     * (!) Avoid when possible as this function traverses all data
     * 
     * @param {string} productId - The ID of the product to search for within the brands' consolidated products.
     * @returns {Promise<BrandAPIType[]>}
     */
    async getBrandsWithProductId(productId: string): Promise<BrandAPIType[]> {
        return this.brandData.data.filter((brand: BrandAPIType) =>
            brand.consolidated_products.includes(productId)
        );
    }
}

export default BrandService;
