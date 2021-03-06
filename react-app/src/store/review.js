const CREATE_REVIEW = "products/CREATE_REVIEW";
const GET_REVIEWS = "products/GET_REVIEWS";
const UPDATE_REVIEW = "products/UPDATE_REVIEW";
const DELETE_REVIEW = "products/DELETE_REVIEW";

//  ACTIONS
export const addReview = (review) => {
    return {
        type: CREATE_REVIEW,
        review
    }
}

export const getReviews = (reviews) => {
    return {
        type: GET_REVIEWS,
        reviews
    }
}

export const updateReview = (review) => {
    return {
        type: UPDATE_REVIEW,
        review
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
    const res = await fetch(`/api/reviews/`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
    });
    if (res.ok) {
        const data = await res.json();
        dispatch(addReview(data))
    } else if (res.status < 500) {
        const data = await res.json();
        if (data.errors) {
          return data.errors;
        }
      } else {
        return "An error occurred. Please try again.";
      }
}

export const loadReviews = (id) => async (dispatch) => {
    // passing in productId?
    const res = await fetch(`/api/reviews/${id}`);

    if (res.ok) {
      const reviews = await res.json();
      dispatch(getReviews(reviews));
    } else if (res.status < 500) {
      const data = await res.json();
      if (data.errors) {
        return data.errors;
      }
    } else {
      return ["An error occurred. Please try again."];
    }
};

export const editReview = (payload) => async (dispatch) => {
    // console.log('---AM I HITTING EDIT REVIEW THUNK??---', payload)
    // const id = payload.product_id;
    // console.log('---this is the THUNK PRODUCT ID-----', payload.review_id)
    const res = await fetch(`/api/reviews/${payload.review_id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });
    if (res.ok) {
      const data = await res.json();
      dispatch(updateReview(data));
      return data;
    } else if (res.status < 500) {
      const data = await res.json();
      if (data.errors) {
        return data.errors;
      }
    } else {
      return ["An error occurred. Please try again."];
    }
};

export const deleteReview = (reviewId) => async (dispatch) => {
    const res = await fetch(`/api/reviews/${reviewId}`, {
      method: "DELETE",
    });

    if (res.ok) {
      const data = await res.json();
      dispatch(removeReview(reviewId));
      return null;
    } else if (res.status < 500) {
      const data = await res.json();
      if (data.errors) {
        return data;
      }
    } else {
      return ["An error occurred. Please try again."];
    }
};

// REDUCER
const initialState = { entries: {}, isLoading: true};

const reviewReducer = (state = initialState, action) => {
    let newState;
    switch (action.type) {
        case CREATE_REVIEW:
            newState = {
                ...state, entries: {
                    ...state.entries,
                    [action.review.id]: action.review
                }
            }
            return newState
        case GET_REVIEWS:
            newState = { entries: {} }
            action.reviews.forEach(review => {newState.entries[review.id] = review})
            return newState
        case UPDATE_REVIEW:
            newState = { ...state, entries: { ...state.entries }}
            newState.entries[action.review.id] = action.review
            return newState
        case DELETE_REVIEW:
            newState = { ...state, entries: { ...state.entries } }
            delete newState.entries[action.reviewId]
            return newState
        default:
            return state;
    }
}

export default reviewReducer;
