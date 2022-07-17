import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from 'react';
import { editShippingInfo } from '../../store/order';
import './orderhistory.css';

const EditShippingModal = ({ orderId, order, setShowModal }) => {
  const dispatch = useDispatch();
  const sessionUser = useSelector(state => state.session.user);

  const [fullName, setFullName] = useState(order.full_name);
  const [address, setAddress] = useState(order.address);
  const [errors, setErrors] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (fullName.length === 0 && address.length === 0) {
      setShowModal(true);
      setFullName(order.full_name);
      setAddress(order.address);
    } else if (fullName.trim().length === 0 && address.trim().length === 0) {
        setShowModal(true);
        setFullName(order.full_name);
        setAddress(order.address);
    } else if (fullName.length > 30 && address.length > 100) {
        setShowModal(true);
    } else {
        const payload = {
            id: orderId,
            full_name: fullName,
            address
        }
        await dispatch(editShippingInfo(payload));

        setShowModal(false);
        setFullName(fullName)
        setAddress(address)
    }
  };

  useEffect(() => {
    if (fullName && fullName.length >= 30) {
        setErrors(["Full Name should be less than 30 characters."])
    } else if (!fullName && fullName.length === 0) {
        setErrors(["Full Name should be at least 1 character."])
    } else if (fullName.trim().length === 0) {
        setErrors(["Full Name should not be an empty entry."])
    } else if (address && address.length >= 100) {
      setErrors(["Address should be less than 100 characters."])
    } else if (!address && address.length === 0) {
        setErrors(["Address should be at least 1 character."])
    } else if (address.trim().length === 0) {
        setErrors(["Address should not be an empty entry."])
    } else {
        setErrors([])
    }
}, [fullName, address])

  useEffect(() => {
    if (order) {
      setFullName(order.full_name)
      setAddress(order.address)
    }
  }, [order])

  return (
    <form onSubmit={handleSubmit} className='edit-shipping-form'>

        <div className="edit-modal-site-name">Beautsy</div>
        <p className="update-shipping-title">Update your Shipping Info?</p>
        <div>
            {errors.map((error, ind) => (
                <div className='edit-review-error-messages' key={ind}>{error}</div>
            ))}
        </div>
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
        <div className="edit-modal-save-cancel-btns">
          <button className='submit-update-shipping'>
            Save
          </button>
          <button className="cancel-edit-shipping-button" onClick={() => setShowModal(false)}>Cancel</button>
        </div>
    </form>
);
};

export default EditShippingModal;
