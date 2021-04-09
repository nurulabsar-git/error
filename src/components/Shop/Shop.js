import React, {useEffect, useState} from 'react';
// import fakeData from '../../fakeData';
import { addToDatabaseCart, getDatabaseCart } from '../../utilities/databaseManager';
import Cart from '../Cart/Cart';
import Product from '../Product/Product';
import './Shop.css';
import {Link} from 'react-router-dom';

const Shop = () => {
    // console.log(fakeData);
    // const first10 = fakeData.slice(0, 10);
    // const [products, setProducts] = useState(first10);
    const [products, setProducts] = useState([]);
    const [cart, setCart] = useState([]);


  useEffect(() => {
      fetch('http://localhost:5000/products')
      .then(res => res.json())
      .then(data => setProducts(data))
  }, [])


  
    useEffect(()=>{
        const savedCart =getDatabaseCart();
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


        // if(products.length > 0){
        //     const previousCart = productKeys.map(existingKey => {
        //         const product = products.find(pd => pd.key === existingKey);
        //     product.quantity = savedCart[existingKey];
        //     return product;
        //         // console.log(existingKey, savedCart[existingKey]);
    
        //     })
            
        //     setCart(previousCart);
        //     console.log(previousCart);
        //     // console.log(productKeys);
        //     // console.log(savedCart);
        // }
    }, [])




    const handleAddProduct = (product) => {
        const toBeAdded = product.key;
        const sameProduct = cart.find(pData => pData.key === toBeAdded);
        let count = 1;
        let CartV;
       if(sameProduct){
           count = sameProduct.quantity + 1;
           sameProduct.quantity = count;
           const others = cart.filter(pd => pd.key !== toBeAdded);
           CartV =[...others, sameProduct];
       }
       else{
           product.quantity = 1;
           CartV = [...cart, product];
       }

        setCart(CartV);
        addToDatabaseCart(product.key, count);
    
    }

//   const handleAddProduct = (product) => {
//         // console.log('product added', productAt);
//         const CartV = [...cart, product];
//         setCart(CartV);
//         const sameProduct = CartV.filter(pData => pData.key === product.key);
//         const count = sameProduct.length;
//         addToDatabaseCart(product.key, count);
    
//     }





            


    return (
        <div className ="shop-container">
            <div className="product-container">
            
            {
                products.map(product => <Product key = {product.key} showAddToCart={true} handleAddPro={handleAddProduct} productAt={product}></Product>)
            }
            
         </div>

            <div className="cart-container">
            <Cart cart ={cart}></Cart>
              <Link to ="/review">
               <button className="main-button">Review Order</button>
              </Link>
            </div>
        </div>
    );
};







export default Shop;