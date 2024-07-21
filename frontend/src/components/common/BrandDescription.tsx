import { Grid, Card, CardActions, CardHeader, CardMedia, List, ListItem, Typography, CardContent } from "@mui/material";
import { FC } from "react";
import { BrandData, ProductData, StoreData } from "../../types";

interface BrandDescriptionProps {
    data: BrandData;
}

const BrandDescription: FC<BrandDescriptionProps> = ({ data }) => {

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
                    marginTop: 1,
                    marginBottom: 1,
                    maxHeight: '150px',
                    objectFit: 'contain',
                    objectPosition: 'center',
                }}
            />
            <CardContent>
                {data.share}
            </CardContent>

            <CardActions sx={{ justifyContent: "space-between" }}>
                <Grid container>
                    <Grid item xs={6}>
                        <Typography variant="h3" sx={{ fontWeight: 'bold', fontSize: 16 }}>
                            Stores
                        </Typography>
                        <List sx={{ fontSize: 16 }}>
                            {
                                data.stores && data.stores.map((store: StoreData) => {
                                    return <ListItem key={`store-list-${store.id}`}>
                                        {store.name}
                                    </ListItem>
                                })
                            }
                        </List>
                    </Grid>

                    <Grid item xs={6}>
                        <Typography variant="h3" sx={{ fontWeight: 'bold', fontSize: 16 }}>
                            Products
                        </Typography>
                        <List sx={{ fontSize: 16 }}>
                            {
                                data.stores && data.products.map((product: ProductData) => {
                                    return <ListItem key={`product-list-${product.id}`}>
                                        {product.description}
                                    </ListItem>
                                })
                            }
                        </List>

                        <Typography variant="h3" sx={{ fontWeight: 'bold', fontSize: 16 }}>
                            Consolidated products
                        </Typography>
                        <List sx={{ fontSize: 16, color: 'red' }}>
                            {
                                data.stores && data.consolidated_products.map((product: ProductData) => {
                                    return <ListItem key={`product-list-${product.id}`}>
                                        {product.description}
                                    </ListItem>
                                })
                            }
                        </List>
                    </Grid>
                </Grid>
            </CardActions>
        </Card>
    );
};

export default (BrandDescription);