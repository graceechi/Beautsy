// constants
const SET_USER = 'session/SET_USER';
const REMOVE_USER = 'session/REMOVE_USER';
// const UPDATE_SHIPPING_INFO = 'session/UPDATE_SHIPPING_INFO';

const setUser = (user) => ({
  type: SET_USER,
  payload: user
});

const removeUser = () => ({
  type: REMOVE_USER,
})

// const updateShippingInfo = (user) => ({
//   type: UPDATE_SHIPPING_INFO,
//   user
// })

const initialState = { user: null };

export const authenticate = () => async (dispatch) => {
  const response = await fetch('/api/auth/', {
    headers: {
      'Content-Type': 'application/json'
    }
  });
  if (response.ok) {
    const data = await response.json();
    if (data.errors) {
      return;
    }

    dispatch(setUser(data));
  }
}

export const login = (email, password) => async (dispatch) => {
  const response = await fetch('/api/auth/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      email,
      password
    })
  });


  if (response.ok) {
    const data = await response.json();
    dispatch(setUser(data))
    return null;
  } else if (response.status < 500) {
    const data = await response.json();
    if (data.errors) {
      return data.errors;
    }
  } else {
    return ['An error occurred. Please try again.']
  }

}

export const logout = () => async (dispatch) => {
  const response = await fetch('/api/auth/logout', {
    headers: {
      'Content-Type': 'application/json',
    }
  });

  if (response.ok) {
    dispatch(removeUser());
  }
};


export const signUp = (fullName, username, address, email, password) => async (dispatch) => {
  const response = await fetch('/api/auth/signup', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      fullName,
      username,
      address,
      email,
      password
    }),
  });

  if (response.ok) {
    const data = await response.json();
    dispatch(setUser(data))
    return null;
  } else if (response.status < 500) {
    const data = await response.json();
    if (data.errors) {
      return data.errors;
    }
  } else {
    return ['An error occurred. Please try again.']
  }
}

// // to update shipping info on order history page
// export const editShippingInfo = (payload, userId) => async (dispatch) => {
//   console.log('AAAAM I HITTING UPDATE SHIPPING THUNKKK')
//   const res = await fetch(`/api/users/${userId}`, {
//     method: "PUT",
//     headers: {
//       "Content-Type": "application/json"
//     },
//     body: JSON.stringify(payload)
//   });
//   console.log('DID I PASSS THE FETCH', res)
//   if (res.ok) {
//     const data = await res.json();
//     console.log('THIS IS DATAAAA', data)
//     dispatch(updateShippingInfo(data));
//   } else if (res.status < 500) {
//     const data = await res.json();
//     if (data.errors) {
//       return data.errors;
//     }
//   } else {
//     return ["An error occured. Please try again."];
//   }

// }


export default function reducer(state = initialState, action) {
  switch (action.type) {
    case SET_USER:
      return { user: action.payload }
    case REMOVE_USER:
      return { user: null }
    // case UPDATE_SHIPPING_INFO:
    //   return {...state, user: {...state.user, full_name: action.user.full_name, address: action.user.address }}
    default:
      return state;
  }
}
