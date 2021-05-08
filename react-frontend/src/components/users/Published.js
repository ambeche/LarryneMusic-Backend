import React from 'react';
import ProductList from './ProductList';

const Published = ({publishedProducts, refetch, setNotice, user}) => {
  
  return (
    <>
    <ProductList products={publishedProducts} refetch={refetch} setNotice={setNotice} user={user} />
    </>
  )
}

export default Published;