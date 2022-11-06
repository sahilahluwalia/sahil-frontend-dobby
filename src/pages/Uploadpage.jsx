import React from "react";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Confetti from "react-confetti";
import axios from "axios";
import { storage } from "../firebase";
import { ref, uploadBytes, listAll, getDownloadURL } from "firebase/storage";
import { v4 } from "uuid";
import { SuccessAlert } from "../components/SuccessAlert";
import { Alert } from "../components/Alert";
const baseURL = process.env.REACT_APP_LINK;

export const Uploadpage = () => {
  const navigate = useNavigate();
  const usertoken = localStorage.getItem("token");
  const [imageUpload, setImageUpload] = useState(null);
  const [name, setName] = useState("");
  const { width, height } = [200, 200];

  const [token, setToken] = useState(usertoken);
  const [imageList, setImageList] = useState([]);
  const imageListRef = ref(storage, "images/");
  const [successAlert, setSuccessAlert] = useState(false);
  const [noImageAlert, setNoImageAlert] = useState(false);
  const [noTextAlert, setNoTextAlert] = useState(false);
  const [retry, setRetry] = useState(false);
  const [userId, setUserId] = useState("");
  const [search, setSearch] = useState("");
  const [mongoImages, setMongoImages] = useState(false);
  const [filterImages, setFilterImages] = useState();
  const [slowWarning, setSlowWarning] = useState(true);
  var tweenFunctions = require("tween-functions");
  const f = tweenFunctions.easeInQuad(1, 0, 50, 5);
  const imageUploader = async (url, fileName, id = userId) => {
    try {
      const result = await axios.post(baseURL + "/api/images", {
        id: id,
        link: url,
        name: fileName,
      });
      setSuccessAlert(true);
      setTimeout((e) => setSuccessAlert(false), 7000);

      return result;
    } catch (e) {
      console.log("error");
      console.log(e);
    }
  };

  const tokenchecker = () => {
    if (token == null) {
      navigate("/");
    }
  };

  useEffect(() => {
    tokenchecker();
  }, [token]);
  useEffect(() => {
    const id = localStorage.getItem("id");
    setUserId(id);
    getImage(userId);
  }, [userId, retry]);
  useEffect(() => {
    const id = localStorage.getItem("id");
    setUserId(id);
    getImage(userId);
  }, []);

  useEffect(() => {
    listAll(imageListRef).then((response) => {
    //   console.log(response);
      response.items.forEach((item) => {
        getDownloadURL(item).then((url) => {
          setImageList((prev) => [...prev, url]);
        });
      });
    });
  }, []);
  const uploadImage = async () => {
    if (imageUpload === null || name === "") {
      if (name === "") {
        setNoTextAlert(true);
        setTimeout((e) => setNoTextAlert(false), 5000);
        return;
      } else {
        setNoImageAlert(true);
        setTimeout((e) => setNoImageAlert(false), 5000);
        return;
      }
    }
    const imageRef = ref(storage, `images/${imageUpload.name + v4()}`);
    uploadBytes(imageRef, imageUpload).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((url) => {
        // console.log("GOOGLE DRIVE LINK");
        // console.log(url);
        setImageList((prev) => [...prev, url]);
        setImageList((prev) => [...prev, url]);
        setFilterImages((prev) => [...prev, url]);
        try {
        //   console.log(name, url);
          imageUploader(url, name).then((response) => {
            // console.log("result of uplaoding in mongodb is ");
            // console.log(response);
            if (response.status === 201) {
            //   console.log(imageList);
              setName("");
            }
          });
        } catch (e) {
          console.log(e);
        //   console.log("catch error");
        }
      });
    });
  };

  const getImage = async () => {
    try {
      const result = await axios.post(baseURL + "/api/getimages", {
        id: userId,
      });
    //   console.log("GET IMAGE RESULT");
    //   console.log(result.data.result);
      if (result.data.result.length === 0) {
        setRetry(!retry);
        // console.log("Retrying");
        return;
      }
    //   console.log("IMAGE RESULT sent to variable");
      setFilterImages(result.data.result);
      setMongoImages(result.data.result);
    } catch (e) {
      console.log(e);
    }
  };

  const runQuery = function (e) {
    // console.log(search);
    const searchImages = (text = search, array = mongoImages) => {
      let tempArray = [];
      let x = 0;
      if (array === false) return;
      for (x of array) {
        if (x["name"].toLowerCase().includes(text.toLowerCase())) {
        //   console.log(x);
          tempArray.push(x);
        }
      }
    //   console.log(tempArray);
      setFilterImages(tempArray);
      // setSearchImages(tempArray)
    };
    searchImages();
  };
  return (
    <>
      <Navbar signin={true} />
      <div className="px-2">
        <div className="mt-10">
          <input
            type="text"
            className="
          form-control
          flex justify-center mx-auto
          px-4
          py-2
          text-xl
          font-normal
          text-gray-700
          bg-white bg-clip-padding
          border border-solid border-gray-300
          rounded
          transition
          ease-in-out
          w-64
          sm:w-80
          focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none
        "
            placeholder="Enter Image Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className="flex mt-5 gap-10 w-full  justify-center bg-grey-lighter">
          <div>
            <div className="flex justify-center items-center w-full">
              <label className="flex flex-col justify-center items-center w-full h-64 bg-gray-50 rounded-lg border-2 border-gray-300 border-dashed cursor-pointer dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                <div className="flex w-72 flex-col justify-center items-center pt-5 pb-6">
                  <svg
                    aria-hidden="true"
                    className="mb-3 w-10 h-10 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                    ></path>
                  </svg>

                  {!imageUpload && (
                    <>
                      <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                        <span className="font-semibold">Click to upload</span>
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        SVG, PNG or JPG
                      </p>
                    </>
                  )}
                  {imageUpload && (
                    <p className="font-semibold text-gray-500 dark:text-gray-400">
                      File Selected
                    </p>
                  )}
                </div>
                <input
                  type="file"
                  className="hidden"
                  onChange={(event) => {
                    setImageUpload(event.target.files[0]);
                  }}
                />
              </label>
            </div>
          </div>
        </div>
      </div>
      <button
        className="mt-5 mx-auto w-64 mouse-pointer flex items-center justify-center px-3 py-2 border border-transparent text-base font-semibold  rounded-md text-white bg-indigo-600 hover:bg-indigo-700 "
        onClick={uploadImage}
      >
        Upload Image
      </button>
      <div className="text-center justify-center flex mt-3">
        {successAlert && (
          <>
            <Confetti width={width} height={height} />
            <SuccessAlert message={"Image uploaded Successfully"} />{" "}
          </>
        )}
        {noImageAlert && (
          <>
            <Alert message={"Image not selected!"} />
          </>
        )}
        {noTextAlert && (
          <Alert message={"Please enter the name of the image"} />
        )}
      </div>
    </>
  );
};
