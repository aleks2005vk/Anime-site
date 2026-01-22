import { Outlet } from "react-router-dom";
import React from "react";
import Navbar from "./ui/Navbar/Navbar";
import Footer from "./ui/Footer/Footer";

export default function Layouts() {
  return (
    <>
      <Navbar />
      <div style={{ width: "100%" }}>
        <Outlet />
      </div>
      <Footer />
    </>
  );
}
