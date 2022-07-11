import { useEffect, useState } from 'react';
import { useHistory, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import './singleproduct.css';
import { loadOneProduct, loadProducts } from "../../store/products";
import { loadReviews, createReview } from '../../store/review';
import DeleteReviewModal from './DeleteReviewModal/DeleteReview';
import EditReviewModal from './EditReviewModal/EditReview';
import { loadUsers } from '../../store/user';

import { addOrderItem, updateOrderItemQuantity } from '../../store/order_item';
import { createOrder, loadOrders } from '../../store/order';

const SingleProduct = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const sessionUser = useSelector(state => state.session.user);
    const users = useSelector(state => state?.user?.entries);
    const { id } = useParams(); // product id
    const productsObj = useSelector((state) => state?.product?.entries);
    const product = productsObj[id];
    // console.log('product of that product id', product)

    const reviews = useSelector(state => state?.review?.entries)
    let allReviews = Object.values(reviews); // reviewsArr

    const [newReview, setNewReview] = useState('');

    // ----------create review-------------
    const addReview = async e => {
        e.preventDefault();

        const review = {
            review: newReview,
            user_id: sessionUser.id,
            product_id: id
        }
        dispatch(createReview(review));
        setNewReview('');
    }

    // -----------setting up cart array local storage--------------
    let [cart, setCart] = useState([]);
    let localCart = JSON.parse(localStorage.getItem("cart"));

    // ----------add item to LOCAL STORAGE-------------
    const addToCart = (product) => {
        let cartCopy = [...cart]; // create a copy of cart state
        let { id } = product; // product id
        console.log('THIS IS PRODUCT ID FOR LOCAL STORAGE', id)


        let existingItem = cartCopy.find(cartItem => cartItem.id === id); // look for item in cart array
        if (existingItem) {
            existingItem.quantity += product.quantity // update item
        } else {
            cartCopy.push(product);
        }
        cartCopy.push(product);


        setCart(cartCopy); // update cart state
        // make cart a string and store in local storage
        localStorage.setItem("cart", JSON.stringify(cartCopy));
    };

    // this is called on component mount

    useEffect(() => {
        // load persisted cart into state if it exists
        if (localCart) setCart(localCart);
    }, [localCart]) // the empty array ensures useEffect only runs once


    useEffect(() => {
        // id is product id
        dispatch(loadProducts());
        dispatch(loadOneProduct(id));
        dispatch(loadUsers());
        dispatch(loadReviews(id));
    }, [dispatch, id])

    return (
      <div className="single-product-container">
        {/* -----------------SINGLE PRODUCT DETAILS-------------------- */}
        <img
          src={product?.image_url}
          alt={product?.name}
          className="single-product-image"
        />
        <div className="single-product-info">
          <div className="single-product-name">{product?.name}</div>
          <div>${product?.price.toFixed(2)}</div>
          <div className="single-product-description">{product?.description}</div>
        </div>
        {/* -----------------ADD TO CART BUTTON-------------------- */}
        <div>
            <button
                className='add-to-bag-btn'
                onClick={addToCart( product )}
            >
                Add to Bag <span> </span>
                <i className="fa-solid fa-bag-shopping" />
            </button>
        </div>
        <hr></hr>
        {/* -----------------VIEW REVIEWS---------------- */}
        <div className="reviews-container">
            {allReviews && allReviews.map((review) => (
                <div className="review" key={`${review.id}`}>
                    <div className="review-details">

                        <div className='review-text'>{review.review}</div>
                        <div className='review-user'>{`@${users && users[review.user_id]?.username}`}</div>
                        <div className='review-date'>{review.updated_at}</div>

                        {/* -------------REVIEW EDIT/DELETE BUTTONS----------- */}
                        {review.user_id === sessionUser.id ? (
                            <>
                                <EditReviewModal review={review} />
                                <DeleteReviewModal review={review} />
                            </>

                        ) : (
                            ""
                        )}

                    </div>
                </div>
            ))}
            {/* -------------CREATE REVIEW TEXTBOX----------------- */}
            <hr id='create-review-hr' />
            {/* insert add review textbox */}
            <div className='create-review-container'>
                <form onSubmit={addReview}>
                    <textarea className='create-review-box' value={newReview} onChange={e => setNewReview(e.target.value)} placeholder=" Leave a Review!" required ></textarea>
                    <button id='create-review-btn'>Review</button>
                </form>
            </div>
        </div>
      </div>
    );
  };

  export default SingleProduct;
