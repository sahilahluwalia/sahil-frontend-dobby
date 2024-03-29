import React from "react";
import Navbar from "../components/Navbar";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
function gen(input) {
  var array = [];
  for (let i = 0; i < input; i++) {
    array.push(
        `https://random.imagecdn.app/${Math.floor(Math.random() * 200) + 200}/${
            Math.floor(Math.random() * 100) + 200
        }`
    );
  }
  return array;
}

let imageList = gen(36)
export const Famouspage = () => {
  const usertoken = localStorage.getItem("token");
  let navigate = useNavigate();

  const [token, setToken] = useState(usertoken);

  const tokenchecker = () => {
    if (token == null) {
      navigate("/");
    }
  };
  useEffect(() => {
    tokenchecker();
  }, [token]);

  return (
    <>
      <Navbar signin={true} />
      <div className="text-center mt-10 sm:mt-32 mb-8 sm:mb-20">
        <h1 className="text-4xl text-center tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
          <span className="block xl:inline">Latest</span>{" "}
          <span className="block text-indigo-600 xl:inline">Amazing </span>
          <span>Uploads</span>
        </h1>
      </div>
      <div className="mt-16 flex flex-wrap mx-5 sm:mx-20 justify-evenly gap-5 my-16">
        {imageList.map((e) => (
          <img className="rounded-xl" src={e} alt="" srcset="" />
        ))}
      </div>
    </>
  );
};
