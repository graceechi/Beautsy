const GET_SEARCH_PRODUCTS = 'search/searchProducts'

export const getSearchProducts = (products) => {
    return {
        type: GET_SEARCH_PRODUCTS,
        products
    }
}

export const searchProducts = () => async (dispatch) => {
    const response = await fetch('/api/search/')

    if (response.ok) {
        const data = await response.json()
        dispatch(getSearchProducts(data))
    }
}

let initialState = {
    entries: {}, isLoading: true
}

export default function searchReducer(state=initialState, action) {
    switch (action.type) {
        case GET_SEARCH_PRODUCTS:
            return {
                entries: action.products
            }
        default:
            return state;
    }
}
