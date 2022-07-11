import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import './shoppingbag.css';

import { loadProducts } from '../../store/products';
import OrderItem from './OrderItem';

function Cart() {
    const dispatch = useDispatch();
    const history = useHistory();

    const products = useSelector(state => state?.product?.entries);

    // ------getting order items----------
    const orderItemsObj = useSelector(state => state?.order_item?.entries);
    console.log('this is orderItemsObj', orderItemsObj)
    const orderItemsArr = Object.values(orderItemsObj);
    // console.log('this is orderItemsArr', typeof(orderItemsArr))

    const orderItems = orderItemsArr.map((item) => ({
        ...item,
        name: products[item.product_id]?.name,
        price: products[item.product_id]?.price,
        image_url: products[item.product_id]?.image_url,
    }));
    // console.log('this is orderItems', typeof(orderItems))


    // ---------calculations for orders' total price-------------
    let value = orderItems.reduce(
        (accum, item) => accum + item.quantity * item.price,
        0
    );
    value = Math.round(value * 100) / 100;
    let shipping = value > 25 ? 0 : 7.99;
    let total = Math.round((value + shipping) * 100) / 100;

    const onSubmit = e => {
        e.preventDefault();
        history.push('/checkout');
    }

    useEffect(() => {
        dispatch(loadProducts());
    }, [dispatch])


    return (
        <>
            <div className='shopping-bag-header'>My Shopping Bag</div>
            <div className='shopping-bag'>
                <div className='shopping-bag-container'>
                    {!orderItems || !orderItems.length
                    ? (
                        <div className='empty-bag-msg'>Your shopping bag is empty!</div>
                    ) :
                    (
                        // ---------import OrderItem component: which will list out each item's details, can edit order item quantity---------
                        <div className='bag-items-list'>
                            {orderItems.map((item) => (
                                <OrderItem key={item.product_id} item={item} />
                            ))}
                        </div>
                    )}
                    {/* -------checkout price summary calculations----------- */}
                    <div className="order-review checkout">
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
            </div>
        </>
    );
};

export default Cart;
