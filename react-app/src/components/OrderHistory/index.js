// MY ORDER HISTORY PAGE

import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { loadOrders } from "../../store/order";
import { loadProducts } from "../../store/products";
import './orderhistory.css';
import CancelOrderButton from './CancelOrderButton';

function OrderHistory() {
    const dispatch = useDispatch();
    const history = useHistory();
    const sessionUser = useSelector(state => state.session.user);

    const ordersObj = useSelector(state => state?.order?.entries);
    const ordersArr = Object.values(ordersObj);
    const productsObj = useSelector(state => state?.product?.entries);
    console.log('this is ordersObj on order history page', ordersObj)
    console.log('this is ordersArr on order history page', ordersArr)
    console.log('this is productsObj on order history page', productsObj)

    let purchases = Object.values(ordersArr);
    console.log('this is purchases on order history page', purchases)


    ordersArr.sort((a, b) => {
        const orderA = new Date(a[0]?.created_at)
        const orderB = new Date(b[0]?.created_at)
        return orderA > orderB ? -1 : 1;
        // -1 is sorting A before B
    });

    // click on product name redirects to single product page
    const clickToProduct = (item) => {
        history.push(`/products/${item.product_id}`);
    }

    useEffect(() => {
        dispatch(loadOrders(sessionUser.id));
        dispatch(loadProducts());
    }, [dispatch, sessionUser.id])

    return (
        <>
            <div className="order-history-container">
                {/* Orders update/delete feature within the first hour */}
                <div className="delete-order-note">
                    Note: Orders can be cancelled and shipping info can be edited within one hour after being placed.
                </div>
                {purchases.map((order) => {
                    let date = new Date(order.created_at);
                    return (
                        <div className="single-order-item-container" key={order.id}>
                            <div>{order.order_number}</div>
                            <div className="order-placed-date">{date.toDateString()}</div>
                            {new Date() - new Date(order.created_at) < 3600000 ? (
                                <CancelOrderButton orderId={order.id} />
                            ) : null}
                            {/* {new Date() - new Date(purchases[0].created_at) < 3600000 ? (
                                <EditShippingInfoButton />
                            ) : null} */}

                            {/* --------------order history table container--------------- */}
                            <table className="order-history-table">
                                <thead>
                                    <tr className="order-history-table-header">
                                        <th>PRODUCT</th>
                                        <th>PRICE</th>
                                        <th>QUANTITY</th>
                                    </tr>
                                </thead>
                                <tbody>
                                {purchases.map((item) => (
                                    <tr key={item.product_id} className="order-item-row">
                                        <td
                                            onClick={() => clickToProduct(item)}
                                            className="order-item-name"
                                        >
                                            {productsObj[item?.product_id]?.name}
                                        </td>
                                        <td className="order-item-price">
                                            ${productsObj[item?.product_id]?.price}
                                        </td>
                                        <td className="order-item-qty">{item.quantity}</td>
                                        {/* ---------cancel a single order item------------ */}
                                        {/* ---------similar to cancelling an entire order???------------ */}
                                        <td className="cancel-single-item">Cancel Item</td>
                                    </tr>
                                ))}
                                </tbody>
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
                            </div>
                            <hr></hr>
                            <hr></hr>
                        </div>

                    )
                })}
            </div>
        </>
    )
}

export default OrderHistory;
