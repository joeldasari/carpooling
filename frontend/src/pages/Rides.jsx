import React, { useEffect, useState } from "react";
import axios from "axios";
import { enqueueSnackbar } from "notistack";
import { ArrowRightIcon } from "@heroicons/react/20/solid";
import Loader from "../components/Loader";
import { useNavigate } from "react-router-dom";

const Rides = () => {
  const [allRides, setAllRides] = useState([]);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  useEffect(() => {
    const fetchAllRides = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get("http://localhost:5000/rides/");
        setAllRides(data);
        setLoading(false);
      } catch (e) {
        enqueueSnackbar(e.message, { variant: "error" });
      }
    };
    fetchAllRides();
  }, []);
  return (
    <div>
      <h1 className="mt-10 text-2xl font-semibold text-center ">
        Available Rides
      </h1>

      <div className="grid grid-cols-3 gap-6 px-10 py-4">
        {loading ? (
          <div className="fixed top-0 bottom-0 left-0 right-0 flex items-center justify-center bg-black z-100 bg-opacity-5">
            <Loader />
          </div>
        ) : (
          allRides.map((ride, i) => (
            <div
              className="flex flex-col items-center gap-4 px-4 py-4 border border-gray-300 rounded-xl "
              key={i}
            >
              <div className="flex items-center gap-2 px-4 py-2 text-2xl font-semibold bg-gray-300 w-fit rounded-xl">
                <p>{ride?.pickUp}</p>
                <ArrowRightIcon className="w-10 h-10" />
                <p>{ride?.drop}</p>
              </div>
              <div>
                <span>Date & Time: </span>
                <span className="font-semibold text-md">{ride?.dateTime}</span>
              </div>
              <div>
                <span>Car Owner: </span>
                <span className="font-semibold text-md">{ride?.name}</span>
              </div>
              <div>
                <span>Phone: </span>
                <span className="font-semibold text-md">{ride?.phone}</span>
              </div>

              <div>
                <span>Seats Available: </span>
                <span className="font-semibold text-md">{ride?.seats}</span>
              </div>

              <button
                onClick={() => {
                  navigate("/payments");
                  localStorage.setItem("seats", ride?.seats);
                  localStorage.setItem("id", ride?.email);
                }}
                className="flex items-center gap-2 px-4 py-2 text-white bg-black rounded-lg hover:bg-gray-800"
              >
                <span className="text-sm font-semibold">Book Ride</span>
                <ArrowRightIcon className="w-4 h-4 text-white" />
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Rides;
