// goes on Shopping Bag Page

import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { loadOrders } from "../../store/order";

import { loadProducts } from "../../store/products";


function CartItem({ item }) {
    const dispatch = useDispatch()
    const sessionUser = useSelector(state => state.session.user)
    const products = useSelector(state => state?.product?.entries)
    // console.log('this is PRODUCTSSSSSSSS from STATE in OrderItem component within Shopping Bag Page', products)
    const product = products[item?.product_id];
    // console.log('this is PRODUCT in OrderItem component within Shopping Bag Page', product)


    // -----------setting up cart array local storage--------------

    let [cart, setCart] = useState({});
    let localCart = localStorage.getItem("cart"); // pertains to the useEfect

    // ----------plus item to LOCAL STORAGE-------------
    const addToCart = (e) => {
        e.preventDefault();

        let cartCopy = {...cart}; // create a copy of cart state

        console.log('this is cart copyyyyy from CartItem page', cartCopy)
        if (cartCopy[product.id]) {
            cartCopy[product.id]["quantity"]++; // update item
        } else {
            cartCopy[product.id] = { "quantity": 1 };
        }

        setCart(cartCopy); // update cart state
        // make cart a string and store in local storage
        localStorage.setItem("cart", JSON.stringify(cartCopy));
    };

    // ----------minus item to LOCAL STORAGE-------------
    const minusFromCart = (e) => {
        e.preventDefault();

        let cartCopy = {...cart}; // create a copy of cart state

        // console.log('this is cart copyyyyy from CartItem page', cartCopy)
        if (cartCopy[product.id]) {
            cartCopy[product.id]["quantity"]--; // update item
        } else {
            cartCopy[product.id] = { "quantity": 0 };
        }

        setCart(cartCopy); // update cart state
        // make cart a string and store in local storage
        localStorage.setItem("cart", JSON.stringify(cartCopy));
    };

    // ------------CLEAR ITEM by product id in LOCAL STORAGE--------------
    const deleteFromCart = (e) => {
        e.preventDefault();

        let cartCopy = {...cart}; // create a copy of cart state

        // console.log('this is cart copyyyyy from CartItem page', cartCopy)
        if (cartCopy[product.id]) {
            delete cartCopy[product.id]; // delete item
        }

        setCart(cartCopy); // update cart state
        // make cart a string and store in local storage
        localStorage.setItem("cart", JSON.stringify(cartCopy));
    }

    useEffect(() => {
        // change into JS
        localCart = JSON.parse(localCart);
        // load persisted cart into state if it exists
        if (localCart) setCart(localCart); // if localCart is not null
    }, []) // the empty array ensures useEffect only runs once


    useEffect(() => {
        dispatch(loadProducts());
        dispatch(loadOrders(sessionUser.id))

    }, [dispatch, sessionUser.id])


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
                    <input
                        // value={quantity}
                        onChange={(e) => {
                            // setQuantity(e.target.value);

                        }}
                    >
                    </input>
                    {/* MINUS BUTTON */}
                    <button
                        className="order-item-minus-button"
                        onClick={minusFromCart}
                    >
                        <span className="material-symbols-outlined">-</span>
                    </button>
                    {/* PLUS BUTTON */}
                    <button
                        className="order-item-plus-button"
                        onClick={addToCart}
                    >
                        <span className="material-symbols-outlined">+</span>
                    </button>
                    {/* DELETE ITEM BUTTON */}
                    <button
                        className="cart-item-button"
                        onClick={deleteFromCart}
                    >
                        <span className="material-symbols-outlined">delete</span>
                    </button>
                </div>
            </div>
        </div>
    )
}

export default CartItem;
