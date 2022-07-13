import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from 'react';
import { editShippingInfo } from "../../store/session";
import { loadOrders } from "../../store/order";

const EditShippingModal = ({ orderId, order, setShowModal }) => {
  const dispatch = useDispatch();
  const sessionUser = useSelector(state => state.session.user);

  const [fullName, setFullName] = useState(sessionUser.full_name);
  const [address, setAddress] = useState(sessionUser.address);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
        full_name: fullName,
        address
    }
    await dispatch(editShippingInfo(payload, sessionUser.id));

    setShowModal(false);
    // setFullName('')
    // setAddress('')
  };


  return (
    <form onSubmit={handleSubmit} className='edit-shipping-form'>

        <div className="site-name">Beautsy</div>
        <p className="update-shipping-title">Update your Shipping Info</p>
        <label>Full Name</label>
        <input
          class="update-shipping-name-input"
          type="text"
          value={fullName}
          onChange={e => setFullName(e.target.value)}
        />
        <label>Address</label>
        <textarea
          class="update-shipping-address-input"
          type="text"
          value={address}
          onChange={e => setAddress(e.target.value)}
        />
        <button type="submit" className='submit-update-shipping'>
          Save
        </button>
        <button className="cancel-edit-shipping-button" onClick={() => setShowModal(false)}>Cancel</button>
    </form>
);
};

export default EditShippingModal;
