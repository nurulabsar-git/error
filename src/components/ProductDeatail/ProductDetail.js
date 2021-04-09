import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
// import fakeData from '../../fakeData';
import Product from '../Product/Product';

const ProductDetail = () => {
    const {productKey} =useParams();
    const [product, setProduct] = useState({});

    useEffect(() => {

        fetch('http://localhost:5000/product/'+ productKey)
        .then(res => res.json())
        .then(data => setProduct(data));
    }, [productKey])
//    const productB = fakeData.find(pd => pd.key === productKey);
//    console.log(productB);
    return (
        <div>
        {/* <h1>Hello {productKey} product details!</h1> */}
        {<Product showAddToCart={false} productAt={product}> </Product> }
        </div>
    );
};

export default ProductDetail;