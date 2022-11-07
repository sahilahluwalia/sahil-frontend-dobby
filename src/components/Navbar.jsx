import React from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
const Navbar = (props) => {
  const { signin } = props;
  const navigate = useNavigate();
  const signout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("refreshToken");
    navigate("/");
  };
  return (
    <>
      {/* <div className="flex justify-between bg-blue-900 ">
        <div className="my-auto pl-10 "></div>
        <div className="text-white p-3 text-xl font-medium">
          Private Image Collection
        </div>
        <div className="my-auto flex ">
          {!signin && (
            <>
              <Link to="/signin">
                <button className="border-2 border-yellow-500 p-1 flex hover:bg-yellow-500 mr-10 bg-yellow-400 text-gray-800">
                  Sign in
                </button>
              </Link>
              <Link to="/signup">
                <button className="border-2 border-yellow-500 p-1 flex hover:bg-yellow-500 mr-10 bg-yellow-400 text-gray-800">
                  Sign up
                </button>
              </Link>
            </>
          )}
          {signin && (
            <>
              <button
                onClick={signout}
                className="border-2 border-yellow-500 p-1 flex hover:bg-yellow-500 mr-10 bg-yellow-400 text-gray-800"
              >
                Sign Out
              </button>
            </>
          )}
        </div>
      </div> */}
      <nav>
        <div className="shadow flex sm:justify-between py-2 bg-gray-50 px-10  flex-col sm:flex-row gap-2 pb-5 sm:pb-2">
          <div></div>
          <div className="">
            <Link to="/">
              <div>
                <p className="font-extrabold text-2xl text-center my-auto text-indigo-700 mt-0 sm:mt-1">
                  Image Monster
                </p>
              </div>
            </Link>
          </div>
          <div>
            {!signin && (
              <Link to="/signin">
                <p className="mouse-pointer flex items-center justify-center px-3 py-2 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 ">
                  Login
                </p>
              </Link>
            )}
            {signin && (
              <>
                <div className="flex gap-3 pb-0 sm:pb-2 ">
                  <Link to="/famous">
                    <p className="mouse-pointer flex items-center justify-center px-3 py-2 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 ">
                      Explore
                    </p>
                  </Link>
                  <Link to="/user">
                    <p className="mouse-pointer flex items-center justify-center px-3 py-2 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 ">
                      My Uploads
                    </p>
                  </Link>
                  <Link to="/upload">
                    <button className="mouse-pointer flex items-center justify-center px-3 py-2 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 ">
                      Upload
                    </button>
                  </Link>
                  <button
                    onClick={signout}
                    className="   mouse-pointer flex items-center justify-center px-3 py-2 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 "
                  >
                    SignOut
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
