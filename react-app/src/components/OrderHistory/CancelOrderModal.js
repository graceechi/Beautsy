import { useDispatch } from "react-redux";
import { cancelOrder } from "../../store/order";
import './orderhistory.css';

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
      <p className="redirect-msg">Are you sure you want to delete this order?</p>
      <button onClick={handleOnClick}>Delete Order</button>
      <button className="cancel-delete-button" onClick={() => setShowModal(false)}>Cancel</button>
    </div>
  );
};

export default CancelOrderModal;
