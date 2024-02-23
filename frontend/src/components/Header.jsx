import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@clerk/clerk-react";
import Loader from "./Loader";

import Car from "../assets/car_img.png";

const Header = () => {
  const navigate = useNavigate();
  const { userId, isLoaded } = useAuth();

  useEffect(() => {
    if (!userId) {
      navigate("/");
    }
  }, [userId]);
  return (
    <div className=" h-[90vh] flex justify-between items-center px-[100px] bg-gradient-to-t from-cyan-50 to-white">
      <div className="flex flex-col items-start gap-4">
        <h1 className="py-2 font-bold text-transparent text-8xl bg-gradient-to-r from-cyan-500 to-blue-600 bg-clip-text">
          The MostRide Network
        </h1>
        <p className="text-2xl font-semibold">
          Elevate Your Commute with CoDriveHub
        </p>
        {!isLoaded ? (
          <Loader />
        ) : userId ? (
          <Link
            className="flex items-center gap-2 px-4 py-2 text-sm text-white bg-black rounded-lg hover:bg-gray-800"
            to={"/dashboard"}
          >
            <p>Go to Dashboard</p>
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
        ) : (
          <Link
            to={"/signin"}
            className="flex items-center gap-2 px-4 py-2 text-sm text-white bg-black rounded-lg hover:bg-gray-800"
          >
            <p>Get Started</p>
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
        )}
      </div>
      <img
        className="h-[400px] w-[800px] object-contain rotate-2"
        src={Car}
        alt="/"
        draggable="false"
      />
    </div>
  );
};

export default Header;
