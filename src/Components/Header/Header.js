import React, { useState, useContext } from "react";
import { useHistory, Link } from "react-router-dom/cjs/react-router-dom.min";
import { Context } from "../../store/Context";
import { signOut } from "firebase/auth";
import "./Header.css";
import OlxLogo from "../../assets/OlxLogo";
import Search from "../../assets/Search";
import Arrow from "../../assets/Arrow";
import SellButton from "../../assets/SellButton";
import SellButtonPlus from "../../assets/SellButtonPlus";

function Header() {
  const { auth } = useContext(Context);
  const user = auth.currentUser;
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const history = useHistory();

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        history.push('/login');
      })
      .catch((error) => {
        console.error("Error during logout:", error.message);
      });
  };

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  return (
    <div className="headerParentDiv">
      <div className="headerChildDiv">
        <div className="brandName">
          <OlxLogo />
        </div>
        <div className="placeSearch">
          <Search />
          <input type="text" />
          <Arrow />
        </div>
        <div className="productSearch">
          <div className="input">
            <input type="text" placeholder="Find car, mobile phone, and more..." />
          </div>
          <div className="searchAction">
            <Search color="#ffffff" />
          </div>
        </div>
        <div className="language">
          <span> ENGLISH </span>
          <Arrow />
        </div>
        <div className="loginPage">
          {user ? (
            <div className="dropdownContainer">
              <span onClick={toggleDropdown} className="userDisplayName">
                {user.displayName || "User"}
              </span>
              {dropdownVisible && (
                <div className="dropdownMenu">
                  <button onClick={handleLogout} className="dropdownItem">
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <span>Login</span>
          )}
          <hr />
        </div>
        <div className="sellMenu">
          <SellButton />
          <Link to="/create" className="sellMenuContent">
            <SellButtonPlus />
            <span>SELL</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Header;

