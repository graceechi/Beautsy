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
    const sessionUser = useSelector(state => state.session.user);
    const users = useSelector(state => state?.user?.entries);
    // console.log('-----this should be users array------', users)
    // console.log('THIS IS SESSION USER INFO', sessionUser)
    // const history = useHistory();
    const { id } = useParams(); // product id
    // console.log('--product id--', id)
    const productsObj = useSelector((state) => state?.product?.entries);
    // console.log('products object', productsObj)
    const product = productsObj[id];
    // console.log('product of that product id', product)

    const reviews = useSelector(state => state?.review?.entries)
    // console.log('--this is REVIEWS obj on the page--', reviews)

    let allReviews = Object.values(reviews);
    // console.log('--review array--', allReviews)

    const [newReview, setNewReview] = useState('');

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
            <button>
                Add to Cart
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
