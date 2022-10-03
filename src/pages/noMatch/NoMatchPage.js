import React from "react";
import error404 from "../../assets/404-error.svg";

function NoMatchPage() {
  return (
    <div className="container">
      <img src={error404} alt="" className="w-full max-w-2xl mx-auto mt-20" />
      <h1 className="mt-10 text-5xl font-medium text-center">404 Error, page not found.</h1>
    </div>
  );
}

export default NoMatchPage;
