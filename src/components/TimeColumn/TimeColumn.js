import React from "react";

function TimeColumn() {
  return (
    <div className="w-36 flex flex-col">
      <div className="h-[100px]"></div>
      <div className="h-[150px] bg-[#EEECE1] border border-gray-500">
        <h4 className="pt-5 pl-2 text-xl font-semibold">8h-9h30</h4>
      </div>
      <div className="h-[150px] bg-[#EEECE1] border border-gray-500">
        <h4 className="pt-5 pl-2 text-xl font-semibold">9h30-11h</h4>
      </div>
      <div className="h-[150px] bg-[#EEECE1] border border-gray-500">
        <h4 className="pt-5 pl-2 text-xl font-semibold">11h-12h30</h4>
      </div>
      <div className="h-[150px] bg-[#EEECE1] border border-gray-500">
        <h4 className="pt-5 pl-2 text-xl font-semibold">14h-15h30</h4>
      </div>
      <div className="h-[150px] bg-[#EEECE1] border border-gray-500">
        <h4 className="pt-5 pl-2 text-xl font-semibold">15h30-17h</h4>
      </div>
    </div>
  );
}

export default TimeColumn;
