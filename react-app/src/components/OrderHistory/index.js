// MY ORDER HISTORY PAGE

import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { loadOrders } from "../../store/order";
import { loadProducts } from "../../store/products";
import './orderhistory.css';
// import CancelOrderButton from './CancelOrderButton';

function OrderHistory() {
    const dispatch = useDispatch();
    const history = useHistory();

    const ordersObj = useSelector(state => state?.order?.entries);
    const ordersArr = Object.values(ordersObj);
    const productsObj = useSelector(state => state?.product?.entries);
    let purchases;

    ordersArr.sort((a, b) => {
        const orderA = new Date(a[0]?.created_at)
        const orderB = new Date(b[0]?.created_at)
        return orderA > orderB ? -1 : 1;
        // -1 is sorting A before B
    });

    // click on product name redirects to single product page
    const onClick = (item) => {
        history.push(`/products/${item.product_id}`);
    }

    useEffect(() => {
        dispatch(loadOrders());
        dispatch(loadProducts());
    }, [dispatch])

    return (
        <>
            <div className="order-history-container">
                {/* Orders delete feature within the first hour */}
                <div className="delete-order-note">
                    Note: Orders can be cancelled within one hour after being placed.
                </div>
                {ordersArr.map((order) => {
                    purchases = Object.values(order);
                    let date = new Date(purchases[0].created_at);
                    return (
                        <div className="single-order-item-container" key={purchases[0].id}>

                        </div>

                    )
                })}
            </div>
        </>
    )
}

export default OrderHistory;
