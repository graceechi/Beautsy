// MY ORDER HISTORY PAGE

import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { loadOrders } from "../../store/order";
import { loadProducts } from "../../store/products";
import './orderhistory.css';
import CancelOrderButton from './CancelOrderButton';
import EditShippingButton from "./EditShippingButton";

function OrderHistory() {
    const dispatch = useDispatch();
    const history = useHistory();
    const sessionUser = useSelector(state => state.session.user);

    const ordersObj = useSelector(state => state?.order?.entries);
    const productsObj = useSelector(state => state?.product?.entries);

    let purchases;
    if (ordersObj) {
        purchases = Object.values(ordersObj)
    };
    // console.log('this is purchases on order history page', purchases) // array of orders objects


    // purchases.sort((a, b) => {
    //     const orderA = new Date(a[0]?.created_at)
    //     const orderB = new Date(b[0]?.created_at)
    //     return orderA > orderB ? -1 : 1;
    //     // -1 is sorting A before B
    // });

    if (!sessionUser) {
        history.push('/login');
    }

    // click on product name redirects to single product page
    const clickToProduct = (order_item) => {
        history.push(`/products/${order_item?.product_id}`);
    }

    useEffect(() => {
        // dispatch(loadOrders(sessionUser.id));
        dispatch(loadProducts());

        if (sessionUser) {
            dispatch(loadOrders(sessionUser.id))
        }
    }, [dispatch])

    return (

        <>
            {!purchases || !purchases.length ?
            <div>You don't have any orders yet!</div>
            :
            (
                <div className="order-history-container">
                    {/* Orders update/delete feature within the first hour */}
                    {/* <div className="delete-order-note">
                        Note: Orders can be cancelled and shipping info can be edited within one hour after being placed.
                    </div> */}

                    {purchases && purchases.map((order) => {
                        // console.log('WHAT IS THIS ORDERR', order, order.id)
                        let date = new Date(order.created_at);
                        return (
                            <div className="single-order-item-container" key={order.id}>
                                <div>{order.order_number}</div>
                                <div className="order-placed-date">{date.toDateString()}</div>
                                {/* {new Date() - new Date(order.created_at) < 3600000 ? (
                                    <CancelOrderButton orderId={order.id} />
                                ) : null} */}
                                {/* {new Date() - new Date(purchases[0].created_at) < 3600000 ? (
                                    <EditShippingInfoButton />
                                ) : null} */}

                                {/* ---------------DELETE ORDER-------------------- */}

                                <CancelOrderButton orderId={order.id} />

                                {/* --------------order history table container--------------- */}
                                <table className="order-history-table">
                                    {/* {purchases && purchases.map((item) => ( */}
                                        <>
                                        <thead>
                                            <tr className="order-history-table-header">
                                                <th>PRODUCT</th>
                                                <th>PRICE</th>
                                                <th>QUANTITY</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                                {/* item = one order; Object.values(item.order_items = one item) */}
                                                {Object.values(order?.order_items)?.map((order_item) => (
                                                    <>
                                                    <tr
                                                    key={order?.order_items?.product_id}
                                                    className="order-item-row">
                                                        <td
                                                            onClick={() => clickToProduct(order_item)}
                                                            className="order-item-name"
                                                        >
                                                            {productsObj[order_item.product_id].name}
                                                            {/* {order_item.id === order.id ?
                                                            productsObj[order_item.product_id].name : ""} */}
                                                        </td>
                                                        <td className="order-item-price">
                                                            {(productsObj[order_item.product_id]?.price).toFixed(2)}
                                                            {/* ${order_item.id === order.id ? (productsObj[order_item.product_id]?.price).toFixed(2) : ""} */}
                                                        </td>
                                                        <td className="order-item-qty">
                                                            {order_item.quantity}
                                                            {/* {order_item.id === order.id ? order_item.quantity : ""} */}
                                                        </td>
                                                    </tr>
                                                    </>
                                                ))}
                                    </tbody>
                                    </>
                                    {/* ))} */}
                                </table>

                                <div className="shipping-summary">
                                    <span>Order Total: </span>
                                    <span>${order.total}</span>
                                </div>
                                <div className="shipping-summary-box">
                                    <div>Shipping Information: </div>
                                    <div className="shipping-info">
                                        <div>{order.full_name}</div>
                                        <div>{order.address}</div>
                                    </div>
                                    {/* ---------------EDIT ORDER-------------------- */}
                                    <EditShippingButton orderId={order.id} order={order} />

                                </div>
                                <hr></hr>
                                <hr></hr>
                            </div>

                        )
                    })}
                </div>
            )}
        </>

    )
}

export default OrderHistory;
