import React, { useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
// import { useHistory, useParams } from 'react-router-dom';
import { deleteReview } from "../../../store/review";
import { Modal } from "../../../context/Modal";
import "./deletereview.css";

const DeleteReviewModal = ({ review }) => {
    const [showModal, setShowModal] = useState(false);
    const dispatch = useDispatch();
    // const history = useHistory();

    const handleDelete = async e => {
        e.preventDefault();
        dispatch(deleteReview(review.id));
        setShowModal(false);
    }

    return (
        <>
        <button onClick={() => setShowModal(true)} id='remove-review-btn'>
            <i className="fa-solid fa-trash-can"></i>
        </button>
        {showModal && (
            <Modal onClose={() => setShowModal(false)}>
                <div className="delete-review-modal">
                    <div className="delete-review-header">Are you sure you want to delete your review?</div>

                    <button className="delete-review-button" onClick={handleDelete}>Delete</button>
                    <button className="cancel-review-button" onClick={() => setShowModal(false)}>Cancel</button>
                </div>
            </Modal>
        )}
        </>
    );
};

export default DeleteReviewModal;
