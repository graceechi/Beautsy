const GET_USERS = 'users/GET_USERS';

export const getUsers = (users) => ({
    type: GET_USERS,
    users
});

export const loadUsers = () => async (dispatch) => {
    const res = await fetch(`/api/users/`);
    console.log('Did i hit this ALL USERS thunk???')
    if (res.ok) {
        const users = await res.json();
        dispatch(getUsers(users));
    } else if (res.status < 500) {
        const data = await res.json();
        if (data.errors) {
          return data.errors;
        }
    } else {
        return ["An error occurred. Please try again."];
    }
}

const initialState = { entries: {}, isLoading: true};

const userReducer = (state = initialState, action) => {
    let newState;
    switch (action.type) {
        case GET_USERS:
            newState = { ...state, entries: {...state.entries} }
            action.users.forEach(user => {newState.entries[user.id] = user})
            return newState
        default:
            return state;
    }
}

export default userReducer;
