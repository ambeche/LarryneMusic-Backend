import React from 'react';
import ProductList from './ProductList';

const UnPublished = ({unPublishedProducts}) => {
  
  return (
    <>
    <ProductList products={unPublishedProducts} />
    </>
  )
}

export default UnPublished;