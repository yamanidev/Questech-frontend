import React from "react";
import { Link } from "react-router-dom";

function LevelsPage() {
  return (
    <div className="container">
      <h1 className="mb-10 text-6xl font-semibold">Levels</h1>
      <div className="pl-10 flex flex-col gap-5">
        <Link to="/admin/CP1/groups" className="text-3xl font-semibold text-gray-500">
          CP1
        </Link>
        <Link to="/admin/CP2/groups" className="text-3xl font-semibold text-gray-500">
          CP2
        </Link>
        <Link to="/admin/CS1/groups" className="text-3xl font-semibold text-gray-500">
          CS1
        </Link>
        <Link to="/admin/CS2SIW/groups" className="text-3xl font-semibold text-gray-500">
          CS2SIW
        </Link>
        <Link to="/admin/CS2ISI/groups" className="text-3xl font-semibold text-gray-500">
          CS2ISI
        </Link>
        <Link to="/admin/CS3SIW/groups" className="text-3xl font-semibold text-gray-500">
          CS3SIW
        </Link>
        <Link to="/admin/CS3ISI/groups" className="text-3xl font-semibold text-gray-500">
          CS3ISI
        </Link>
      </div>
    </div>
  );
}

export default LevelsPage;
