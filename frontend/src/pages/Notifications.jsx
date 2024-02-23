import React, { useState } from "react";
import { CheckIcon, CheckCircleIcon } from "@heroicons/react/20/solid";

const Notifications = () => {
  const [read, setRead] = useState(false);
  return (
    <div className="min-h-[100vh] flex flex-col items-center gap-4 mt-10 h-max w-full">
      <h1 className="text-2xl font-semibold">Notifications</h1>
      <div
        className={`flex justify-between items-center w-[60%] h-fit px-4 ${
          read ? "bg-white" : "bg-gray-200"
        } py-2 border border-gray-300 rounded-xl`}
      >
        <div>
          <h1 className="flex items-center gap-2 text-xl font-semibold">
            Your Ride has been booked
            <CheckCircleIcon className="w-6 h-6 text-green-500" />
          </h1>
          <p>
            Name: <strong>Joel</strong>
          </p>
          <p>
            Booked Seats: <strong>2</strong>
          </p>
          <p>
            Mobile: <strong>+917670819765</strong>
          </p>
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
        </div>
        {!read && (
          <button
            onClick={() => setRead(true)}
            className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-white bg-black rounded-lg hover:bg-gray-800"
          >
            <span>Mark as Read</span>
            <CheckIcon className={"w-4 h-4"} />
          </button>
        )}
      </div>
    </div>
  );
};

export default Notifications;
