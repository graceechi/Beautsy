const CREATE_REVIEW = "products/CREATE_REVIEW";
const GET_REVIEWS = "products/GET_REVIEW";
const UPDATE_REVIEW = "products/UPDATE_REVIEW";
const DELETE_REVIEW = "products/DELETE_REVIEW";

//  ACTIONS
export const addReview = (review) => {
    return {
        type: CREATE_REVIEW,
        review
    }
}

export const readReviews = (reviews) => {
    return {
        type: GET_REVIEWS,
        reviews
    }
}

export const updateReview = (reviewId) => {
    return {
        type: UPDATE_REVIEW,
        reviewId
    }
}

export const removeReview = (reviewId) => {
    return {
        type: DELETE_REVIEW,
        reviewId
    }
}

//  THUNKS
export const createReview = (payload) => async (dispatch) => {

}
