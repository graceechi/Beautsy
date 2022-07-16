// CHECKOUT PAGE (comes after the ShoppingBagPage)
// CREATES AN ORDER

import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { createOrder } from '../../store/order';
import { createOrderItem } from '../../store/order_item';
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
    // console.log('this is ORDERS OBJ in state from checkout page', ordersObj)
    const ordersArr = Object.values(ordersObj);
    // console.log('this is ORDERS ARR in state from checkout page', ordersArr)


    // let [orderId, setOrderId] = useState();

    // ------grab local storage cart object----------
    let [cart, setCart] = useState({});
    let localCart = localStorage.getItem("cart"); // pertains to the useEfect

    // console.log('this is LOCAL CART in shopping bag page', cart)
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
    let item;
    let itemPrice;
    let quantity;
    let subtotal;
    for (let productId of productIds) {
        // use productsObj[productId] to key into all the products
        item = productsObj[productId];
        let sameItem = productsObj[productId];
        itemPrice = sameItem?.price;
        quantity = cart[productId];
        quantity = quantity["quantity"];
        subtotal = quantity * item?.price;
        realSubtotal.push(subtotal);
    }

    let sum = 0;
    for (let i = 0; i < realSubtotal.length; i++) {
        sum += realSubtotal[i]
    }

    // ---------calculations for orders' total price-------------

    sum = Math.round(sum * 100) / 100;
    // let shipping = subtotal > 25 ? 0 : 7.99;
    let shipping = 7.99;
    let total = Math.round((sum + shipping) * 100) / 100;

    // console.log('this is the value, shipping, and total', subtotal, shipping, total)

    // defining product here
    const product = productsObj[item?.id];

    // ---------CREATE ORDER AND ORDER_ITEM----------------
    //  -------------calculating order number-------------

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

            cart: cart
        }
        // console.log('-----this is payload on checkout page---------', order) // this prints an object

        dispatch(createOrder(order));

        //  clear cart local storage
        setCart([]);
        localStorage.setItem("cart", JSON.stringify([]));
    }

    return (
        <>
            <div className='checkout-header'>Check Out</div>
            <Link to='/cart'>
                <span className='back-to-shopping-bag'>Back to your Shopping Bag?</span>
            </Link>

            <div className='cart'>
                <div className='checkout-cart-container'>
                    <div className='order-details-container'>
                        <div className='order-details-items'>
                            {/* ------order items details list----------- */}
                            <div className='order-items-list' checkout-items>
                                {productIds.map((productId) => (
                                    <>
                                        <CheckoutItem key={productId} item={productsObj[productId]} quantity={cart[productId]["quantity"]} />
                                    </>
                                ))}
                            </div>
                        </div>

                    </div>
                    {/* -------checkout price summary calculations----------- */}
                    <div className="order-review">
                        <div className="order-review-line">
                            <span>Subtotal:</span> <span>${sum.toFixed(2)}</span>
                        </div>
                        <div className="order-review-calc-summary">
                            <span>Shipping:</span>{" "}
                            <span>{"$7.99"}</span>
                            {/* <span>{shipping === 0 ? "Free" : "$7.99"}</span> */}
                        </div>
                        <hr className='order-review-calc-summary'/>
                        <div className="order-review-calc-summary">
                            <span>Total: </span>
                            <span>${total}</span>
                        </div>
                        <br></br>
                        {/* ---------user's shipping info box--------- */}
                        <div className="checkout-shipping-container">
                            <div className="checkout-shipping-title">Shipping Information: </div>
                            <div className="checkout-shipping-address-details">
                                <div>{sessionUser?.full_name}</div>
                                <div>{sessionUser?.address}</div>
                            </div>
                            {/* <EditAddressBtn /> */}
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
