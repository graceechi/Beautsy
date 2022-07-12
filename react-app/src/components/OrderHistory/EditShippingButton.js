// Edit Shipping button goes on Order History page

import { useState } from "react";
import EditShippingModal from "./EditShippingModal";
import { Modal } from "../../context/Modal";

const EditShippingButton = ({ orderId }) => {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button onClick={() => setShowModal(true)}>Edit</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <EditShippingModal setShowModal={setShowModal} orderId={orderId} />
        </Modal>
      )}
    </>
  );
};

export default EditShippingButton;
