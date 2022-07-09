// ORDER_ITEMS shopping cart

const GET_ITEMS = "cart/GET_ITEMS";
const ADD_ITEM = "cart/ADD_ITEM";
const UPDATE_QUANTITY = "cart/UPDATE_QUANTITY";
const REMOVE_ITEM = "cart/REMOVE_ITEM";
const CLEAR_ITEMS = "cart/CLEAR_ITEMS";

// --------------- ACTIONS ---------------

export const getItems = (items) => {
    return {
        type: GET_ITEMS,
        items
    }
}

export const addItem = (item) => {
    return {
        type: ADD_ITEM,
        item
    }
}

export const updateQuantity = (userId, productId, quantity) => {
    if (quantity < 1) return removeOrderItem(userId, productId)
    return {
        type: UPDATE_QUANTITY,
        userId,
        productId
    }
}

export const removeItem = (productId) => {
    return {
        type: REMOVE_ITEM,
        productId
    }
}

export const clearItems = () => {
    return {
        type: CLEAR_ITEMS
    }
}

// --------------- THUNKS ---------------

// addOrderItem
export const addOrderItem = (payload) => async(dispatch) => {
    const res = await fetch(`/api/orderItem/`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
    })
    if (res.ok) {
        const data = await res.json();
        dispatch(addItem(data));
        return data;
      } else if (res.status < 500) {
        const data = await res.json();
        if (data.errors) {
          return data.errors;
        }
      } else {
        return "An error occurred. Please try again.";
      }
}

// updateOrderItemQuantity
export const updateOrderItemQuantity = (payload) => async (dispatch) => {
    const res = await fetch(`/api/orderItem/${payload.user_id}/${payload.product_id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });
    if (res.ok) {
      const data = await res.json();
      dispatch(updateQuantity(data.user_id, data.product_id, data.quantity));
      return null;
    } else if (res.status < 500) {
      const data = await res.json();
      if (data.errors) {
        return data.errors;
      }
    } else {
      return "An error occurred. Please try again.";
    }
};

// removeOrderItem
export const removeOrderItem = (userId, productId) => async (dispatch) => {
    const res = await fetch(`/api/orderItem/${userId}/${productId}`, {
      method: "DELETE",
    });

    if (res.ok) {
      const data = await res.json();
      dispatch(removeItem(productId));
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

// clearOrderItems
export const clearOrderItems = (userId) => async (dispatch) => {
    const res = await fetch(`/api/orderItem/${userId}/clear`, {
      method: "DELETE",
    });

    if (res.ok) {
      const data = await res.json();
      dispatch(clearItems());
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

// --------------- ORDER_ITEMS REDUCER ---------------
const initialState = { entries: {}, isLoading: true};
const orderItemReducer = (state = initialState, action) => {
    let newState;
    switch (action.type) {
        case GET_ITEMS:
            newState = { ...state, entries: {...state.entries} }
            action.items.forEach(item => {newState.entries[item.id] = item})
            return newState
        case ADD_ITEM:
            newState = {
                ...state, entries: {
                    ...state.entries,
                    [action.item.product_id]: action.item
                }
            }
            return newState
        case UPDATE_QUANTITY:
            return {
                ...state,
                [action.productId]: {
                  ...state[action.productId],
                  quantity: action.quantity,
                },
              };
        case REMOVE_ITEM:
            newState = { ...state, entries: { ...state.entries } }
            delete newState.entries[action.productId]
            return newState
        case CLEAR_ITEMS:
            return initialState;
        default:
            return state;
    }

}

export default orderItemReducer;
