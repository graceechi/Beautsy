import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import './shoppingbag.css';

import { loadProducts, getOneProduct } from '../../store/products';
import CartItem from './CartItem';

function Cart() {
    const dispatch = useDispatch();
    const history = useHistory();
    const sessionUser = useSelector(state => state.session.user);

    const productsObj = useSelector(state => state?.product?.entries);
    const productsArr = Object.values(productsObj);
    // console.log('----this is products arr on shopping bag page', productsArr)

    // ------grab local storage cart object----------

    let [cart, setCart] = useState({});
    let localCart = localStorage.getItem("cart"); // pertains to the useEfect
    let [qty, setQty] = useState(0);
    let [sum, setSum] = useState(0);
    let [total, setTotal] = useState(0);

    // console.log('this is LOCAL CART in shopping bag page', localCart)
    useEffect(() => {
        // change into JS
        localCart = JSON.parse(localCart);
        // load persisted cart into state if it exists
        if (localCart) setCart(localCart); // if localCart is not null
    }, []) // the empty array ensures useEffect only runs once


    // ---------loop over local cart obj and grab product by id
    const productIds = Object.keys(cart);
    // console.log('this is array of productId keys pulled from cart obj', productIds)


    let realSubtotal = [];


    // lcalCart {{ productId: { quantity: 1 }, { productId: { quantity: 2 }}
    for (let productId of productIds) {
        // use productsObj[productId] to key into all the products

        let item = productsObj[productId];
        let quantity = cart[productId];
        qty = quantity["quantity"];
        let subtotal = qty * item?.price;
        realSubtotal.push(subtotal);
    }

    sum = 0;
    for (let i = 0; i < realSubtotal.length; i++) {
        sum += realSubtotal[i]
    }


    // ---------calculations for orders' total price-------------

    sum = Math.round(sum * 100) / 100;
    // let shipping = subtotal > 25 ? 0 : 7.99;
    let shipping = 7.99;
    total = Math.round((sum + shipping) * 100) / 100;


    const onSubmit = e => {
        e.preventDefault();

        if (sessionUser) {
            history.push('/checkout');
        } else {
            history.push('/login');
        }
    }

    useEffect(() => {
        dispatch(loadProducts());
        setQty(qty);
        setSum(sum);
        setTotal(total)
    }, [dispatch, qty, sum, total])


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
