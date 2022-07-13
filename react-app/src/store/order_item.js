// so far only creating order items when i create an order

const GET_ITEMS = "cart/GET_ITEMS";
const CREATE_ITEM = "cart/ADD_ITEM";
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

// create order item
export const addItem = (item) => {
    return {
        type: CREATE_ITEM,
        item
    }
}

export const updateQuantity = (orderId, productId, quantity) => {
    if (quantity < 1) return removeOrderItem(orderId, productId)
    return {
        type: UPDATE_QUANTITY,
        orderId,
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

// getting order items
export const loadOrderItems = (id) => async (dispatch) => {
  // passing in order_item id
  const res = await fetch(`/api/orderItem/${id}`);

  if (res.ok) {
    const items = await res.json();
    dispatch(getItems(items));
  } else if (res.status < 500) {
    const data = await res.json();
    if (data.errors) {
      return data.errors;
    }
  } else {
    return ["An error occurred. Please try again."];
  }
};


// create order_item
export const createOrderItem = (payload) => async(dispatch) => {
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
    const res = await fetch(`/api/orderItem/${payload.order_id}/${payload.product_id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });
    if (res.ok) {
      const data = await res.json();
      dispatch(updateQuantity(data.order_id, data.product_id, data.quantity));
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
export const removeOrderItem = (orderId, productId) => async (dispatch) => {
    const res = await fetch(`/api/orderItem/${orderId}/${productId}`, {
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
export const clearOrderItems = () => async (dispatch) => {
    const res = await fetch(`/api/orderItem/clear`, {
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
        case CREATE_ITEM:
            newState = {
                ...state, entries: {
                    ...state.entries,
                    [action.item.id]: action.item
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
