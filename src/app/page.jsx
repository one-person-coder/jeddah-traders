"use client";
import { redirect } from "next/navigation";
import React from "react";

const Home = () => {
  redirect("/dashboard");
  return (
    <>
      <div className="custom-width"></div>
    </>
  );
};

export default Home;
