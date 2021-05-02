import React from 'react';
import ProductList from './ProductList';

const Published = ({publishedProducts}) => {
  
  return (
    <>
    <ProductList products={publishedProducts} />
    </>
  )
}

export default Published;