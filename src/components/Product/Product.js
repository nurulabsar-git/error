import React from "react";
import { Link } from "react-router-dom";
import "./Product.css";


const Product = (props) => {
  // console.log(props.productAt.name);
  // console.log(props.productAt.key);
    //  console.log(props);
      // console.log(props);
  const { img, name, price, seller, stock, key } = props.productAt;
  return (
    <div className="product">
      {/* <h1>This is product</h1> */}
      <div>
        <img src={img} alt="" />
      </div>
      <div>
        <h5 className="product-info"><strong>Name: </strong><Link to={"/product/"+key}>{name}</Link>
        </h5>
        <br />
        <p>
          <small>by: {seller}</small>
        </p>
        <p>${price}</p>
        <br />
        <p>
          <small>Only {stock} left in stock - Order soon.</small>
        </p>
        {props.showAddToCart && <button className="main-button" onClick={ () =>props.handleAddPro(props.productAt)}> add to cart</button> }
      </div>
    </div>
  );
};
 /*<FontAwesomeIcon icon={faCoffee} />
 <FontAwesomeIcon icon={faShoppingCart} />
 import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCoffee, faShoppingCart } from '@fortawesome/free-solid-svg-icons';  */
export default Product;
