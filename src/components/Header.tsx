import { Link } from "react-router-dom";
import { logout } from "../redux/features/user/userSlice";
import { useAppDispatch, useAppSelector } from "../redux/hooks";

const Header = () => {
  const { data: user } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();

  const menu = () => {
    return (
      <>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="all-books">All Books</Link>
        </li>
        {!user ? (
          <>
            <li>
              <Link to="/signin">SignIn</Link>
            </li>
            <li>
              <Link to="/signup">SignUp</Link>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link to="/add-new-book">Add New Book</Link>
            </li>
            <li>
              <Link to="/wishlist">Wishlist</Link>
            </li>
            <li>
              <Link to="/reading">Reading</Link>
            </li>
            <li>
              <button onClick={() => dispatch(logout())}>Logout</button>
            </li>
          </>
        )}
      </>
    );
  };

  return (
    <div className="bg-gray-100 shadow-sm">
      <div className="container">
        <div className="navbar">
          <div className="navbar-start w-1/4">
            <div className="dropdown">
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
                className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
              >
                {menu()}
              </ul>
            </div>
            <a className="normal-case text-lg font-medium">BookCatalogue</a>
          </div>
          <div className="navbar-end w-3/4">
            <ul className="menu menu-horizontal hidden lg:flex">{menu()}</ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
