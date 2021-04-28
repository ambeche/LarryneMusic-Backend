import React from 'react'
import {  useQuery } from '@apollo/client';
import {PRODUCTS} from './queries';

const App = () => {
  const result = useQuery(PRODUCTS);

  if (result.loading)  {
    return <div>loading...</div>
  }
  console.log(result.data.products);
  return (
    <div>
      {result.data.products.map(p => <img alt='' src={p.image.url} width='400'/>)}
    </div>
  )
}

export default App
