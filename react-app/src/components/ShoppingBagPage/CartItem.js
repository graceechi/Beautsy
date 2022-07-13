// goes on Shopping Bag Page
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { loadOrders } from "../../store/order";

import { loadProducts } from "../../store/products";


function CartItem({ item, quantity }) {
    const dispatch = useDispatch()
    const sessionUser = useSelector(state => state.session.user)
    const products = useSelector(state => state?.product?.entries)
    // console.log('this is PRODUCTSSSSSSSS from STATE in CartItem component within Shopping Bag Page', products)
    const product = products[item?.id];
    // console.log('this is PRODUCT in CartItem component within Shopping Bag Page', product)

    console.log('propssss', item, quantity)
    // -----------setting up cart array local storage--------------

    let [amount, setAmount] = useState(quantity);
    let [cart, setCart] = useState({});
    let localCart = localStorage.getItem("cart"); // pertains to the useEfect

    // ----------plus item to LOCAL STORAGE-------------
    const addToCart = (e) => {
        e.preventDefault();

        let cartCopy = {...cart}; // create a copy of cart state

        console.log('this is cart copyyyyy from CartItem page', cartCopy)
        if (cartCopy[product?.id]) {
            cartCopy[product?.id]["quantity"]++; // update item
        } else {
            cartCopy[product?.id] = { "quantity": 1 };
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
        if (cartCopy[product?.id]) {
            cartCopy[product?.id]["quantity"]--; // update item
        } else {
            cartCopy[product?.id] = { "quantity": 0 };
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
        if (cartCopy[product?.id]) {
            delete cartCopy[product?.id]; // delete item
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
            <Link to={`/products/${product?.id}`}>
                <img className="order-item-img" src={product?.image_url} alt={product?.name} />
            </Link>
            <div>
                <Link to={`/products/${product?.id}`}>
                    <div className="order-item-name">{product?.name}</div>
                </Link>
                <div className="order-item-price">${(product?.price).toFixed(2)}</div>
                {/* --------------------quantity select menu, plus/minus/delete buttons-------------------- */}
                <div className="order-quantity-select-menu">
                    <input
                        defaultValue={amount}
                        onChange={(e) => {
                            setAmount(e.target.value);
                        }}
                    >
                    </input>
                    {/* <select
                        value={quantity}
                        onChange={(e) => {
                            setAmount(e.target.value);
                        }}
                    >
                        <option value={1}>1</option>
                        <option value={2}>2</option>
                        <option value={3}>3</option>
                        <option value={4}>4</option>
                        <option value={5}>5</option>
                    </select> */}

                    {/* MINUS BUTTON */}
                    <button
                        className="order-item-minus-button"
                        onClick={minusFromCart}
                        disabled={quantity === 0}
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
