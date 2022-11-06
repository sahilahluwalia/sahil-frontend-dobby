import React from "react";
import Navbar from "../components/Navbar";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const Explorepage = () => {
  let navigate = useNavigate();
  const token = localStorage.getItem("token");
  const tokenchecker = () => {
    if (token) {
      navigate("/user");
    }
  };
  useEffect(() => {
    tokenchecker();
  }, [token]);
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

  let imageList = gen(10);
  return (
    <>
      <Navbar signin={false} />
      <div className="text-center mt-10 sm:mt-32 mb-8 sm:mb-20">
        <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
          <span className="block xl:inline">Amazing</span>{" "}
          <span className="block text-indigo-600 xl:inline">Uploads</span>
          <span> from Amazing people</span>
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
