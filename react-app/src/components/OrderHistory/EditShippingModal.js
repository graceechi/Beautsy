import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from 'react';
import { editShippingInfo } from '../../store/order';
import './orderhistory.css';

const EditShippingModal = ({ orderId, order, setShowModal }) => {
  const dispatch = useDispatch();
  const sessionUser = useSelector(state => state.session.user);

  const [fullName, setFullName] = useState('');
  const [address, setAddress] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
        id: orderId,
        full_name: fullName,
        address
    }
    await dispatch(editShippingInfo(payload));

    setShowModal(false);
    // setFullName('')
    // setAddress('')
  };

  useEffect(() => {
    if (order) {
      setFullName(order.full_name)
      setAddress(order.address)
    }
  }, [order])

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
