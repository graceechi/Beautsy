import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import './skin.css';

function Skin() {
    const productsObj = useSelector(state => state?.product?.entries);
    // console.log('------this is productsObj from store', productsObj)
    const productsArr = Object.values(productsObj);
    // console.log('------this is productsArr', productsArr)
    const skinProducts = productsArr.filter(product => product.categoryId === 1);
    // console.log('----this is skin products', skinProducts)

    return (
        <>
            <div className='skin-products-container'>
                {skinProducts.map(skin => (
                    <Link to={`/products/${skin.id}`} key={skin.id} className='skin-product-box'>
                        <img src={skin.image_url} alt={`${skin.name}`} className='skin-link-image' />
                        <div className='skin-link-name'>{skin.name}</div>
                        <div className='skin-link-price'>${skin.price.toFixed(2)}</div>
                    </Link>
                ))}
            </div>
        </>
    )
}

export default Skin;
