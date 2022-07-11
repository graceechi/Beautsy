import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import './shoppingbag.css';

import { loadProducts, getOneProduct } from '../../store/products';
import CartItem from './CartItem';

function Cart() {
    const dispatch = useDispatch();
    const history = useHistory();

    const productsObj = useSelector(state => state?.product?.entries);
    const productsArr = Object.values(productsObj);
    console.log('----this is products arr on shopping bag page', productsArr)

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
    for (const item in localCart) {
        // let cartArr = [];
        productsArr.forEach(product => {
            if (product.id === item.id) {
                // cartArr.push(product);
                return product;
            }
            console.log('looping over local cart items', product)
        })
    };

    // ---------calculations for orders' total price-------------
    // let value = orderItems.reduce(
    //     (accum, item) => accum + item.quantity * item.price,
    //     0
    // );
    // value = Math.round(value * 100) / 100;
    // let shipping = value > 25 ? 0 : 7.99;
    // let total = Math.round((value + shipping) * 100) / 100;

    // const onSubmit = e => {
    //     e.preventDefault();
    //     history.push('/checkout');
    // }

    // useEffect(() => {
    //     dispatch(loadProducts());
    // }, [dispatch])


    return (
        <>
            <h1>SHOPPING BAG</h1>
            {/* <div className='shopping-bag-header'>My Shopping Bag</div>
            <div className='shopping-bag'>
                <div className='shopping-bag-container'>
                    {!orderItems || !orderItems.length
                    ? (
                        <div className='empty-bag-msg'>Your shopping bag is empty!</div>
                    ) :
                    ( */}
                        {/* // ---------import OrderItem component: which will list out each item's details, can edit order item quantity--------- */}
                        {/* <div className='bag-items-list'>
                            {orderItems.map((item) => (
                                <CartItem key={item.product_id} item={item} />
                            ))}
                        </div>
                    )} */}
                    {/* -------checkout price summary calculations----------- */}
                    {/* <div className="order-review checkout">
                        <div className="order-review-line">
                            <span>Subtotal:</span> <span>${value}</span>
                        </div>
                        <div className="order-review-calc-summary">
                            <span>Shipping:</span>{" "}
                            <span>{shipping === 0 ? "Free" : "$7.99"}</span>
                        </div>
                        <hr />
                        <div className="order-review-calc-summary">
                            <span>Total: </span>
                            <span>${total}</span>
                        </div>
                        <button
                            onClick={!orderItems || !orderItems.length ? null : onSubmit}
                            className='continue-to-checkout-btn'
                        >
                            <span>Continue to Checkout</span>
                        </button>
                    </div>
                </div>
            </div> */}
        </>
    );
};

export default Cart;
