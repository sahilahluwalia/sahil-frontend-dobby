import React,{useEffect} from "react";
import { MainSection } from "../components/MainSection";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";

export const Homepage = () => {
  let navigate = useNavigate();
  const token = localStorage.getItem("token");
  const tokenchecker = () => {
    if (token) {
      navigate("/user");
    }
  };
  useEffect(() => {
    tokenchecker();
  }, []);
  return (
    <>
      <Navbar signin={false} />
      <MainSection />
    </>
  );
};
