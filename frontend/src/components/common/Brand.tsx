import { Button, Card, CardActions, CardHeader, CardMedia } from "@mui/material";
import { FC } from "react";

import { Link as RouterLink } from 'react-router-dom';
import { BrandData } from "../../types";

// Define a separate interface for component props
interface BrandProps {
    data: BrandData;
}

const Brand: FC<BrandProps> = ({ data }) => {
    return (
        <Card>
            <CardHeader
                title={data.name}
                subheader={`Stores: ${data.stores.length} - Products: ${data.products.length} + ${data.consolidated_products.length}`}
                sx={{ '.MuiCardHeader-title': { fontSize: 16, fontWeight: 'bold' }, backgroundColor: '#ff8f76', height: 20, borderBottom: '1px solid' }}
            />
            <CardMedia
                component="img"
                height={150}
                image={data.logo_url}
                sx={{
                    paddingTop: 1,
                    paddingBottom: 1,
                    maxHeight: '150px',
                    objectFit: 'contain',
                    objectPosition: 'center',
                }}
            />
            <CardActions sx={{ justifyContent: "space-between" }}>
                <Button
                    component={RouterLink}
                    to={`/brand/${data.id}`}
                    variant="contained"
                    color="primary"
                    sx={{
                        backgroundColor: '#fcc726',
                        color: '#000',
                        '&:hover': { backgroundColor: '#fff' }
                    }}
                    fullWidth
                >
                    View brand
                </Button>
            </CardActions>
        </Card>
    );
};

export default (Brand);