import React from "react";
import { Link } from "react-router-dom";

import './ShopHeader.css'

const ShopHeader = ({ numItem, total }) => {
    return (
        <header className="shop-header row">
            <Link to='/'>
                <div className="logo text-dark">ReStore</div>
            </Link>
            <Link to='/card'>
                <div className="shopping-cart">
                    <i className="cart-icon fa fa-shopping-cart" />
                    {numItem} items (${total})
                </div>
            </Link>
        </header>
    )
};

export default ShopHeader