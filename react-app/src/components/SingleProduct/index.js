import { useHistory, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import './singleproduct.css';

const SingleProduct = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const { productId } = useParams();
    const product = useSelector((state) => state.products[productId]);
    console.log('product of that product id', product)

    // useEffect(() => {
    //     dispatch(loadProducts());
    // }, [dispatch])

    return (
      <div className="single-product-container">
        <img
          src={product?.image_url}
          alt={product?.name}
          className="single-product-image"
        />
        <div className="single-product-info">
          <div className="single-product-name">{product?.name}</div>
          <div>${product?.price}</div>
          <div className="single-product-description">{product?.description}</div>
        </div>
      </div>
    );
  };

  export default SingleProduct;
