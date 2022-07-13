import { useDispatch, useSelector } from "react-redux";
import { useState } from 'react';
import { editShippingInfo } from "../../store/session";

const EditShippingModal = ({ orderId, setShowModal }) => {
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
  };
  return (
    <form onSubmit={handleSubmit} className='edit-shipping-form'>

        <div className="site-name">Beautsy</div>
        <p className="update-shipping-title">Update your Shipping Info</p>
        <label>Full Name</label>
        <input
          type="text"
          value={fullName}
          onChange={e => setFullName(e.target.value)}
        />
        <label>Address</label>
        <input
          type="text"
          value={address}
          onChange={e => setAddress(e.target.value)}
        />
        <button type="submit" className='submit-update-shipping'>
          Save
        </button>

    </form>
);
};

export default EditShippingModal;
