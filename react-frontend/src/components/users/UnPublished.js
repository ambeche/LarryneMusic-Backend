import React from 'react';
import ProductList from './ProductList';

const UnPublished = ({unPublishedProducts, setNotice}) => {
  
  return (
    <>
    <ProductList products={unPublishedProducts}  setNotice={setNotice}/>
    </>
  )
}

export default UnPublished;