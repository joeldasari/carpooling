import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import NextRides from "../components/NextRides";
import History from "../components/History";
import { useState } from "react";
import Bookings from "../components/Bookings";

const Dashboard = () => {
  const [selection, setSelection] = useState("rides");
  return (
    <div>
      <Navbar />
      <div className="flex flex-col items-center gap-10 my-10">
        <div className="flex gap-6">
          <Link
            to={"/rideform"}
            className="flex items-center gap-2 px-4 py-2 text-sm text-white bg-black rounded-lg hover:bg-gray-800"
          >
            Give a Ride
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-4 h-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
              />
            </svg>
          </Link>
          <Link
            to={"/rides"}
            className="flex items-center gap-2 px-4 py-2 text-sm text-white bg-black rounded-lg hover:bg-gray-800"
          >
            Take a Ride
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-4 h-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
              />
            </svg>
          </Link>
        </div>

        <div className="flex gap-2 text-sm">
          <button
            onClick={() => setSelection("rides")}
            className={
              selection === "rides"
                ? "bg-blue-500 text-white px-4 py-2 rounded-md"
                : "bg-gray-300 px-4 py-2 rounded-md"
            }
          >
            Your Rides
          </button>

          <button
            onClick={() => setSelection("bookings")}
            className={
              selection === "bookings"
                ? "bg-blue-500 text-white px-4 py-2 rounded-md"
                : "bg-gray-300 px-4 py-2 rounded-md"
            }
          >
            Your Bookings
          </button>
          <button
            onClick={() => setSelection("history")}
            className={
              selection === "history"
                ? "bg-blue-500 text-white px-4 py-2 rounded-md"
                : "bg-gray-300 px-4 py-2 rounded-md"
            }
          >
            Your History
          </button>
        </div>

        {selection === "rides" && <NextRides />}
        {selection === "bookings" && <Bookings />}
        {selection === "history" && <History />}
      </div>
    </div>
  );
};

export default Dashboard;
