const GET_PRODUCTS = "products/GET_PRODUCTS";
const SINGLE_PRODUCT = "products/SINGLE_PRODUCT";

export const getProducts = (products) => {
    return {
        type: GET_PRODUCTS,
        products
    }
};

export const getOneProduct = (product) => {
    return {
        type: SINGLE_PRODUCT,
        product
    }
};

export const loadProducts = () => async (dispatch) => {
    const res = await fetch(`/api/products`);
    console.log('Did i hit this product thunk???')
    if (res.ok) {
        const products = await res.json();
        dispatch(getProducts(products));
    } else if (res.status < 500) {
        const data = await res.json();
        if (data.errors) {
          return data.errors;
        }
    } else {
        return ["An error occurred. Please try again."];
    }
}

export const loadOneProduct = () => async (dispatch) => {
    const res = await fetch(`/api/products/`);
    console.log('Did i hit this product thunk???')
    if (res.ok) {
        const products = await res.json();
        dispatch(getProducts(products));
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

const productReducer = (state = initialState, action) => {
    let newState;
    switch (action.type) {
        case GET_PRODUCTS:
            newState = { ...state, entries: {...state.entries} }
            action.products.forEach(product => {newState.entries[product.id] = product})
            return newState
        default:
            return state;
    }
};
export default productReducer;
