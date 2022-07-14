// goes on Shopping Bag Page
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { loadOrders } from "../../store/order";

import { loadProducts } from "../../store/products";


function CartItem({ item, quantity }) {
    const dispatch = useDispatch();
    const history = useHistory();
    const sessionUser = useSelector(state => state.session.user)
    const products = useSelector(state => state?.product?.entries)
    // console.log('this is PRODUCTSSSSSSSS from STATE in CartItem component within Shopping Bag Page', products)
    const product = products[item?.id];
    // console.log('this is PRODUCT in CartItem component within Shopping Bag Page', product)

    // console.log('propssss', item, quantity)
    // -----------setting up cart array local storage--------------


    let [amount, setAmount] = useState(quantity);
    let [cart, setCart] = useState({});
    let localCart = localStorage.getItem("cart"); // pertains to the useEfect

    // ----------plus item to LOCAL STORAGE-------------
    const addToCart = (e) => {
        e.preventDefault();

        let cartCopy = {...cart}; // create a copy of cart state

        // console.log('this is cart copyyyyy from CartItem page', cartCopy)
        if (cartCopy[product?.id]) {
            cartCopy[product?.id]["quantity"]++; // update item
            setAmount(cartCopy[product?.id]["quantity"]);
        } else {
            cartCopy[product?.id] = { "quantity": 1 };
            setAmount(cartCopy[product?.id]["quantity"]);
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
            setAmount(cartCopy[product?.id]["quantity"]);
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
        console.log('1 this is cart copyyyyy from CartItem page', cartCopy)

        if (cartCopy[product?.id]) {
            delete cartCopy[product?.id]; // delete item

        }
        console.log('2 this is cart copyyyyy from CartItem page', cartCopy)

        setCart(cartCopy); // update cart state
        // make cart a string and store in local storage
        localStorage.setItem("cart", JSON.stringify(cartCopy));

        // history.push(`/products/${product?.id}`);
        window.location.reload(false);
    }

    // const clearCart = (e) => {
    //     e.preventDefault();

    //     setCart([]);
    //     localStorage.setItem("cart", JSON.stringify([]));
    // }


    useEffect(() => {
        // change into JS
        localCart = JSON.parse(localCart);
        // load persisted cart into state if it exists
        if (localCart) setCart(localCart); // if localCart is not null
    }, []) // the empty array ensures useEffect only runs once

    // useEffect(() => {
    //     window.addEventListener('cart', () => {
    //         setCart(JSON.parse(localStorage.getItem('cart')))
    //     })
    // })

    useEffect(() => {
        dispatch(loadProducts());
        dispatch(loadOrders(sessionUser.id))

    }, [dispatch, sessionUser.id])

    useEffect(() => {
        if (quantity) {
            setAmount(quantity);
        }
    }, [quantity])


    return (
        <div className="order-item">
            <Link to={`/products/${product?.id}`}>
                <img className="order-item-img" src={product?.image_url} alt={product?.name} />
            </Link>
            <div>
                <Link to={`/products/${product?.id}`}>
                    <div className="order-item-name">{product?.name}</div>
                </Link>
                <div className="order-item-price">${(product?.price)?.toFixed(2)}</div>
                {/* --------------------quantity select menu, plus/minus/delete buttons-------------------- */}
                <div className="order-quantity-select-menu">
                    <input
                        readOnly="readonly"
                        value={amount}
                        onChange={(e) => {
                            setAmount(e.target.value);
                        }}
                    >
                    </input>

                    {/* MINUS BUTTON */}
                    <button
                        className="order-item-minus-button"
                        onClick={quantity>0 ? minusFromCart : deleteFromCart}

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
                        <i className="fa-solid fa-trash-can"></i>
                    </button>
                </div>
            </div>
        </div>
    )
}

export default CartItem;
