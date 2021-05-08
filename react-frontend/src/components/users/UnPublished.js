import React from 'react';
import ProductList from './ProductList';

const UnPublished = ({unPublishedProducts, setNotice, refetch, user}) => {
  
  return (
    <>
    <ProductList products={unPublishedProducts}  refetch={refetch} setNotice={setNotice} user={user}/>
    </>
  )
}

export default UnPublished;