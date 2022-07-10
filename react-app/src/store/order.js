import { loadProducts } from './products';
const GET_ORDERS = "products/GET_ORDERS";
const CREATE_ORDER = "products/CREATE_ORDER";
const REMOVE_ORDER = "products/REMOVE_ORDER";
const CLEAR_ORDERS = "products/CLEAR_ORDERS";

// ----------ACTIONS---------------
export const getOrders = (orders) => {
    return {
      type: GET_ORDERS,
      orders
    }
};

export const addOrder = (order) => {
    return {
        type: CREATE_ORDER,
        order
    }
};

export const removeOrder = (orderId) => {
    return {
        type: REMOVE_ORDER,
        orderId
    }
};

export const resetOrders = () => {
    return {
        type: CLEAR_ORDERS,
    }
};

// --------THUNKS-------------

// get all orders
export const loadOrders = (userId) => async(dispatch) => {
    const res = await fetch(`/api/orders/${userId}`);
    if (res.ok) {
        const orders = await res.json();
        dispatch(getOrders(orders));
      } else if (res.status < 500) {
        const data = await res.json();
        if (data.errors) {
          return data.errors;
        }
      } else {
        return ["An error occurred. Please try again."];
      }
}

// create an order
export const createOrder = (payload) => async (dispatch) => {
    const response = await fetch(`/api/orders/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });
    if (response.ok) {
      const data = await response.json();
      dispatch(addOrder(data));
      dispatch(loadProducts());
      return null;
    } else if (response.status < 500) {
      const data = await response.json();
      if (data.errors) {
        return data.errors;
      }
    } else {
      return "An error occurred. Please try again.";
    }
};

// delete an order
export const cancelOrder = (orderId) => async (dispatch) => {
    const response = await fetch(`/api/orders/${orderId}`, {
      method: "DELETE",
    });

    if (response.ok) {
      const data = await response.json();
      dispatch(removeOrder(orderId));
      return data;
    } else if (response.status < 500) {
      const data = await response.json();
      if (data.errors) {
        return data;
      }
    } else {
      return ["An error occurred. Please try again."];
    }
};

// clear all orders


// ---------------REDUCER-------------------
const initialState = { entries: {}, isLoading: true};

const orderReducer = (state = initialState, action) => {
    let newState;
    switch (action.type) {
        case GET_ORDERS:
            newState = { ...state, entries: {...state.entries} }
            action.orders.forEach(order => {newState.entries[order.id] = order})
            return newState
        case CREATE_ORDER:
            newState = { ...state, entries: { ...state.entries } }
            newState = Object.assign(action.payload, newState);
            return newState
            // newState = {
            //     ...state, entries: {
            //         ...state.entries,
            //         [action.payload.id]: action.payload
            //     }
            // }
            // return newState
        case REMOVE_ORDER:
            newState = { ...state, entries: { ...state.entries } }
            delete newState.entries[action.orderNumber];
            return newState;
        case CLEAR_ORDERS:
            return initialState;
        default:
            return state;
    }
}

export default orderReducer;
