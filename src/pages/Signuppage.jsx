import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { Alert } from "../components/Alert";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const baseURL = process.env.REACT_APP_LINK;

export const Signuppage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [wrongPasswordAlert, setWrongPasswordAlert] = useState(false);
  const [userExist, setUserExist] = useState(false);
  const [emptyValue, setEmptyValueAlert] = useState(false);
  const [alert, setAlert] = useState(false);
  const token = localStorage.getItem("token");
  const tokenchecker = () => {
    if (token) {
      navigate("/user");
    }
  };

  useEffect(() => {
    tokenchecker();
  }, []);

  const handleSignup = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setWrongPasswordAlert(true);
      setTimeout(() => {
        setWrongPasswordAlert(false);
      }, 5000);
      return;
    }
    // console.log({ email, password });

    try {
      const result = await axios.post(baseURL + "/api/auth/signup", {
        email: email,
        password: password,
      });
      // console.log("result is");
      // console.log(result);
      if (result.status === 201) {
        const token = result.data.token;
        const refreshToken = result.data.refreshToken;
        localStorage.setItem("id", result.data.id);
        localStorage.setItem("token", token);
        localStorage.setItem("refreshToken", refreshToken);
        return navigate("/user");
      }
    } catch (error) {
      // console.log("error");
      // console.log(error);
      if (error.response.status === 403) {
        setUserExist(true);
        setTimeout(() => {
          setUserExist(false);
        }, 5000);
      }
      if (error.response.status === 404) {
        // console.log(error.response.status);
        setAlert(true);
        setTimeout(() => {
          setAlert(false);
        }, 5000);
      }
      if (error.response.status === 500) {
        // console.log(error.response.status);
        setEmptyValueAlert(true);
        setTimeout(() => {
          setEmptyValueAlert(false);
        }, 5000);
      }
    }
  };
  return (
    <>
      <div className="bg-gradient-to-t from-purple-800 via-violet-900 to-purple-800 min-h-screen flex flex-col">
        <div className="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2">
          <div className="bg-white px-6 py-8 rounded shadow-md text-black w-full">
            <h1 className="mb-8 text-3xl text-center font-extrabold text-indigo-600">
              Create New Account
            </h1>
            <form onSubmit={handleSignup}>
              <input
                type="email"
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
              <input
                type="password"
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="block border border-grey-light w-full p-3 rounded mb-4"
                name="confirm_password"
                placeholder="Confirm Password"
              />

              <button
                type="submit"
                className="shadow-xl w-full text-center py-3 rounded bg-green text-white hover:bg-indigo-700 bg-indigo-600 font-semibold focus:outline-none my-1"
              >
                Create Account
              </button>
            </form>
            {wrongPasswordAlert && (
              <Alert message={"Both Password Dont match"} />
            )}
            {userExist && (
              <Alert message={"User already Exist Please Sign in"} />
            )}
            {alert && <Alert message={"Server Error"} />}
            {emptyValue && (
              <Alert message={"Please Fill the values completely"} />
            )}
          </div>

          <div className="text-grey-dark mt-6 flex gap-5 font-semibold text-white">
            Already have an account?
            <Link to="/signin">
              <p className="underline hover:text-gray-200">Sign in</p>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};
