// Cancel button goes on Order History page

import { useState } from "react";
import CancelOrderModal from "./CancelOrderModal";
import { Modal } from "../../context/Modal";

const CancelOrderButton = ({ orderId }) => {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button id='delete-order-btn' onClick={() => setShowModal(true)}>Delete</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <CancelOrderModal setShowModal={setShowModal} orderId={orderId} />
        </Modal>
      )}
    </>
  );
};

export default CancelOrderButton;
