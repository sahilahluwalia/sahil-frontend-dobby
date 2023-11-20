import React from "react";
import { useEffect } from "react";
import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
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
let imageList = gen(24);

export const Indexpage = () => {
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


  var sentence = [
    "I loved it! - Ram",
    "I don't believe it's free - Bill",
    "MindBlowiiiiiiiiiiiiing! - Jack",
    "Totally in love <3 - Jasmine",
    "OOOSMMMM - Rakhi",
    "Best Value - Sameer",
    "Really Loving the Product! - Basanti",
    "Free Storage in 2022! - Sahil",
    "Hell YEAHHH! - Adarsh",
    "Thank You for Making this product - Shilpa",
    "Will Share it to my peers - Hiranjeet",
    "LifeHack! - Gotam",
  ];
  const [review, setReview] = useState("Hear what our loving Users says!");

  const timer = (ms) => new Promise((res) => setTimeout(res, ms));
  async function load() {
    for (let i = Math.floor(Math.random() * 11) + 1; i < 12; i++) {
      setReview(sentence[i]);
      // console.log(sentence[i]);
      if (i == 11) i = 0;
      await timer(2400);
    }
  }
  useEffect(() => {
    load();
  }, []);

  return (
    <>
      <Navbar />
      <main className="mt-16 mx-auto max-w-7xl px-4 sm:mt-24">
        <div className="text-center">
          <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
            <span className="block xl:inline">Upload Images</span>{" "}
            <span className="block text-indigo-600 xl:inline">for Free!</span>
          </h1>
          <p className=" mt-5 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
            The One and Only Magic App that does not suck in 2022.
          </p>
          <div className="mt-5 max-w-md mx-auto sm:flex sm:justify-center md:mt-8">
            <div className="rounded-md shadow">
              <Link to="/signup">
                <p className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 md:py-4 md:text-lg md:px-10">
                  Get started
                </p>
              </Link>
            </div>
            <div className="mt-3 rounded-md shadow sm:mt-0 sm:ml-3">
              <Link to="/explore">
                <p className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-indigo-600 bg-white hover:bg-gray-50 md:py-4 md:text-lg md:px-10">
                  Explore Page
                </p>
              </Link>
            </div>
          </div>
          <p className=" mt-24 text-xl text-gray-600 font-bold">
            Hear what our Exisiting users are saying! about Us. Spoiler Alert
            (they love us)
          </p>
          <p className="mt-5 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
            {review}
          </p>

          <p className="mt-20 text-gray-600 text-sm">
            Wanna see what other users are uploading? Scroll below
          </p>

          <div className="mt-10 flex flex-wrap mx-5 sm:mx-20 justify-evenly gap-5 my-16">
            {imageList.map((e) => (
              <img className="rounded-xl" src={e} alt="" srcset="" />
            ))}
          </div>
        </div>
      </main>
    </>
  );
};
