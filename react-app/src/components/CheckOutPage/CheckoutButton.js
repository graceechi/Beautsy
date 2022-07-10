import { useState } from "react";
import Redirect from "./Redirect";
import { Modal } from "../../context/Modal";

import "./checkout.css";

const CheckOutButton = ({orderItems, onSubmit}) => {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button
        onClick={(e) => {setShowModal(true)}}
        className='complete-checkout-btn'
      >
        <span>Complete Checkout</span>
      </button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <Redirect setShowModal={setShowModal} onSubmit={onSubmit}/>
        </Modal>
      )}
    </>
  );
};

export default CheckOutButton;
