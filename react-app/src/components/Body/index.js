import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import './body.css';

function Body() {
    const productsObj = useSelector(state => state?.product?.entries);
    // console.log('------this is productsObj from store', productsObj)
    const productsArr = Object.values(productsObj);
    // console.log('------this is productsArr', productsArr)
    const bodyProducts = productsArr.filter(product => product.categoryId === 2);
    // console.log('----this is body products', bodyProducts)

    return (
        <>
            <div className='body-products-container'>
                {bodyProducts.map(body => (
                    <Link to={`/products/${body.id}`} key={body.id} className='body-product-box'>
                        <img src={body.image_url} alt={`${body.name}`} className='body-link-image' />
                        <div className='body-link-name'>{body.name}</div>
                        <div className='body-link-price'>${body.price.toFixed(2)}</div>
                    </Link>
                ))}
            </div>
        </>
    )
}

export default Body;
