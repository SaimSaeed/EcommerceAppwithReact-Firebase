import React from 'react'
import IndividualProduct from './IndividualProduct'

function Products({products,addtoCart}) {
  console.log(products)

  return (
   
      <div className='row mx-auto mt-5'>
        {products.map((individualproduct)=>{
 return <IndividualProduct key={individualproduct.ID} individualproduct={individualproduct} addtoCart={addtoCart}/>
      })}
        </div>
   
  )
}

export default Products