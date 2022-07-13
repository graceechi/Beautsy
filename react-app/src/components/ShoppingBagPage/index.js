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
    // console.log('----this is products arr on shopping bag page', productsArr)

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
    console.log('this is array of productId keys pulled from cart obj', productIds)


    // let items = [];
    // let item;
    // let quantity;
    // let subtotal;
    let realSubtotal = [];


    // lcalCart {{ productId: { quantity: 1 }, { productId: { quantity: 2 }}
    for (let productId of productIds) {
        // use productsObj[productId] to key into all the products

        // let cartItem = productsObj[productId];
        // items.push(cartItem)

        let item = productsObj[productId];
        let quantity = cart[productId];
        quantity = quantity["quantity"];
        let subtotal = quantity * item?.price;
        realSubtotal.push(subtotal);

        // console.log('WHAT IS THIS REAL SUBTOTAL', realSubtotal)
        // console.log('what is this item\'s price????', item.price)
        // console.log('what is this item\'s quantity????', quantity)
        // console.log('THIS IS ITEMMMM and QUAANNNTITYYY and SUBTOTAL', item, quantity, subtotal)

        // let sum = 0;
        // for (let i = 0; i < realSubtotal.length; i++) {
        //     sum += realSubtotal[i]
        // }
    }
    // console.log('WOAHWOAH WHAT IS THIS REAL SUBTOTAL', realSubtotal) // array of prices

    let sum = 0;
    for (let i = 0; i < realSubtotal.length; i++) {
        sum += realSubtotal[i]
    }
    // console.log('THIS IS THE FINAL SUM OF ALL PRICES', sum)


    // ---------calculations for orders' total price-------------

    sum = Math.round(sum * 100) / 100;
    // let shipping = subtotal > 25 ? 0 : 7.99;
    let shipping = 7.99;
    let total = Math.round((sum + shipping) * 100) / 100;

    console.log('this is the value, shipping, and total', sum, shipping, total)

    const onSubmit = e => {
        e.preventDefault();
        history.push('/checkout');
    }

    useEffect(() => {
        dispatch(loadProducts());
    }, [dispatch])


    return (
        <>
            {/* <h1>SHOPPING BAG</h1> */}
            <div className='shopping-bag-header'>My Shopping Bag</div>
            <div className='shopping-bag'>
                <div className='shopping-bag-container'>
                    {!productIds || !productIds.length
                    ? (
                        <div className='empty-bag-msg'>Your shopping bag is empty!</div>
                    ) :
                    (
                        // ---------import OrderItem component: which will list out each item's details, can edit order item quantity---------
                        <div className='bag-items-list'>
                            {productIds.map((productId) => (
                                <CartItem key={productId} item={productsObj[productId]} quantity={cart[productId]["quantity"]} />
                            ))}
                        </div>
                    )}
                    {/* -------checkout price summary calculations----------- */}
                    {!productIds || !productIds.length ?
                    null
                    :
                    (
                        <div className="order-review checkout">
                            <div className="order-review-line">
                                <span>Subtotal:</span>
                                <span>${sum.toFixed(2)}</span>
                            </div>
                            <div className="order-review-calc-summary">
                                <span>Shipping:</span>{" "}
                                <span>{"$7.99"}</span>
                                {/* <span>{shipping === 0 ? "Free" : "$7.99"}</span> */}
                            </div>
                            <hr />
                            <div className="order-review-calc-summary">
                                <span>Total: </span>
                                <span>${total}</span>
                            </div>
                            <button
                                onClick={!productIds || !productIds.length ? null : onSubmit}
                                className='continue-to-checkout-btn'
                            >
                                <span>Continue to Checkout</span>
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};

export default Cart;
