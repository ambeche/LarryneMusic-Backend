import React from 'react';
import ProductList from './ProductList';

const Published = ({publishedProducts, setNotice}) => {
  
  return (
    <>
    <ProductList products={publishedProducts} setNotice={setNotice}  />
    </>
  )
}

export default Published;