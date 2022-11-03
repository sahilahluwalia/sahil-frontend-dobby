import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { storage } from "../firebase";
import { ref, uploadBytes, listAll, getDownloadURL } from "firebase/storage";
import { v4 } from "uuid";
import { SuccessAlert } from "../components/SuccessAlert";
import { Alert } from "../components/Alert";
const baseURL = process.env.REACT_APP_LINK;

export const Userpage = () => {
  const usertoken = localStorage.getItem("token");
  let navigate = useNavigate();
  const [successAlert, setSuccessAlert] = useState(false);
  const [noImageAlert, setNoImageAlert] = useState(false);
  const [noTextAlert, setNoTextAlert] = useState(false);
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
  }, [userId]);
  useEffect(() => {
    const id = localStorage.getItem("id");
    setUserId(id);
    getImage(userId);
  }, []);

  useEffect(() => {
    listAll(imageListRef).then((response) => {
      console.log(response);
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
      console.log("GET IMAGE RESULT");
      console.log(result.data.result);
      setFilterImages(result.data.result);
      setMongoImages(result.data.result);
    } catch (e) {
      console.log(e);
    }
  };

  const runQuery = function (e) {
    console.log(search);
    const searchImages = (text = search, array = mongoImages) => {
      let tempArray = [];
      let x = 0;
      if (array === false) return;
      for (x of array) {
        if (x["name"].toLowerCase().includes(text.toLowerCase())) {
          console.log(x);
          tempArray.push(x);
        }
      }
      console.log(tempArray);
      setFilterImages(tempArray);
      // setSearchImages(tempArray)
    };
    searchImages();
  };

  return (
    <>
      <Navbar signin={true} />

      <div className="bg-gray-50 h-screen">
        <div className="fileuploadsection flex mx-10  p-10 gap-10 justify-center">
          <input
            type="file"
            className="py-3"
            onChange={(event) => {
              setImageUpload(event.target.files[0]);
            }}
          />

          <input
            className="rounded pl-3 py-3 bg-gray-200"
            placeholder="Enter File name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <button
            className="bg-slate-200 hover:bg-slate-300 px-3 rounded"
            onClick={uploadImage}
          >
            Upload image
          </button>
        </div>
        <div>
          <div className="mx-10">
            {successAlert && (
              <SuccessAlert message={"Image uploaded Successfully"} />
            )}
            {noImageAlert && <Alert message={"Image not selected!"} />}
            {noTextAlert && (
              <Alert message={"Please enter the name of the image"} />
            )}
            {slowWarning && (
              <Alert message={"Please be patient, Images take time to load"} />
            )}
          </div>

          <div className="search bar  flex mx-10 justify-center gap-10 py-10">
            <input
              className="bg-gray-200 px-10 py-2 rounded"
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <button
              onClick={runQuery}
              className="bg-gray-200 px-10 py-2 rounded hover:bg-gray-300"
            >
              search
            </button>
            <button
              onClick={getImage}
              className="bg-green-200 px-5 rounded hover:bg-green-300"
            >
              reload
            </button>
          </div>
          <div className="image area grid grid-cols-3 gap-10  mx-10">
            {filterImages &&
              filterImages.map((item) => (
                <div className="flex flex-col mx-10">
                  <div className="mx-auto p-2 text-xl">{item.name}</div>
                  <img className="h-50 w-50" src={item.link} alt="" srcSet="" />
                </div>
              ))}
          </div>
        </div>
        <div className="mb-20">.</div>
      </div>
    </>
  );
};
