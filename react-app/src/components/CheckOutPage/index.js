// CHECKOUT PAGE (comes after the ShoppingBagPage)
// CREATES AN ORDER

import { useSelector, useDispatch } from 'react-redux';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { createOrder } from '../../store/order';
import { clearOrderItems } from '../../store/order_item';

// either edit address or edit orders by cancelling AN order item
// import EditAddressBtn from "../EditAddress";
// import CheckOutBtn from "./CheckOutButton";

import './checkout.css';

function CheckOutPage() {
    const dispatch = useDispatch()
    const history = useHistory()

    const sessionUser = useSelector(state => state.session.user);
    const products = useSelector(state => state?.products?.entries);

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

    // if (!orderItems.length) history.push('/');

    // ---------calculations for orders' total price-------------
    let value = orderItems.reduce(
        (accum, item) => accum + item.quantity * item.price,
        0
    );
    value = Math.round(value * 100) / 100;
    let shipping = value > 25 ? 0 : 7.99;
    let total = Math.round((value + shipping) * 100) / 100;

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
                            {/* ------order items details lis-----------t */}
                            <div className='order-items-list' checkout-items>
                                {orderItems.map((item) => (
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
                                ))}
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
                        {/* <CheckOutButton orderItems={orderItems} onSubmit={onSubmit} /> */}
                    </div>
                </div>
            </div>
        </>

    )
}

export default CheckOutPage;
