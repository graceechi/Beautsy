import { useEffect } from 'react';
import { useHistory, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import './singleproduct.css';
import { loadOneProduct, loadProducts } from "../../store/products";
import { loadReviews } from '../../store/review';

const SingleProduct = () => {
    const dispatch = useDispatch();
    // const history = useHistory();
    const { id } = useParams();
    console.log('--product id--', id)
    const productsObj = useSelector((state) => state?.product?.entries);
    // console.log('products object', productsObj)
    const product = productsObj[id];
    console.log('product of that product id', product)

    const reviewObj = useSelector(state => state?.review?.entries)
    console.log('--this is ALL 10 SEEDED REVIEWS obj--', reviewObj) // need to FILTER

    useEffect(() => {
        dispatch(loadProducts());
        dispatch(loadOneProduct(id));
        dispatch(loadReviews())
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
      </div>
    );
  };

  export default SingleProduct;
