import { useEffect, useState } from "react";
import axios from "axios";
import { enqueueSnackbar } from "notistack";
import { ArrowRightIcon } from "@heroicons/react/20/solid";
import Loader from "../components/Loader";
import { useUser } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";

const Rides = () => {
  const navigate = useNavigate();
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

  const handleClick = async (ride) => {
    setBookLoading(true);
    const bookingDoc = {
      carOwner: ride?.name,
      carOwnerEmail: ride?.email,
      carOwnerPhone: ride?.phone,
      pickUp: ride?.pickUp,
      drop: ride?.drop,
      amount: ride?.bidAmount,
      userName: user.firstName,
      userEmail: user.emailAddresses[0].emailAddress,
      userPhone: user.phoneNumbers[0].phoneNumber,
      booked: true,
      rideId: ride._id,
    };
    try {
      const result = await axios.post(
        "http://localhost:5000/rides/booked",
        bookingDoc
      );

      if (result.status === 201) {
        setBookLoading(false);
        enqueueSnackbar("Your ride has been booked", { variant: "success" });
        navigate("/dashboard");
      }
    } catch (e) {
      setBookLoading(false);
      enqueueSnackbar(e.message, { variant: "error" });
    }
  };
  return (
    <div>
      <h1 className="mt-10 text-2xl font-semibold text-center ">
        Available Rides
      </h1>

      <p className="text-sm font-semibold text-center text-red-500">
        {allRides.length === 0 && "No Rides are Available"}
      </p>

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
                <span>Total Amount: </span>
                <span className="font-semibold text-md">
                  {ride?.bidAmount}/-
                </span>
              </div>

              {user.phoneNumbers[0].phoneNumber === ride?.phone ? (
                <p className="text-sm font-semibold text-red-500">
                  You created this ride
                </p>
              ) : ride?.booked === true ? (
                <div
                  className={`gap-2 px-4 py-2 text-white  bg-red-500 rounded-lg `}
                >
                  <span className="text-sm font-semibold">Already Booked</span>
                </div>
              ) : (
                <button
                  onClick={() => handleClick(ride)}
                  className={`flex items-center gap-2 px-4 py-2 text-white ${
                    bookLoading
                      ? "cursor-not-allowed bg-gray-500 hover:bg-gray-500"
                      : ""
                  } bg-black rounded-lg hover:bg-gray-800`}
                  disabled={bookLoading ? true : false}
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
