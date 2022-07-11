// goes on Shopping Bag Page

import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { loadOrders } from "../../store/order";

import { updateOrderItemQuantity, removeOrderItem } from '../../store/order_item';
import { loadProducts } from "../../store/products";


function OrderItem({ item }) {
    const dispatch = useDispatch()
    const sessionUser = useSelector(state => state.session.user)
    const products = useSelector(state => state?.product?.entries)
    // console.log('this is PRODUCTSSSSSSSS from STATE in OrderItem component within Shopping Bag Page', products)
    const product = products[item?.product_id];
    // console.log('this is PRODUCT in OrderItem component within Shopping Bag Page', product)
    const orders = useSelector(state => state?.order?.entries)
    // console.log('this is the USER'S ORDERS in OrderItem component within Shopping Bag Page', orders)
    const order = orders['id'] // *********this is wrong

    const [quantity, setQuantity] = useState(item.quantity);

    useEffect(() => {
        dispatch(loadProducts());
        dispatch(loadOrders(sessionUser.id))
        setQuantity(item.quantity);

    }, [dispatch, item.quantity, sessionUser.id])

    return (
        <div className="order-item">
            <Link to={`/products/${item.product_id}`}>
                <img className="order-item-img" src={item.image_url} alt={item.name} />
            </Link>
            <div>
                <Link to={`/products/${item.product_id}`}>
                    <div className="order-item-name">{item.name}</div>
                </Link>
                <div className="order-item-price">${item.price}</div>
                {/* --------------------quantity select menu, plus/minus/delete buttons-------------------- */}
                <div className="order-quantity-select-menu">
                    <select
                        value={quantity}
                        onChange={(e) => {
                            setQuantity(e.target.value);
                            dispatch(
                                updateOrderItemQuantity({
                                    quantity: Number(e.target.value),
                                    // order_id: order.id,
                                    product_id: item.product_id,
                                })
                            );
                        }}
                    >
                        <option value={1}>1</option>
                        <option value={2}>2</option>
                        <option value={3}>3</option>
                        <option value={4}>4</option>
                        <option value={5}>5</option>
                    </select>
                    {/* MINUS BUTTON */}
                    <button
                        className="order-item-minus-button"
                        onClick={() =>
                            dispatch(
                                updateOrderItemQuantity({
                                    quantity: item.quantity - 1,
                                    // order_id: order.id,
                                    product_id: item.product_id,
                                })
                            )
                        }
                    >
                        <span className="material-symbols-outlined">remove</span>
                    </button>
                    {/* PLUS BUTTON */}
                    <button
                        className="order-item-plus-button"
                        onClick={
                        item?.quantity >= 5
                            ? null
                            : () =>
                                dispatch(
                                    updateOrderItemQuantity({
                                        quantity: item.quantity + 1,
                                        // order_id: order.id,
                                        product_id: item.product_id,
                                    })
                                )
                        }
                    >
                        <span className="material-symbols-outlined">add</span>
                    </button>
                    {/* DELETE ITEM BUTTON */}
                    <button
                        className="cart-item-button"
                        onClick={() =>
                        dispatch(removeOrderItem(order.id, item.product_id))
                        }
                    >
                        <span className="material-symbols-outlined">delete</span>
                    </button>
                </div>
            </div>
        </div>
    )
}

export default OrderItem;
