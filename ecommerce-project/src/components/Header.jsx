import { Link, NavLink, useNavigate, useSearchParams } from 'react-router';
import CartIcon from '../../public/images/icons/cart-icon.png';
import SearchIcon from '../../public/images/icons/search-icon.png';
import LogoWhite from '../assets/images/logo-white.png';
import MobileLogoWhite from '../assets/images/mobile-logo-white.png';
import "./Header.css";
import { useState } from 'react';

export function Header({ cart }) {
  const [searchParams] = useSearchParams();
  const searchText = searchParams.get('search');
  const [search, setSearch] = useState(searchText || '');
  
  let totalQuantity = 0;

  cart.forEach((cartItem) => {
    totalQuantity += cartItem.quantity;
  });

  const navigate = useNavigate();

  const updateSearchInput = (event) => {
    setSearch(event.target.value);
  }

  const searchProduct = () => {
    console.log('for-now');
    navigate(`/?search=${search}`);
  }

  return (
    <div className="header">
      <div className="left-section">
        <Link to="/" className="header-link">
          <img className="logo"
            src={LogoWhite} />
          <img className="mobile-logo"
            src={MobileLogoWhite} />
        </Link>
      </div>

      <div className="middle-section">
        <input className="search-bar" type="text" placeholder="Search" value={search} onChange={updateSearchInput}/>

        <button className="search-button" onClick={searchProduct}>
          <img className="search-icon" src={SearchIcon} />
        </button>
      </div>

      <div className="right-section">
        <NavLink className="orders-link header-link" to="/orders">

          <span className="orders-text">Orders</span>
        </NavLink>

        <Link className="cart-link header-link" to="/checkout">
          <img className="cart-icon" src={CartIcon} />
          <div className="cart-quantity">{totalQuantity}</div>
          <div className="cart-text">Cart</div>
        </Link>
      </div>
    </div>
  );
}