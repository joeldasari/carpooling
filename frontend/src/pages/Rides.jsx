import React, { useEffect, useState } from "react";
import axios from "axios";
import { enqueueSnackbar } from "notistack";
import { ArrowRightIcon } from "@heroicons/react/20/solid";
import Loader from "../components/Loader";
import { useUser } from "@clerk/clerk-react";

const Rides = () => {
  const [allRides, setAllRides] = useState([]);
  const [loading, setLoading] = useState(false);
  const { user } = useUser();

  const [bookLoading, setBookLoading] = useState(false);

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

  const handleClick = async (name, email, phone, pickUp, drop, amount) => {
    setBookLoading(true);
    setBook;
    const bookingDoc = {
      carOwner: name,
      carOwnerEmail: email,
      carOwnerPhone: phone,
      pickUp,
      drop,
      amount,
      userName: user.firstName,
      userEmail: user.emailAddresses[0].emailAddress,
      userPhone: user.phoneNumbers[0].phoneNumber,
      bookedSeats: 2,
    };
    try {
      const { data } = await axios.post(
        "http://localhost:5000/rides/booked",
        bookingDoc
      );

      const { status } = data;

      if (status === 201) {
        enqueueSnackbar;
      }
    } catch (e) {
      console.log(e.message);
    }
  };
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

              <div>
                <span>Amount Per Head: </span>
                <span className="font-semibold text-md">{ride?.bidAmount}</span>
              </div>

              {user.phoneNumbers[0].phoneNumber !== ride?.phone && (
                <button
                  onClick={() =>
                    handleClick(
                      ride?.name,
                      ride?.email,
                      ride?.phone,
                      ride?.pickUp,
                      ride?.drop,
                      ride?.bidAmount
                    )
                  }
                  className="flex items-center gap-2 px-4 py-2 text-white bg-black rounded-lg hover:bg-gray-800"
                >
                  <span className="text-sm font-semibold">Book Ride</span>
                  <ArrowRightIcon className="w-4 h-4 text-white" />
                </button>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Rides;
