import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import './makeup.css';

function Makeup() {
    const productsObj = useSelector(state => state?.product?.entries);
    // console.log('------this is productsObj from store', productsObj)
    const productsArr = Object.values(productsObj);
    // console.log('------this is productsArr', productsArr)
    const makeupProducts = productsArr.filter(product => product.categoryId === 4);
    // console.log('----this is makeup products', makeupProducts)

    return (
        <>
            <div className='hair-products-container'>
                {makeupProducts.map(makeup => (
                    <Link to={`/products/${makeup.id}`} key={makeup.id} className='makeup-product-box'>
                        <img src={makeup.image_url} alt={`${makeup.name}`} className='makeup-link-image' />
                        <div className='makeup-link-name'>{makeup.name}</div>
                        <div className='makeup-link-price'>${makeup.price.toFixed(2)}</div>
                    </Link>
                ))}
            </div>
        </>
    )
}

export default Makeup;
