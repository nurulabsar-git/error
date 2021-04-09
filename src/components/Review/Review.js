import React, { useEffect, useState } from 'react';
// import fakeData from '../../fakeData';
import { getDatabaseCart, processOrder, removeFromDatabaseCart } from '../../utilities/databaseManager';
import Cart from '../Cart/Cart';
import ReviewItem from '../ReviewItem/ReviewItem';
import happyImage from '../../images/giphy.gif';
import { useHistory } from 'react-router-dom';

const Review = () => {
    const [cart, setCart] = useState([]);
    const [orderPlaced, setOrderPlaced] = useState(false);

//    const handlePlaceOrder = () => {
//     //    console.log('order placed');
//        setCart([]);
//        setOrderPlaced(true);
//        processOrder();
//    } 

const history = useHistory();

   const handleProceedCheckout = () => {
    //    console.log('order placed');
    history.push('/shipment');
       
   } 



    const handleRemoveProduct = (productKey) =>{
        // console.log('remove clicked', productKey);
        const cartP = cart.filter(fo => fo.key !== productKey)
        setCart(cartP);
        removeFromDatabaseCart(productKey);
    }
    useEffect(() => {
       const savedCart = getDatabaseCart();
       console.log(savedCart);
       const productKeys = Object.keys(savedCart);

       fetch('http://localhost:5000/productsByKeys', {
           method: 'POST',
           headers: {
               'Content-Type' : 'application/json'
           },
           body: JSON.stringify(productKeys)
       })
       .then(res => res.json())
       .then(data => setCart(data))

    //    console.log(productKeys);
    //    const cartProducts = productKeys.map(key => {
    //     // savedCart[key]
    //     // console.log(key);
    //     const product = fakeData.find(pd => pd.key === key);
    //     product.quantity = savedCart[key];
    // // here, product = all selected key and value.
    //     return product;
        
    //    });
    // //    console.log(cartProducts);
    //       setCart(cartProducts);
    }, [])

    let thankYou;
    if(orderPlaced){
        thankYou = <img src={happyImage} alt=""/>
    }

    return (
        <div className="shop-container">
            {/* <h1> This is review router</h1>
            <h1>Cart Items test: {cart.length}</h1> */}
           <div className ="product-container">
                {
                    cart.map(pr =>  <ReviewItem handleRemoveProduct={handleRemoveProduct} key={pr.key} product={pr}></ReviewItem>)
                }
                {
                 thankYou
                }

           </div>
           <div className="cart-container">
            <Cart cart={cart}>
                {/* <button onClick={handlePlaceOrder} className="main-button">Place Order</button> */}
                <button onClick={handleProceedCheckout} className="main-button">Proceed Checkout</button>
            </Cart>
           </div>

        </div>
    );
};

export default Review;