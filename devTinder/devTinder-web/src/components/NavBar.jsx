import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";
import axios from "axios";
import { removeUser } from "../utils/userSlice";

const NavBar = () => {
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch((store) => store.dispatch);
  console.log(user);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.post(BASE_URL + "/logout", {}, { withCredentials: true });
      dispatch(removeUser());
      return navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="navbar bg-base-200">
      <Link to="/feed" className="flex-1">
        <h1 className="btn btn-ghost text-xl">💕 DevTinder</h1>
      </Link>
      <div>{user ? <h1>Welcome {user?.firstName}</h1> : <h1></h1>}</div>
      <div className="flex-none gap-2">
        <div className="dropdown dropdown-end mr-5">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-circle avatar"
          >
            <div className="w-10 rounded-full">
              <img
                alt="Tailwind CSS Navbar component"
                src={
                  user
                    ? user.photoUrl
                    : "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                }
              />
            </div>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
          >
            <li>
              <Link className="justify-between" to="/profile">
                Profile
                <span className="badge">New</span>
              </Link>
            </li>
            <li>
              <Link className="justify-between" to="/connections">
                Matches
              </Link>
            </li>
            <li>
              <Link className="justify-between" to="/requests">
                Requests
              </Link>
            </li>
            <li>
              <h1 onClick={handleLogout}>Logout</h1>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
