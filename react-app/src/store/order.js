import { loadProducts } from './products';
const GET_ORDERS = "products/GET_ORDERS";
const CREATE_ORDER = "products/CREATE_ORDER";
const REMOVE_ORDER = "products/REMOVE_ORDER";
const CLEAR_ORDERS = "products/CLEAR_ORDERS";
const UPDATE_SHIPPING_INFO = 'orders/UPDATE_SHIPPING_INFO';

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

const updateShippingInfo = (payload) => ({
  type: UPDATE_SHIPPING_INFO,
  payload
})

// export const resetOrders = () => {
//     return {
//         type: CLEAR_ORDERS,
//     }
// };

// --------THUNKS-------------

// get all orders
export const loadOrders = (userId) => async(dispatch) => {
  // console.log('-----DID I HIT LOAD ORDERS THUNK???')
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
    // console.log('----------thisss is payload from create an order--rrrr', payload)
    const response = await fetch(`/api/orders/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });
    if (response.ok) {
      const data = await response.json();
      // console.log('------this is the dataaaa if an order is succesffulyyy createeeddd', data) // array of obj
      dispatch(addOrder(data));
      // return data;
      // dispatch(loadProducts());
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
    // console.log('-----DID I HIT DELETE ORDERS THUNK???')
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

// to update shipping info on order history page
export const editShippingInfo = (payload) => async (dispatch) => {
  // console.log('AAAAM I HITTING UPDATE SHIPPING THUNKKK')
  const res = await fetch(`/api/orders/${payload.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(payload)
  });
  // console.log('DID I PASSS THE FETCH', res)
  if (res.ok) {
    const data = await res.json();
    // console.log('THIS IS DATAAAA', data)
    dispatch(updateShippingInfo(data));
  } else if (res.status < 500) {
    const data = await res.json();
    if (data.errors) {
      return data.errors;
    }
  } else {
    return ["An error occured. Please try again."];
  }

}


// ---------------REDUCER-------------------
const initialState = { entries: {}, isLoading: true};

const orderReducer = (state = initialState, action) => {
    let newState;
    let entries;
    switch (action.type) {
        case GET_ORDERS:
            newState = { ...state, entries: {...state.entries} }
            action.orders.forEach(order => {newState.entries[order.id] = order})
            return newState
        case CREATE_ORDER:
          newState = { ...state }
          entries = { ...state.entries, [action.order.id]: action.order }
          newState.entries = entries
          return newState

          // newState = {
          //     ...state, entries: {
          //         ...state.entries,
          //         [action.order.id]: action.order
          //     }
          // }
          // return newState
        case REMOVE_ORDER:
            newState = { ...state, entries: { ...state.entries } }
            delete newState.entries[action.orderId];
            return newState;
        // case CLEAR_ORDERS:
        //     return initialState;
        case UPDATE_SHIPPING_INFO:
          newState = { ...state }
          entries = { ...state.entries }
          entries[action.payload.id] = action.payload
          newState.entries = entries
          return newState
          // newState = { ...state, entries: { ...state.entries }}
          // newState.entries[action.payload.id] = action.payload
          // return newState
          // return {...state, user: {...state.user, full_name: action.user.full_name, address: action.user.address }}
        default:
            return state;
    }
}

export default orderReducer;
