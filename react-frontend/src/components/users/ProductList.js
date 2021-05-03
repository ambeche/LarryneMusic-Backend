import { React, useState } from 'react';
import {
  Grid} from '@material-ui/core';
import useStyles from '../../ui-utils/globalStyles'
import ProductItem from './ProductItem';


const ProductList = ({ products, setNotice }) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid
        container
        spacing={1}
        justify="space-evenly"
        alignItems="center"
        alignContent="center"
      >
        {products?.map((pdt) => (
          <ProductItem key={pdt.id} product={pdt} setNotice={setNotice}/>
        ))}
      </Grid>
    </div>
  );
};

export default ProductList;
