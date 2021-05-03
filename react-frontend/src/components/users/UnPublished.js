import React from 'react';
import ProductList from './ProductList';

const UnPublished = ({unPublishedProducts, setProduct}) => {
  
  return (
    <>
    <ProductList products={unPublishedProducts} />
    </>
  )
}

export default UnPublished;