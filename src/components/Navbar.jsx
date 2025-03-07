import React, { useEffect, useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import logo from "/logo.png";
import { FaRegUser } from "react-icons/fa";
import Modal from "./Modal";
import Profile from "./Profile";
import useCart from "../hooks/useCart";
import useAuth from "../hooks/useAuth";

const Navbar = () => {
  const [isSticky, setSticky] = useState(false);
  const [showSearchInput, setShowSearchInput] = useState(false);
  const [lastScrollTop, setLastScrollTop] = useState(0);
  const { user } = useAuth();
  const [cart] = useCart();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollTop = window.scrollY;
      if (currentScrollTop > lastScrollTop) {
        // Scrolling down
        setShowSearchInput(false);
      } else {
        // Scrolling up
        if (location.pathname === "/menu") {
          setShowSearchInput(true);
        }
      }
      setLastScrollTop(currentScrollTop <= 0 ? 0 : currentScrollTop); // For Mobile or negative scrolling
      setSticky(currentScrollTop > 0);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastScrollTop, location.pathname]);

  const handleSearchClick = () => {
    if (location.pathname !== "/menu") {
      navigate("/menu"); // Redirect to /menu page
    }
    setShowSearchInput(true); // Show search input when navigating
  };

  useEffect(() => {
    if (location.pathname !== "/menu") {
      setShowSearchInput(false); // Hide search input if not on /menu page
    }
  }, [location.pathname]);

  const navItems = (
    <>
      <li>
        <Link to="/" className="text-pink">
          Home
        </Link>
      </li>
      <li tabIndex={0}>
        <details>
          <summary>Categories</summary>
          <ul className="p-2">
            <li>
              <Link to="/menu">All</Link>
            </li>
            <li>
              <Link to="/menu?category=dresses">Dresses</Link>
            </li>
            <li>
              <Link to="/menu?category=tshirts">T-Shirts</Link>
            </li>
            <li>
              <Link to="/menu?category=blouses">Blouses</Link>
            </li>
            <li>
              <Link to="/menu?category=pants">Pants</Link>
            </li>
            <li>
              <Link to="/menu?category=skirts">Skirts</Link>
            </li>
          </ul>
        </details>
      </li>
      <li tabIndex={0}>
        <details>
          <summary>Services</summary>
          <ul className="p-2">
            <li>
              <Link to="/customize-design">Customize Design</Link>
            </li>
            <li>
              <Link to="/online-order">Online Order</Link>
            </li>
          </ul>
        </details>
      </li>
      <li>
        <Link to="/blog">Blogs</Link>
      </li>
    </>
  );

  return (
    <header className={`max-w-screen-3xl container mx-auto fixed top-0 left-0 right-0 transition-all duration-300 ease-in-out`}>
      <div className={`navbar w-full xl:px-24 ${isSticky ? "shadow-md bg-base-100 transition-all duration-300 ease-in-out" : ""}`}>
        <div className="navbar-start">
          <div className="dropdown justify-between">
            <label tabIndex={0} className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </label>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-64 space-y-3"
            >
              {navItems}
            </ul>
          </div>
          <Link to="/">
            <p className="text-black text-xl">ONEXT</p>
            <img src={logo} alt="Logo" />
          </Link>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">{navItems}</ul>
        </div>
        <div className="navbar-end">
          <button
            className="btn btn-ghost btn-circle hidden lg:flex"
            onClick={handleSearchClick} // Use handleSearchClick to navigate and optionally show input
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </button>
          {/* Conditionally render search input only on /menu page */}
          {showSearchInput && location.pathname === "/menu" && (
            <input
              type="text"
              placeholder="Search..."
              className="input input-bordered w-full max-w-xs"
            />
          )}
          {/* shopping cart */}
          <Link to="/cart-page">
            <label
              tabIndex={0}
              className="btn btn-ghost btn-circle lg:flex items-center justify-center mr-3"
            >
              <div className="indicator">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
                <span className="badge badge-sm indicator-item bg-red text-white">
                  {cart.length || 0}
                </span>
              </div>
            </label>
          </Link>
          {/* login button */}
          {user ? (
            <>
              <Profile user={user} />
            </>
          ) : (
            <button
              onClick={() => document.getElementById('my_modal_5').showModal()}
              className="btn flex items-center gap-2 rounded-full px-6 bg-pink text-white"
            >
              <FaRegUser /> Login
            </button>
          )}
          <Modal />
        </div>
      </div>
    </header>
  );
};

export default Navbar;