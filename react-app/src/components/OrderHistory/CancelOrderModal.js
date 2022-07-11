import { useDispatch } from "react-redux";
import { cancelOrder } from "../../store/order";

const CancelOrderModal = ({ orderId, setShowModal }) => {
  const dispatch = useDispatch();

  const handleOnClick = async (e) => {
    e.preventDefault();
    await dispatch(cancelOrder(orderId));
    setShowModal(false);
  };
  return (
    <div className="redirect-msg-container">
      <div className="site-name">Beautsy</div>
      <p className="redirect-msg">Are you sure you want to cancel this order?</p>
      <button onClick={handleOnClick}>Cancel Order</button>
    </div>
  );
};

export default CancelOrderModal;
