import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Alert } from "../components/Alert";

const baseURL = process.env.REACT_APP_LINK;

export const Signinpage = () => {
  let navigate = useNavigate();
  const [alert, setAlert] = useState(false);
  const [invalidPasswordAlert, setInvalidPasswordAlert] = useState(false);
  const [userNotFound, setUserNotFoundAlert] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const token = localStorage.getItem("token");
  const tokenchecker = () => {
    if (token) {
      navigate("/user");
    }
  };
  useEffect(() => {
    tokenchecker();
  }, []);
  const handleSignin = async (e) => {
    e.preventDefault();

    try {
      const result = await axios.post(baseURL + "/api/auth/signin", {
        email: email,
        password: password,
      });
      console.log("result is");
      console.log(result);
      if (result.status === 200) {
        const token = result.data.token;
        const refreshToken = result.data.refreshToken;
        // console.log(result);
        localStorage.setItem("id", result.data.id);
        localStorage.setItem("token", token);
        localStorage.setItem("refreshToken", refreshToken);
        return navigate("/user");
      }
    } catch (error) {
      if (error.response.status === 500) {
        setAlert(true);
        setTimeout(() => {
          setAlert(false);
        }, 5000);
      }
      if (error.response.status === 404) {
        // console.log(404);
        setUserNotFoundAlert(true);
        setTimeout(() => {
          setUserNotFoundAlert(false);
        }, 5000);
      }
      if (error.response.status === 400) {
        // console.log(400);

        setInvalidPasswordAlert(true);
        setTimeout(() => {
          setInvalidPasswordAlert(false);
        }, 5000);
      }
    }
  };
  return (
    <>
      <div className="bg-gradient-to-t from-purple-800 via-violet-900 to-purple-800 min-h-screen flex flex-col">
        <div className="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2">
          <div className="bg-white px-6 py-8 rounded shadow-md text-black w-full">
            <h1 className="mb-8  text-3xl text-center font-extrabold text-indigo-600">
              Sign in
            </h1>
            <form onSubmit={handleSignin}>
              <input
                type="text"
                onChange={(e) => setEmail(e.target.value)}
                className="block border border-grey-light w-full p-3 rounded mb-4"
                name="email"
                placeholder="Email"
              />

              <input
                type="password"
                onChange={(e) => setPassword(e.target.value)}
                className="block border border-grey-light w-full p-3 rounded mb-4"
                name="password"
                placeholder="Password"
              />

              <button
                type="submit"
                className="shadow-xl w-full font-semibold text-center py-3 rounded bg-green text-white hover:bg-indigo-700 bg-indigo-600 focus:outline-none my-1"
              >
                Sign in
              </button>
            </form>
            {userNotFound && <Alert message={"User not found"} />}
            {invalidPasswordAlert && <Alert message={"Invalid Password"} />}
            {alert && <Alert message={"Server Error"} />}
          </div>

          <div className="text-white mt-6 flex gap-5 font-semibold ">
            No Account ?
            <Link to="/signup">
              <p className="underline hover:text-gray-200">
                Signup
              </p>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};
