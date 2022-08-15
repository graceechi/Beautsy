import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink, Link, useHistory } from 'react-router-dom';
import { searchProducts } from '../../store/searchbar';
// import SingleProduct from '../SingleProduct';
// import { getOneProduct, loadProducts, loadOneProduct } from '../../store/products';
import './searchbar.css';

function SearchBar() {
    const dispatch = useDispatch();
    const history = useHistory();
    const productResults = useSelector(state => state?.search?.entries?.product_names);

    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState([]);

    useEffect(() => {
        const results = productResults?.filter(result => result.product.toLowerCase().includes(searchTerm.toLowerCase()));

        if (results) {
            setSearchResults(results);
        }

        if (!results || searchTerm === '') {
            setSearchResults('');
        }
    }, [searchTerm])

    useEffect(() => {
        dispatch(searchProducts());
    }, dispatch)


    return  (
        <div className='search-bar-container'>
            <input
                type='text'
                name='search-bar'
                placeholder='Search'
                onChange={e => setSearchTerm(e.target.value)}
                onBlur={() => setSearchResults('')}
                value={searchTerm}
            />
            <div className='search-bar-search-results'>
                <ul>
                    {searchResults?.length > 0 && searchResults?.map(item => (
                        <div className='search-items-dropdown'
                            key={item.productId}
                            onMouseDown={() => {
                                setSearchTerm('')
                                setSearchResults([])
                                history.push(`/products/${item.productId}`)
                            }}
                        >
                            <p>{item.product}</p>
                        </div>
                    ))}
                </ul>
            </div>
        </div>
    )
}


export default SearchBar;
