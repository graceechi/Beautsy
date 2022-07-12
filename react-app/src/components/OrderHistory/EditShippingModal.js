import { useDispatch, useSelector } from "react-redux";
import { useState } from 'react';
import { editShippingInfo } from "../../store/session";

const EditShippingModal = ({ orderId, setShowModal }) => {
  const dispatch = useDispatch();
  const sessionUser = useSelector(state => state.session.user);

  const [fullName, setFullName] = useState(sessionUser.full_name);
  const [address, setAddress] = useState(sessionUser.address);

  const handleOnClick = async (e) => {
    e.preventDefault();

    const payload = {
        full_name: fullName,
        address
    }
    await dispatch(editShippingInfo(payload, sessionUser.id));

    setShowModal(false);
  };
  return (
    <form onSubmit={handleOnClick} className='edit-shipping-form'>

        <div className="redirect-msg-container">
        <div className="site-name">Beautsy</div>
        <p className="update-shipping-title">Update your Shipping Info</p>


        <button className='submit-update-shipping'>Save</button>
        </div>
    </form>
);
};

export default EditShippingModal;
