import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import './hair.css';

function Hair() {
    const productsObj = useSelector(state => state?.product?.entries);
    // console.log('------this is productsObj from store', productsObj)
    const productsArr = Object.values(productsObj);
    // console.log('------this is productsArr', productsArr)
    const hairProducts = productsArr.filter(product => product.categoryId === 3);
    // console.log('----this is hair products', hairProducts)

    return (
        <>
            <div className='hair-products-container'>
                {hairProducts.map(hair => (
                    <Link to={`/products/${hair.id}`} key={hair.id} className='hair-product-box'>
                        <img src={hair.image_url} alt={`${hair.name}`} className='hair-link-image' />
                        <div className='hair-link-name'>{hair.name}</div>
                        <div className='hair-link-price'>${hair.price.toFixed(2)}</div>
                    </Link>
                ))}
            </div>
        </>
    )
}

export default Hair;
