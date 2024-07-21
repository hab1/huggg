import fs from 'fs';
import BrandService from '../../src/services/BrandService';
import { BrandServiceDataType, ProductType, StoreType } from '../../src/types';

// Mock fs module
jest.mock('fs');

describe('BrandService', () => {
    let brandService: BrandService;
    let mockBrandData: BrandServiceDataType;

    beforeAll(() => {
        mockBrandData = {
            embedded: {
                stores: [
                    { id: 'store1', name: 'Store 1' } as StoreType,
                    { id: 'store2', name: 'Store 2' } as StoreType
                ],
                products: []
            },
            data: []
        };
    });

    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe('constructor', () => {
        it('should initialise BrandService and read brand data from file', () => {
            mockBrandData = {
                embedded: {
                    stores: [],
                    products: []
                },
                data: []
            };

            (fs.readFileSync as jest.Mock).mockReturnValue(JSON.stringify(mockBrandData));
            brandService = new BrandService();

            expect(fs.readFileSync).toHaveBeenCalledTimes(1);
            expect(brandService).toBeDefined();
        });

        it('should capture error if file BrandService cannot read brand data from file', () => {
            mockBrandData = {
                embedded: {
                    stores: [],
                    products: []
                },
                data: []
            };

            console.error = jest.fn();
            (fs.readFileSync as jest.Mock).mockReturnValue(() => {
                throw new Error('File error.');
            });

            expect(() => new BrandService()).toThrow('Failed to initialise BrandService.');
        });
    });

    describe('getBrandById()', () => {
        it('should return everything from brandData', () => {
            mockBrandData = {
                embedded: {
                    stores: [
                        { id: "store1" } as StoreType,
                        { id: "store2" } as StoreType
                    ],
                    products: [
                        { id: "product1" } as ProductType,
                        { id: "product2" } as ProductType
                    ]
                },
                data: [
                    {
                        id: "brand1",
                        products: ['product1', 'product2'],
                        stores: ['store1'],
                    } as any
                ]
            };

            (fs.readFileSync as jest.Mock).mockReturnValue(JSON.stringify(mockBrandData));
            const brandService = new BrandService();

            const brandData = brandService.getBrands();
            expect(brandData).toEqual(mockBrandData);
        });
    });

    describe('getBrandById()', () => {
        it('should get brand by id', async () => {
            mockBrandData = {
                embedded: {
                    stores: [],
                    products: []
                },
                data: [
                    {
                        id: "brand1",
                        products: [],
                        stores: [],
                    } as any
                ]
            };

            (fs.readFileSync as jest.Mock).mockReturnValue(JSON.stringify(mockBrandData));
            const brandService = new BrandService();

            const brand = await brandService.getBrandById('brand1');
            expect(brand).toEqual({
                id: 'brand1',
                stores: [],
                products: [],
                consolidated_products: []
            });
        });

        it('should return null if brand is not found', async () => {
            mockBrandData = {
                embedded: {
                    stores: [],
                    products: []
                },
                data: [
                    {
                        id: "brand1",
                        products: [],
                        stores: [],
                    } as any
                ]
            };

            (fs.readFileSync as jest.Mock).mockReturnValue(JSON.stringify(mockBrandData));
            const brandService = new BrandService();

            const brand = await brandService.getBrandById('brand2');
            expect(brand).toEqual(null);
        });

        it('should get brand by id from cache', async () => {
            const brandService = new BrandService();
            const cachedBrand = {
                id: 'brand1',
                name: 'Brand 1',
                stores: [],
                products: [],
                consolidated_products: []
            };
            // Mock the cache to have the brand
            brandService['brandsCache'].set('brand1', cachedBrand as any);

            const brand = await brandService.getBrandById('brand1');
            expect(brand).toEqual(cachedBrand);
            expect(brandService['brandsCache'].has('brand1')).toBe(true);
        });

        it('should get null if brand is not in cache or file', async () => {
            mockBrandData = {
                embedded: {
                    stores: [],
                    products: []
                },
                data: [
                    {
                        id: "brand1",
                        products: [],
                        stores: [],
                    } as any
                ]
            };

            (fs.readFileSync as jest.Mock).mockReturnValue(JSON.stringify(mockBrandData));
            const brandService = new BrandService();
            const cachedBrand = {
                id: 'brand1',
                name: 'Brand 1',
                stores: [],
                products: [],
                consolidated_products: []
            };
            // Mock the cache to have the brand
            brandService['brandsCache'].set('brand1', cachedBrand as any);

            const brand = await brandService.getBrandById('brand2');
            expect(brand).toEqual(null);
            expect(brandService['brandsCache'].has('brand1')).toBe(true);
        });
    });

    describe('getStoresById()', () => {
        it('should return store if found', async () => {
            mockBrandData = {
                embedded: {
                    stores: [
                        { id: "store1" } as StoreType,
                        { id: "store2" } as StoreType
                    ],
                    products: []
                },
                data: [
                    {
                        id: "brand1",
                        products: [],
                        stores: [],
                    } as any
                ]
            };

            (fs.readFileSync as jest.Mock).mockReturnValue(JSON.stringify(mockBrandData));
            const brandService = new BrandService();

            const stores = await brandService.getStoresById('store1');
            expect(stores).toEqual([{ id: 'store1' }]);
        });

        it('should return [] if store is not found', async () => {
            mockBrandData = {
                embedded: {
                    stores: [
                        { id: "store1" } as StoreType,
                        { id: "store2" } as StoreType
                    ],
                    products: []
                },
                data: [
                    {
                        id: "brand1",
                        products: [],
                        stores: [],
                    } as any
                ]
            };

            (fs.readFileSync as jest.Mock).mockReturnValue(JSON.stringify(mockBrandData));
            const brandService = new BrandService();

            const stores = await brandService.getStoresById('store3');
            expect(stores).toEqual([]);
        });

        it('should return data from cache if found', async () => {
            mockBrandData = {
                embedded: {
                    stores: [
                        { id: "store1" } as StoreType,
                        { id: "store2" } as StoreType
                    ],
                    products: []
                },
                data: [
                    {
                        id: "brand1",
                        products: [],
                        stores: [],
                    } as any
                ]
            };

            (fs.readFileSync as jest.Mock).mockReturnValue(JSON.stringify(mockBrandData));
            const brandService = new BrandService();
            const cachedStore = {
                id: 'store-cached',
                name: 'Store cached'
            };

            // Mock the cache to have the brand
            brandService['storesCache'].set('store-cached', cachedStore as any);

            const stores = await brandService.getStoresById('store-cached');
            expect(brandService['storesCache'].has('store-cached')).toBe(true);
            expect(stores).toEqual([{
                id: 'store-cached',
                name: 'Store cached'
            }]);

        });
    });

    describe('getProductsById()', () => {
        it('should return product if found', async () => {
            mockBrandData = {
                embedded: {
                    stores: [],
                    products: [
                        { id: "product1" } as ProductType,
                        { id: "product2" } as ProductType
                    ]
                },
                data: []
            };

            (fs.readFileSync as jest.Mock).mockReturnValue(JSON.stringify(mockBrandData));
            const brandService = new BrandService();

            const products = await brandService.getProductsById('product1');
            expect(products).toEqual([{ id: 'product1' }]);
        });

        it('should return [] if product is not found', async () => {
            mockBrandData = {
                embedded: {
                    stores: [],
                    products: [
                        { id: "product1" } as ProductType,
                        { id: "product2" } as ProductType
                    ]
                },
                data: []
            };

            (fs.readFileSync as jest.Mock).mockReturnValue(JSON.stringify(mockBrandData));
            const brandService = new BrandService();

            const products = await brandService.getProductsById('product3');
            expect(products).toEqual([]);
        });

        it('should return data from cache if found', async () => {
            mockBrandData = {
                embedded: {
                    stores: [],
                    products: [
                        { id: "product1" } as ProductType,
                        { id: "product2" } as ProductType
                    ]
                },
                data: []
            };

            (fs.readFileSync as jest.Mock).mockReturnValue(JSON.stringify(mockBrandData));
            const brandService = new BrandService();
            const cachedProduct = {
                id: 'product-cached',
                name: 'Product cached'
            };

            // Mock the cache to have the brand
            brandService['productsCache'].set('product-cached', cachedProduct as any);

            const products = await brandService.getProductsById('product-cached');
            expect(brandService['productsCache'].has('product-cached')).toBe(true);
            expect(products).toEqual([{
                id: 'product-cached',
                name: 'Product cached'
            }]);
        });
    });

    describe('getProductsByBrandId()', () => {
        it('should return product if found via brand', async () => {
            mockBrandData = {
                embedded: {
                    stores: [],
                    products: [
                        { id: "product1" } as ProductType,
                        { id: "product2" } as ProductType,
                        { id: "product3" } as ProductType
                    ]
                },
                data: [
                    {
                        id: "brand1",
                        consolidated_products: [],
                        products: [
                            "product1",
                            "product3"
                        ]
                    } as any,
                    {
                        id: "brand2",
                        consolidated_products: [],
                        products: [
                            "product1",
                            "product2"
                        ]
                    } as any
                ]
            };

            (fs.readFileSync as jest.Mock).mockReturnValue(JSON.stringify(mockBrandData));
            const brandService = new BrandService();

            const products = await brandService.getProductsByBrandId('brand1');
            expect(products).toEqual([{ id: 'product1' }, { id: 'product3' }]);
        });

        it('should return empty array if brand doesnt have products', async () => {
            mockBrandData = {
                embedded: {
                    stores: [],
                    products: []
                },
                data: [
                    {
                        id: "brand1",
                        consolidated_products: [],
                        products: []
                    } as any
                ]
            };

            (fs.readFileSync as jest.Mock).mockReturnValue(JSON.stringify(mockBrandData));
            const brandService = new BrandService();

            const products = await brandService.getProductsByBrandId('brand1');
            expect(products).toEqual([]);
        });

        it('should return empty array if brand have products but data is not provided', async () => {
            mockBrandData = {
                embedded: {
                    stores: [],
                    products: []
                },
                data: [
                    {
                        id: "brand1",
                        consolidated_products: [],
                        products: ["product1"]
                    } as any
                ]
            };

            (fs.readFileSync as jest.Mock).mockReturnValue(JSON.stringify(mockBrandData));
            const brandService = new BrandService();

            const products = await brandService.getProductsByBrandId('brand1');
            expect(products).toEqual([]);
        });

        it('should return [] if brand does not exist', async () => {
            mockBrandData = {
                embedded: {
                    stores: [],
                    products: []
                },
                data: [
                    {
                        id: "brand1",
                        consolidated_products: [],
                        products: ["product1"]
                    } as any
                ]
            };

            (fs.readFileSync as jest.Mock).mockReturnValue(JSON.stringify(mockBrandData));
            const brandService = new BrandService();

            const products = await brandService.getProductsByBrandId('brand2');
            expect(products).toEqual([]);
        });
    });

    describe('getStoresByBrandId()', () => {
        it('should return store if found via brand', async () => {
            mockBrandData = {
                embedded: {
                    stores: [
                        { id: "store1" } as StoreType,
                        { id: "store2" } as StoreType
                    ],
                    products: []
                },
                data: [
                    {
                        id: "brand1",
                        consolidated_products: [],
                        stores: [
                            "store1"
                        ]
                    } as any,
                    {
                        id: "brand2",
                        consolidated_products: [],
                        stores: [
                            "store2"
                        ]
                    } as any
                ]
            };

            (fs.readFileSync as jest.Mock).mockReturnValue(JSON.stringify(mockBrandData));
            const brandService = new BrandService();

            const stores = await brandService.getStoresByBrandId('brand2');
            expect(stores).toEqual([{ id: 'store2' }]);
        });

        it('should return [] if stores are not found via brand', async () => {
            mockBrandData = {
                embedded: {
                    stores: [
                        { id: "store1" } as StoreType,
                        { id: "store2" } as StoreType
                    ],
                    products: []
                },
                data: [
                    {
                        id: "brand1",
                        consolidated_products: [],
                        stores: [
                            "store3"
                        ]
                    } as any
                ]
            };

            (fs.readFileSync as jest.Mock).mockReturnValue(JSON.stringify(mockBrandData));
            const brandService = new BrandService();

            const stores = await brandService.getStoresByBrandId('brand1');
            expect(stores).toEqual([]);
        });

        it('should return null brand is not found', async () => {
            mockBrandData = {
                embedded: {
                    stores: [
                        { id: "store1" } as StoreType,
                        { id: "store2" } as StoreType
                    ],
                    products: []
                },
                data: [
                    {
                        id: "brand1",
                        consolidated_products: [],
                        stores: [
                            "store3"
                        ]
                    } as any
                ]
            };

            (fs.readFileSync as jest.Mock).mockReturnValue(JSON.stringify(mockBrandData));
            const brandService = new BrandService();

            const stores = await brandService.getStoresByBrandId('brand2');
            expect(stores).toEqual(null);
        });
    });

    describe('getStoresByProductId()', () => {
        it('should return associated stores with products via brand', async () => {
            mockBrandData = {
                embedded: {
                    stores: [
                        { id: "store1" } as StoreType,
                        { id: "store2" } as StoreType,
                        { id: "store3" } as StoreType
                    ],
                    products: [
                        { id: "product1", brand_id: "brand1" } as ProductType,
                        { id: "product2", brand_id: "brand1" } as ProductType,
                        { id: "product3", brand_id: "brand2" } as ProductType
                    ]
                },
                data: [
                    {
                        id: "brand1",
                        consolidated_products: [],
                        products: [
                            "product1"
                        ],
                        stores: [
                            "store1",
                            "store2"
                        ]
                    } as any,
                    {
                        id: "brand2",
                        consolidated_products: [],
                        stores: [
                            "store3"
                        ]
                    } as any
                ]
            };

            (fs.readFileSync as jest.Mock).mockReturnValue(JSON.stringify(mockBrandData));
            const brandService = new BrandService();

            const check1 = await brandService.getStoresByProductId('product1');
            expect(check1).toEqual([{ id: 'store1' }, { id: 'store2' }]);

            const check2 = await brandService.getStoresByProductId('product3');
            expect(check2).toEqual([{ id: 'store3' }]);
        });

        it('should return null if product not found', async () => {
            mockBrandData = {
                embedded: {
                    stores: [
                        { id: "store1" } as StoreType,
                        { id: "store2" } as StoreType,
                        { id: "store3" } as StoreType
                    ],
                    products: [
                        { id: "product1", brand_id: "brand1" } as ProductType,
                        { id: "product2", brand_id: "brand1" } as ProductType,
                        { id: "product3", brand_id: "brand2" } as ProductType
                    ]
                },
                data: [
                    {
                        id: "brand1",
                        consolidated_products: [],
                        products: [
                            "product1"
                        ],
                        stores: [
                            "store1",
                            "store2"
                        ]
                    } as any,
                    {
                        id: "brand2",
                        consolidated_products: [],
                        stores: [
                            "store3"
                        ]
                    } as any
                ]
            };

            (fs.readFileSync as jest.Mock).mockReturnValue(JSON.stringify(mockBrandData));
            const brandService = new BrandService();

            const check1 = await brandService.getStoresByProductId('product4');
            expect(check1).toEqual(null);
        });

        it('should return [] if product is found but no brand associated', async () => {
            mockBrandData = {
                embedded: {
                    stores: [
                        { id: "store1" } as StoreType,
                    ],
                    products: [
                        { id: "product1", brand_id: "brand1" } as ProductType,
                    ]
                },
                data: [
                    {
                        id: "brand2",
                        consolidated_products: [],
                        stores: [
                            "store3"
                        ]
                    } as any
                ]
            };

            (fs.readFileSync as jest.Mock).mockReturnValue(JSON.stringify(mockBrandData));
            const brandService = new BrandService();

            const check1 = await brandService.getStoresByProductId('product1');
            expect(check1).toEqual([]);
        });

        it('should return store by consolidated product', async () => {
            mockBrandData = {
                data: [
                    {
                        "id": "normal-brand",
                        "consolidated": 0,
                        "products": ["product-1"],
                        "consolidated_products": ["consolidated-product"],
                        "stores": ["store-1", "store-3"]
                    } as any,
                    {
                        "id": "consolidated-brand",
                        "consolidated": 1,
                        "products": ["consolidated-1"],
                        "consolidated_products": [],
                        "stores": []
                    } as any
                ],
                embedded: {
                    stores: [
                        { id: "store-1" } as StoreType,
                        { id: "store-2" } as StoreType,
                        { id: "store-3" } as StoreType
                    ],
                    products: [
                        { id: "product1", brand_id: "brand1" } as ProductType,
                        { id: "consolidated-product", brand_id: "consolidated-brand" } as ProductType,
                        { id: "product3", brand_id: "brand2" } as ProductType
                    ]
                }
            } as any;

            (fs.readFileSync as jest.Mock).mockReturnValue(JSON.stringify(mockBrandData));
            const brandService = new BrandService();

            const stores = await brandService.getStoresByProductId('consolidated-product');
            expect(stores).toEqual([{ id: "store-1" }, { id: "store-3" }]);
        });
    });
});