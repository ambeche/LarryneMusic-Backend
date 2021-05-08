import { React } from 'react';
import {
  Grid} from '@material-ui/core';
import ProductItem from './ProductItem';
import styles from '../../ui-utils/globalStyles';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => styles);


const ProductList = ({ products, setNotice, refetch, user }) => {
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
          <ProductItem key={pdt.id} product={pdt} refetch={refetch} setNotice={setNotice} user={user}/>
        ))}
      </Grid>
    </div>
  );
};

export default ProductList;
