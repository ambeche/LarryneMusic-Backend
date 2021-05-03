import React from 'react';
import ProductList from './ProductList';

const StoreItems = ({storeItems, setProduct}) => {
  
  return (
    <>
    <ProductList products={storeItems} />
    </>
  )
}

export default StoreItems;