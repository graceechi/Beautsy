import { useEffect } from 'react';
import { useHistory, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import './singleproduct.css';
import { loadOneProduct, loadProducts } from "../../store/products";
import { loadReviews } from '../../store/review';

const SingleProduct = () => {
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user);
    // const history = useHistory();
    const { id } = useParams();
    console.log('--product id--', id)
    const productsObj = useSelector((state) => state?.product?.entries);
    // console.log('products object', productsObj)
    const product = productsObj[id];
    console.log('product of that product id', product)

    const reviews = useSelector(state => state?.review?.entries)
    console.log('--this is SEEDED REVIEWS obj--', reviews)

    let allReviews = Object.values(reviews);
    console.log('--review array--', allReviews)

    useEffect(() => {
        dispatch(loadProducts());
        dispatch(loadOneProduct(id));
        // should be passing in productid below?
        dispatch(loadReviews(id))
    }, [dispatch, id])

    return (
      <div className="single-product-container">
        <h1>SINGLE PRODUCT PAGE</h1>
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
        <div className="reviews-container">
            {allReviews.map((review) => (
                <div className="review" key={`${review.id}`}>
                    <div className="review-details">

                        <div className='review-text'>{review.review}</div>
                        <div className='review-user'>{`@${review.user_id}`}</div>
                        <div className='review-date'>{`${(review.updated_at)}`}</div>

                        {/* {review.User.id === sessionUser.id ? (

                            <DeleteReviewModal review={review} />

                        ) : (
                            ""
                        )} */}

                    </div>
                </div>
            ))}
            {/* <hr id='create-comment-hr' /> */}
            {/* insert add comment textbox */}
            {/* <div className='create-comment-container'>
                <form onSubmit={addComment}>
                    <textarea className='create-comment-box' value={newComment} onChange={e => setNewComment(e.target.value)} placeholder=" Leave a comment!" required ></textarea>
                    <button id='create-comment-btn'>Comment</button>
                </form>
            </div> */}
        </div>
      </div>
    );
  };

  export default SingleProduct;
