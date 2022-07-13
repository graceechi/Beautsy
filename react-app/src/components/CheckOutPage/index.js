// CHECKOUT PAGE (comes after the ShoppingBagPage)
// CREATES AN ORDER

import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { createOrder } from '../../store/order';
import { addOrderItem, clearOrderItems } from '../../store/order_item';
import { loadProducts } from '../../store/products';

// either edit address or edit orders by cancelling AN order item
// import EditAddressBtn from "../EditAddress";
import CheckOutButton from './CheckoutButton';
import CheckoutItem from './CheckoutItem';
import './checkout.css';

function CheckOutPage() {
    const dispatch = useDispatch()
    const history = useHistory()

    const sessionUser = useSelector(state => state.session.user);
    const productsObj = useSelector(state => state?.product?.entries);
    // console.log('this is productssss obj from state on checkout page', productsObj)
    const ordersObj = useSelector(state => state?.order?.entries);
    console.log('this is ORDERS OBJ in state from checkout page', ordersObj)
    const ordersArr = Object.values(ordersObj);
    console.log('this is ORDERS ARR in state from checkout page', ordersArr)


    // let [orderId, setOrderId] = useState();

    // ------grab local storage cart object----------
    let [cart, setCart] = useState({});
    let localCart = localStorage.getItem("cart"); // pertains to the useEfect

    console.log('this is LOCAL CART in shopping bag page', cart)
    useEffect(() => {
        // change into JS
        localCart = JSON.parse(localCart);
        // load persisted cart into state if it exists
        if (localCart) setCart(localCart); // if localCart is not null
    }, []) // the empty array ensures useEffect only runs once


    // ------------CLEAR ITEM by product id in LOCAL STORAGE--------------
    const clearCart = () => {
        // e.preventDefault();

        let cartCopy = {...cart}; // create a copy of cart state

        // console.log('this is cart copyyyyy from CartItem page', cartCopy)
        if (cartCopy[product?.id]) {
            delete cartCopy[product?.id]; // delete item
        }

        setCart(cartCopy); // update cart state
        // make cart a string and store in local storage
        localStorage.setItem("cart", JSON.stringify(cartCopy));
    }

    // ---------loop over local cart obj and grab product by id
    const productIds = Object.keys(cart);
    console.log('this is array of productId keys pulled from cart obj', productIds)


    let item;
    let itemPrice;
    let quantity;
    let subtotal;
    for (let productId of productIds) {
        // use productsObj[productId] to key into all the products
        item = productsObj[productId];
        itemPrice = item?.price;
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

    // console.log('this is the value, shipping, and total', subtotal, shipping, total)

    // defining product here
    const product = productsObj[item?.id];

    //  -------------calculating order number-------------
    let newOrderId;
    const onSubmit = () => {
        let orderNumber = Math.floor(
            Math.random(1000000000000000, 999999999999999) * 1000000000000000
        );
        // let createdAt = new Date();

        const order = {
            order_number: `ORDER_${orderNumber}`,
            total,
            full_name: sessionUser.full_name,
            address: sessionUser.address,
            user_id: sessionUser.id,
            // quantity, order_id, product_id
            // quantity: quantity,
            // order_id: ,
            // product_id: item?.id

        }
        // console.log('-----this is payload on checkout page---------', order) // this prints an object

        // dispatch(clearOrderItems(sessionUser.id));
        // dispatch(createOrder(order));

        dispatch(createOrder(order)).then((res) => {
            newOrderId = res[0].id
            // setOrderId(res[0].id)
            // console.log('THISSSSSSSS', res, res[0].id)
            console.log('---------this should be ORDER ID from the thunk after creating an order', newOrderId)
            // dispatch create order item here

        });



        // iterate thru product and remove from localstorage
        // cart.map(item => (
        //     clearCart(item)
        // ))


        // order.id pk

        // { order_id: [ {prodId: qty} ...] }

        // const order_item = {
            // items: [{productId: quantity} for item in items]
            // needs foreign key order_id from prior dispatch
        // }
    }

    // useEffect(() => {
    //     setOrderId(newOrderId)
    //     dispatch(loadProducts());
    // }, [newOrderId])

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
                                    <>
                                        <CheckoutItem key={productId} item={productsObj[productId]} quantity={cart[productId]["quantity"]} />
                                        <div className='checkout-details-total'>${itemPrice.toFixed(2)} x {quantity}</div>
                                    </>
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
                        {/* <button onSubmit={onSubmit}>Complete Checkout</button> */}
                        <CheckOutButton onSubmit={onSubmit} />
                    </div>
                </div>
            </div>
        </>

    );
};

export default CheckOutPage;
