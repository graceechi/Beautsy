import { useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import './products.css';
import { loadProducts } from '../../store/products';

function Products() {
    const history = useHistory();
    const dispatch = useDispatch();
    useLocation(); // returns the location object that represents the current URL

    const categories = {
        Skin: 1,
        Body: 2,
        Hair: 3,
        Makeup: 4,
        Man: 5
    }
    const categoryName = history.location.pathname.slice(1);
    // console.log('this is categoryName', categoryName)
    const categoryId = categories[categoryName];

    const productsObj = useSelector(state => state?.product);
    // const state = useSelector(state => console.log('this is STATE', state));
    console.log('---THIS IS THE PRODUCTS OBJECT IN STATE---', productsObj);
    let products = Object.values(productsObj);
    products = products.filter((product) => product.category_id === categoryId);

    // useEffect(() => {
    //     dispatchEvent(loadProducts());
    // }, [dispatch])

    const handleOnClick = (id) => {
        history.push(`/products/${id}`);
    };

    return (
        <div className="banner-container">

            <h1>YOU ARE ON THE {categoryName.toUpperCase()} PAGE</h1>

            <div className={"banner-header " + categoryName}>
                <div>{categoryName.toUpperCase()}</div>
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
                        ${product.price}
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

export default Products;
