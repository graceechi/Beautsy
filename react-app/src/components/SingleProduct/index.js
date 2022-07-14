import { useEffect, useState } from 'react';
import { useHistory, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import './singleproduct.css';
import { loadOneProduct, loadProducts } from "../../store/products";
import { loadReviews, createReview } from '../../store/review';
import DeleteReviewModal from './DeleteReviewModal/DeleteReview';
import EditReviewModal from './EditReviewModal/EditReview';
import { loadUsers } from '../../store/user';


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

    let [cart, setCart] = useState({});
    let localCart = localStorage.getItem("cart"); // pertains to the useEfect

    // ----------add item to LOCAL STORAGE-------------
    const addToCart = (e) => {
        e.preventDefault();

        let cartCopy = {...cart}; // create a copy of cart state

        // console.log('this is cart copyyyyy from Single Product page', cartCopy)
        if (cartCopy[id]) {
            cartCopy[id]["quantity"]++; // update item
        } else {
            cartCopy[id] = { "quantity": 1 };
        }

        setCart(cartCopy); // update cart state
        // make cart a string and store in local storage
        localStorage.setItem("cart", JSON.stringify(cartCopy));
    };

    useEffect(() => {
        // change into JS
        localCart = JSON.parse(localCart);
        // load persisted cart into state if it exists
        if (localCart) setCart(localCart); // if localCart is not null
    }, []) // the empty array ensures useEffect only runs once


    useEffect(() => {
        // id is product id
        dispatch(loadProducts());
        dispatch(loadOneProduct(id));
        dispatch(loadUsers());
        dispatch(loadReviews(id));
    }, [dispatch, id])

    return (
        <>
        {allReviews &&
            <>
      <div className="single-product-container">
        {/* -----------------SINGLE PRODUCT DETAILS-------------------- */}

        <div className="single-product-info">
            <div className='single-product-left-box'>
                <img
                src={product?.image_url}
                alt={product?.name}
                className="single-product-image"
                />
            </div>
            <div className='songle-product-right-box'>
                <div className="single-product-name">{product?.name}</div>
                <div>${product?.price.toFixed(2)}</div>
                <div className="single-product-description">{product?.description}</div>
                <br></br>

                {/* -----------------ADD TO CART BUTTON-------------------- */}
                <div>
                    { sessionUser ? <button
                        className='add-to-bag-btn'
                        onClick={addToCart}
                    >
                        Add to Bag <span> </span>
                        <i className="fa-solid fa-bag-shopping" />
                    </button>
                    :
                    <div className='non-user-add-to-bag-note'>Log in or sign up to add to bag!</div>
                    }
                </div>
            </div>
        </div>
        <br></br>
        {/* -----------------VIEW REVIEWS---------------- */}
        <div className="reviews-container">
            {allReviews && allReviews.map((review) => (
                <div className="review" key={`${review.id}`}>
                    <div className="review-details">

                        <div>{review.review}</div>
                        <div>@{users[review.user_id]?.username}</div>
                        <div>{(review.updated_at).slice(0, 16)}</div>

                        {/* -------------REVIEW EDIT/DELETE BUTTONS----------- */}
                            {sessionUser && review.user_id === sessionUser.id ? (
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
            {sessionUser ?
                (<div className='create-review-container'>
                    <form onSubmit={addReview}>
                        <textarea className='create-review-box' value={newReview} onChange={e => setNewReview(e.target.value)} placeholder=" Leave a Review!" required ></textarea>
                        <button id='create-review-btn'>Review</button>
                    </form>
                </div>)
            : ""
            }
        </div>
      </div>
      </>
    }
    </>
    );
};

export default SingleProduct;
