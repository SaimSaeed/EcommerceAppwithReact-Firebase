import React from 'react'

function IndividualProduct({ individualproduct,addtoCart }) {

    const handleAddtoCart = ()=>{
        addtoCart(individualproduct)
    }
    return (
        <div className='col-12 col-sm-12 col-md-6 col-lg-4 mx-auto'>
        <div className="card mx-auto" style={{ width: "20rem",backgroundColor:"white",border:"2px solid grey" }} >
            <img className="card-img-top" src={individualproduct.url} alt="Card cap" />
            <div className="card-body">
                <h5 className="card-title">{individualproduct.Title}</h5>
                <p className="card-text">{individualproduct.Description}</p>
                <p className="card-text">{individualproduct.Price}</p>
                <button className="btn"  style={{backgroundColor:'grey',color:"white"}} onClick={handleAddtoCart} >Add to Cart</button>
            </div>
        </div>
    </div>
    )
}

export default IndividualProduct