import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import './man.css';

function Man() {
    const productsObj = useSelector(state => state?.product?.entries);
    // console.log('------this is productsObj from store', productsObj)
    const productsArr = Object.values(productsObj);
    // console.log('------this is productsArr', productsArr)
    const manProducts = productsArr.filter(product => product.categoryId === 5);
    // console.log('----this is man products', manProducts)

    return (
        <>
            <div className='hair-products-container'>
                {manProducts.map(man => (
                    <Link to={`/products/${man.id}`} key={man.id} className='man-product-box'>
                        <img src={man.image_url} alt={`${man.name}`} className='man-link-image' />
                        <div className='man-link-name'>{man.name}</div>
                        <div className='man-link-price'>${man.price.toFixed(2)}</div>
                    </Link>
                ))}
            </div>
        </>
    )
}

export default Man;
