// CHECKOUT PAGE (comes after the ShoppingBagPage)
// CREATES AN ORDER

import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { createOrder } from '../../store/order';
import { clearOrderItems } from '../../store/order_item';
import { loadProducts } from '../../store/products';

// either edit address or edit orders by cancelling AN order item
// import EditAddressBtn from "../EditAddress";
import CheckOutButton from './CheckoutButton';
import CartItem from '../ShoppingBagPage/CartItem';
import './checkout.css';

function CheckOutPage() {
    const dispatch = useDispatch()
    const history = useHistory()

    const sessionUser = useSelector(state => state.session.user);
    const productsObj = useSelector(state => state?.products?.entries);


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


    let item;
    let quantity;
    let subtotal;
    for (let productId of productIds) {
        // use productsObj[productId] to key into all the products
        item = productsObj[productId];
        quantity = cart[productId];
        quantity = quantity["quantity"];
        subtotal = quantity * item?.price;
        // console.log('what is this item\'s price????', item.price)
        // console.log('what is this item\'s quantity????', quantity)
        // console.log('THIS IS ITEMMMM and QUAANNNTITYYY and SUBTOTAL', item, quantity, subtotal)
    }

    // ---------calculations for orders' total price-------------

    subtotal = Math.round(subtotal * 100) / 100;
    // let shipping = subtotal > 25 ? 0 : 7.99;
    let shipping = 7.99;
    let total = Math.round((subtotal + shipping) * 100) / 100;

    console.log('this is the value, shipping, and total', subtotal, shipping, total)

    //  -------------calculating order number-------------
    const onSubmit = () => {
        let orderNumber = Math.floor(
            Math.random(1000000000000000, 999999999999999) * 1000000000000000
        );
        let createdAt = new Date();

        const payload = {
            order_number: `ORDER_${orderNumber}`,
            total,
            full_name: sessionUser.full_name,
            address: sessionUser.address,
            user_id: sessionUser.id,
            created_at: createdAt
        }
        // console.log('-----this is payload on checkout page---------', payload)
        dispatch(clearOrderItems(sessionUser.id));
        dispatch(createOrder(payload));
    }

    useEffect(() => {
        dispatch(loadProducts());
    }, [dispatch])

    return (
        <>
            <div className='checkout-header'>Check Out</div>
            <Link to='/cart'>
                <span className='back-to-shopping-bag'>Back to your Shopping Bag?</span>
            </Link>

            <div className='cart'>
                <div className='cart-container checkout'>
                    <div className='order-details-container'>
                        <div className='order-details-items'>
                            <div className='order-details-title'>
                                Check Your Order
                            </div>
                            {/* ------order items details list----------- */}
                            <div className='order-items-list' checkout-items>
                                {productIds.map((productId) => (
                                    <CartItem key={productId} item={productsObj[productId]} quantity={cart[productId]["quantity"]} />
                                ))}
                                {/* {orderItems.map((item) => (
                                    <Link to={`/products/${item.product_id}`}>
                                        <div key={item.product_id}>
                                            <img
                                            src={item.image_url}
                                            className="checkout-product-image"
                                            alt={item.name}
                                            />
                                            <div className='order-details-total'>${item.price} x {item.quantity}</div>
                                        </div>
                                    </Link>
                                ))} */}
                            </div>
                        </div>
                        {/* ---------user's shipping info box--------- */}
                        <div className="checkout-shipping-container">
                            <div className="checkout-shipping-title">Shipping Information</div>
                            <div className="checkout-shipping-address-details">
                                <div>{sessionUser?.full_name}</div>
                                <div>{sessionUser?.address}</div>
                            </div>
                            {/* <EditAddressBtn /> */}
                        </div>
                    </div>
                    {/* -------checkout price summary calculations----------- */}
                    <div className="order-review checkout">
                        <div className="order-review-line">
                            <span>Subtotal:</span> <span>${subtotal.toFixed(2)}</span>
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
                        <CheckOutButton onSubmit={onSubmit} />
                    </div>
                </div>
            </div>
        </>

    );
};

export default CheckOutPage;
