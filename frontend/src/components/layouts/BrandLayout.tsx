import { FC, useEffect, useState } from "react";
import { Button, Container, Grid } from "@mui/material";
import { BrandData } from "../../types";
import { useParams, Link as RouterLink } from 'react-router-dom';

import apiService from "../../services/brandsApiService";
import BrandDescription from "../common/BrandDescription";


const BrandLayout: FC<any> = () => {
    const [brandData, setBrandData] = useState<BrandData>();
    const { brandId } = useParams<{ brandId: string }>();

    // Load all available brands
    useEffect(() => {
        const fetchBrandById = async (brandId: string) => {
            try {
                const result = await apiService.getBrandById(brandId);
                setBrandData(result);
            } catch (err) {
                console.error(err);
            }
        };

        if (brandId) {
            fetchBrandById(brandId);
        }
    }, [brandId])

    return (
        <Container>
            <Button
                component={RouterLink}
                to="/"
                variant="contained"
                color="primary"
                sx={{
                    backgroundColor: '#fcc726',
                    color: '#000',
                    '&:hover': { backgroundColor: '#fff' },
                    margin: 2
                }}
            >
                View all brands
            </Button>

            <Grid container spacing={2} alignItems="stretch">
                <Grid item xs={12}>
                    {brandData && <BrandDescription key={`brand-description-${brandData.id}`} data={brandData} />}
                </Grid>
            </Grid>
        </Container>
    );
};

export default (BrandLayout);