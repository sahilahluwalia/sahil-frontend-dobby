import React from "react";
import { Link } from "react-router-dom";
export const MainSection = () => {
  return (
    <div className="flex  justify-center flex-col bg-lightblue">
      <div className="flex mx-auto p-5 mt-10">
        <div className="text ">
          <p className="m-7 text-5xl font-semibold">Upload Images - for free</p>
          <p className="m-7 text-5xl font-semibold">Build Personal Collection</p>
        </div>
      </div>

      <div className="flex mx-auto flex-col h-screen">
        <div className="text-xl font-medium my-3 mb-5">
          Since 2014, more than 40,000 people have used{" "}
          <br></br>
          our website to perserve Images for free
        </div>
        
        <div className="flex justify-center">
          <Link to="/signin">
            <button className="p-2 px-10  mx-36 hover:bg-yellow-500 border-2 border-yellow-500  bg-yellow-400 text-gray-800 text-2xl">
              Get Started ( it's free )
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};
