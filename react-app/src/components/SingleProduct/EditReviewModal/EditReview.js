import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { editReview } from "../../../store/review";
import { Modal } from "../../../context/Modal";
import "./editreview.css";
import { loadOneProduct } from "../../../store/products";

const EditReviewModal = ({ review }) => {
    const [showModal, setShowModal] = useState(false);
    const dispatch = useDispatch();
    const user_id = useSelector(state => state?.session?.user.id);
    const { id } = useParams(); // product Id

    const [text, setText] = useState(review.review);
    const [errors, setBackendErrors] = useState([]);

    const handleEdit = async e => {
        const valErrors = [];
        e.preventDefault();

        const payload = {
            review: text,
            user_id,
            product_id: id,
            review_id: review?.id
            // updated_at: Date.now().toLocaleString(),
        }
        dispatch(editReview(payload));
        setShowModal(false);
        setText(text);


    }

    useEffect(() => {
        dispatch(loadOneProduct(id));
        setText(review.review);
    }, [dispatch, id])

    return (
        <>
        <button onClick={() => setShowModal(true)} id='edit-review-btn'>
            <i className="fa-solid fa-pen-to-square"></i>
        </button>
        {showModal && (
            <Modal onClose={() => setShowModal(false)}>
                <form onSubmit={handleEdit}>
                    <div className="edit-review-modal">

                        <div className="input-container">
                            <textarea
                                className="edit-form-input"
                                value={text}
                                onChange={(e) => setText(e.target.value)}
                            />
                        </div>
                        <button className="edit-review-submit-btn" >Edit</button>
                        <button className="cancel-edit-button" onClick={() => setShowModal(false)}>Cancel</button>
                    </div>
                </form>
            </Modal>
        )}
        </>
    );
};

export default EditReviewModal;
