// goes on Checkout Page

import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { loadOrders } from "../../store/order";
import { loadProducts } from "../../store/products";
import './checkout.css';


function CheckoutItem({ item, quantity }) {
    const dispatch = useDispatch()
    const sessionUser = useSelector(state => state.session.user)
    const productsObj = useSelector(state => state?.product?.entries)
    // console.log('this is PRODUCTSSSSSSSS from STATE in CartItem component within Shopping Bag Page', products)
    const product = productsObj[item?.id];
    // console.log('this is PRODUCT in CartItem component within Shopping Bag Page', product)


    // ------grab local storage cart object----------

    let [cart, setCart] = useState({});
    let localCart = localStorage.getItem("cart"); // pertains to the useEfect

    console.log('this is LOCAL CART in shopping bag page', localCart)
    useEffect(() => {
        // change into JS
        localCart = JSON.parse(localCart);
        // load persisted cart into state if it exists
        if (localCart) setCart(localCart); // if localCart is not null
    }, []) // the empty array ensures useEffect only runs once


    // ---------loop over local cart obj and grab product by id
    const productIds = Object.keys(cart);
    // console.log('this is array of productId keys pulled from cart obj', productIds)



    useEffect(() => {
        dispatch(loadProducts());
        dispatch(loadOrders(sessionUser.id))

    }, [dispatch, sessionUser.id])


    return (
        <div className="order-item">
            <Link to={`/products/${product?.id}`}>
                <img className="checkout-item-img" src={product?.image_url} alt={product?.name} />
            </Link>
            <div>
                <Link to={`/products/${product?.id}`}>
                    <div className="checkout-item-name">{product?.name}</div>
                </Link>
                <div className='checkout-details-total'>${product?.price.toFixed(2)} x {quantity}</div>
            </div>
        </div>
    )
}

export default CheckoutItem;
