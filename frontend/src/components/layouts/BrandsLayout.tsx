import { FC, useEffect, useState } from "react";
import { Container, Grid, Typography } from "@mui/material";

import apiService from "../../services/brandsApiService";
import { BrandApi } from "../../types";
import Brand from "../common/Brand";

const BrandsLayout: FC<any> = () => {
    const [brands, setBrands] = useState<BrandApi[]>([]);

    // Load all available brands
    useEffect(() => {
        const fetchAllBrands = async () => {
            try {
                const result = await apiService.getBrands();
                setBrands(result);
            } catch (err) {
                console.error(err);
            }
        };

        fetchAllBrands();
    }, [])

    return (
        <Container>
            <Typography variant="h1" gutterBottom sx={{ fontSize: 24, fontWeight: 'bold' }}>
                huggg API test
            </Typography>

            <Grid container spacing={2} alignItems="stretch">
                {
                    brands && brands.map((brand: any, index: number) => <Grid item xs={4} key={`brand-info-${brand.id}`}>
                        <Brand data={brand} />
                    </Grid>
                    )
                }
            </Grid>
        </Container>
    );
};

export default (BrandsLayout);