import React from "react";
import { NavLink, useHistory } from "react-router-dom";

import './categorynavbar.css';

const CategoryNavBar = () => {
  const categories = [
    { id: 1, name: "Skin" },
    { id: 2, name: "Body" },
    { id: 3, name: "Hair" },
    { id: 4, name: "Makeup" },
    { id: 5, name: "Man" },
  ];

  const history = useHistory();
  // const handleOnClick = () => {
  //     history.push("/")
  // }
  return (
    <nav className="nav-category-container">
      {/* <div onClick={handleOnClick} className="nav-logo">
        <NavLink to='/' exact={true} activeClassName='active'>
            Beautsy
        </NavLink>
      </div> */}
      {/* <div>established 2022</div> */}

      <div className="category-nav">
        {categories.map((category) => (
          <NavLink
            to={`/${category.name.toLowerCase()}`}
            exact={true}
            activeClassName="active"
            key={category.id}
          >
            {category.name}
          </NavLink>
        ))}
      </div>
    </nav>
  );
};

export default CategoryNavBar;
