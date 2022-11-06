import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { storage } from "../firebase";
import { ref, uploadBytes, listAll, getDownloadURL } from "firebase/storage";
import { v4 } from "uuid";
const baseURL = process.env.REACT_APP_LINK;

export const Userpage = () => {
  const usertoken = localStorage.getItem("token");
  let navigate = useNavigate();
  const [successAlert, setSuccessAlert] = useState(false);
  const [noImageAlert, setNoImageAlert] = useState(false);
  const [noTextAlert, setNoTextAlert] = useState(false);
  const [retry, setRetry] = useState(false);
  const [token, setToken] = useState(usertoken);
  const [userId, setUserId] = useState("");
  const [search, setSearch] = useState("");
  const [mongoImages, setMongoImages] = useState(false);
  const [filterImages, setFilterImages] = useState();
  const [name, setName] = useState("");
  const [slowWarning, setSlowWarning] = useState(true);
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  const refreshToken = localStorage.getItem("refreshToken");
  setTimeout(() => setSlowWarning(false), 2500);
  const renewToken = async () => {
    try {
      const result = await axios.post(baseURL + "/api/token", {
        token: refreshToken,
      });
      if (result.status === 200) {
        localStorage.setItem("token", result.data.token);
        setToken(result.data.token);
        // console.log("Token reused");
      }
    } catch (e) {
      console.log(e);
      // console.log("renew token error");
    }
  };
  const fetcher = async () => {
    try {
      const result = await axios.get(baseURL + "/api/getdata", config);
    } catch (e) {
      renewToken();
    }
  };

  const imageUploader = async (url, fileName, id = userId) => {
    try {
      const result = await axios.post(baseURL + "/api/images", {
        id: id,
        link: url,
        name: fileName,
      });
      setSuccessAlert(true);
      setTimeout((e) => setSuccessAlert(false), 5000);

      return result;
    } catch (e) {
      console.log("error");
      console.log(e);
    }
  };
  const [imageUpload, setImageUpload] = useState(null);
  const [imageList, setImageList] = useState([]);
  const imageListRef = ref(storage, "images/");
  const tokenchecker = () => {
    if (token == null) {
      navigate("/");
    }
  };

  useEffect(() => {
    tokenchecker();
    fetcher();
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
    emptyfetcher();
  }, [search]);
  const emptyfetcher = () => {
    if (search == "") {
      // console.log("empty search querying data");
      getImage(userId);
    } else return;
  };
  useEffect(() => {
    listAll(imageListRef).then((response) => {
      // console.log(response);
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
        console.log("GOOGLE DRIVE LINK");
        console.log(url);
        setImageList((prev) => [...prev, url]);
        setImageList((prev) => [...prev, url]);
        setFilterImages((prev) => [...prev, url]);
        try {
          console.log(name, url);
          imageUploader(url, name).then((response) => {
            console.log("result of uplaoding in mongodb is ");
            console.log(response);
            if (response.status === 201) {
              console.log(imageList);
              setName("");
            }
          });
        } catch (e) {
          console.log(e);
          console.log("catch error");
        }
      });
    });
  };

  const getImage = async () => {
    try {
      const result = await axios.post(baseURL + "/api/getimages", {
        id: userId,
      });
      // console.log("GET IMAGE RESULT");
      // console.log(result.data.result);
      if (result.data.result.length === 0) {
        setRetry(!retry);
        console.log("Retrying");
        return;
      }
      // console.log("IMAGE RESULT sent to variable");
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
          // console.log(x);
          tempArray.push(x);
        }
      }
      // console.log(tempArray);
      setFilterImages(tempArray);
      // setSearchImages(tempArray)
    };
    searchImages();
  };

  return (
    <>
      <Navbar signin={true} />

      <div className=" h-screen">
        <div className="text-center mt-10 sm:mt-32 mb-8 sm:mb-20">
          <h1 className="text-4xl text-center tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
            <span className="block xl:inline">Your</span>{" "}
            <span className="block text-indigo-600 xl:inline">Amazing </span>
            <span>Uploads</span>
          </h1>
        </div>

        <div>
          <div className="flex items-center justify-center w-32 sm:w-64 mx-auto">
            <div className="flex border-2 rounded-xl ">
              <input
                type="text"
                className="px-4 py-2 w-64 sm:w-80  outline-gray-300 group rounded-l-xl"
                placeholder="Search..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <button
                onClick={runQuery}
                className="flex items-center justify-center px-4 border-l hover:bg-indigo-500 group rounded-r-xl"
              >
                <svg
                  className=" w-6 h-6 text-gray-600 group-hover:fill-white "
                  fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                >
                  <path d="M16.32 14.9l5.39 5.4a1 1 0 0 1-1.42 1.4l-5.38-5.38a8 8 0 1 1 1.41-1.41zM10 16a6 6 0 1 0 0-12 6 6 0 0 0 0 12z" />
                </svg>
              </button>
            </div>
          </div>

          <div className="mt-16 flex flex-wrap items-baseline mx-5 sm:mx-20 justify-evenly gap-5 my-16">
            {filterImages &&
              filterImages.map((item) => (
                <>
                  <div className="max-w rounded overflow-hidden shadow">
                    <img
                      className="object-cover h-64"
                      src={item.link}
                      alt="images"
                    />
                    <div className="px-6 py-2">
                      <div className="font-bold text-xl mb-2  text-gray-700">
                        {item.name}
                      </div>
                    </div>
                  </div>
                </>
              ))}
          </div>
        </div>
        <div className="mb-20">.</div>
      </div>
    </>
  );
};
