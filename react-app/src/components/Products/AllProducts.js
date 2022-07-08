import { useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { useHistory, } from "react-router-dom";
import './products.css';
import { loadProducts } from '../../store/products';

function AllProducts() {
    const history = useHistory();
    const dispatch = useDispatch();


    const productsObj = useSelector(state => state?.product?.entries);
    // console.log('---THIS IS THE PRODUCTS OBJECT IN STATE---', productsObj);
    let products = Object.values(productsObj);
    console.log('---ALL 50 PRODUCTS---', products)

    useEffect(() => {
        dispatch(loadProducts());
    }, [dispatch])

    const handleOnClick = (id) => {
        history.push(`/products/${id}`);
    };

    return (
        <div className="banner-container">
            <div className="all-products-page">
                <div>ALL PRODUCTS</div>
            </div>
            <div className="products-container">
                {products.map((product) => (
                <div key={product.id} className="product-card">
                    <img src={product.image_url} alt={product.name}
                    onClick={(e) => handleOnClick(product.id)}
                    />
                    <div className="products-page-price"
                    onClick={(e) => handleOnClick(product.id)}
                    >
                        ${product.price.toFixed(2)}
                    </div>
                    <div className="products-page-name"
                    onClick={(e) => handleOnClick(product.id)}
                    >
                        {product.name}
                    </div>
                </div>
                ))}
            </div>
        </div>
    );

}

export default AllProducts;
