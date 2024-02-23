import React from "react";

const History = () => {
  return (
    <div className="flex flex-col items-start w-[800px]">
      <h1 className="text-2xl font-semibold">Your History</h1>
      <div className="w-full px-4 py-2 border border-gray-300 rounded-lg">
        <div className="py-2 ">
          <div>
            <span>Date & Time: </span>
            <span className="font-semibold text-md">22/02/24, 12:05 pm</span>
          </div>
          <div>
            <span>Pick Up Point: </span>
            <span className="font-semibold text-md">Hyderabad</span>
          </div>
          <div>
            <span>Drop Point: </span>
            <span className="font-semibold text-md">Guntur</span>
          </div>
          <h1 className="mt-2 font-semibold underline">Client Details: </h1>
          <div>
            <span>Name: </span>
            <span className="font-semibold text-md">Joel</span>
          </div>
          <div>
            <span>Mobile: </span>
            <span className="font-semibold text-md">+917670819765</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default History;
