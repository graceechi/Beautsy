import { useDispatch } from "react-redux";
import { cancelOrder } from "../../store/order";

const EditShippingModal = ({ orderId, setShowModal }) => {
  const dispatch = useDispatch();

  const handleOnClick = async (e) => {
    e.preventDefault();
    // await dispatch(cancelOrder(orderId));
    setShowModal(false);
  };
  return (
    <div className="redirect-msg-container">
    <div className="site-name">Beautsy</div>
    <p className="update-shipping-title">Update your shipping info</p>

    {/* insert shipping info form */}

    <button className='submit-update-shipping' onClick={handleOnClick}>Submit</button>
    </div>
);
};

export default EditShippingModal;
