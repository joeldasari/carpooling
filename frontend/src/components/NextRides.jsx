import { useUser } from "@clerk/clerk-react";
import { enqueueSnackbar } from "notistack";
import { useState, useEffect } from "react";
import axios from "axios";
import Loader from "./Loader";
// import { TrashIcon } from "@heroicons/react/20/solid";

const NextRides = () => {
  const [nextRides, setNextRides] = useState([]);

  const { user } = useUser();

  const [loading, setLoading] = useState(false);

  const userEmail = user.emailAddresses[0].emailAddress;

  const fetchNextRides = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `http://localhost:5000/rides/user/${userEmail}`
      );
      setNextRides(data);
      setLoading(false);
    } catch (e) {
      setLoading(false);
      enqueueSnackbar(e.message, { variant: "error" });
    }
  };

  useEffect(() => {
    fetchNextRides();
  }, []);

  // const handleDelete = async (id) => {
  //   try {
  //     const { data } = await axios.delete(
  //       `http://localhost:5000/rides/delete/${id}`
  //     );
  //     fetchNextRides();
  //     enqueueSnackbar(data.message, { variant: "success" });
  //   } catch (e) {
  //     enqueueSnackbar(e.message, { variant: "error" });
  //   }
  // };
  return (
    <div className="flex flex-col items-start w-[800px]">
      <h1 className="text-2xl font-semibold">Your Rides</h1>

      {loading ? (
        <div className="flex items-center justify-center w-full h-full">
          <Loader />
        </div>
      ) : nextRides.length === 0 ? (
        <div className="text-sm font-semibold text-red-500">
          You haven't created any ride.
        </div>
      ) : (
        nextRides.map((ride, i) => (
          <div className="flex items-center justify-between w-full px-4 py-2 my-2 border border-gray-300 rounded-lg">
            <div className="py-2 " key={i}>
              <div>
                <span>Date & Time: </span>
                <span className="font-semibold text-md">{ride?.dateTime}</span>
              </div>
              <div>
                <span>Pick Up Point: </span>
                <span className="font-semibold text-md">{ride?.pickUp}</span>
              </div>
              <div>
                <span>Drop Point: </span>
                <span className="font-semibold text-md">{ride?.drop}</span>
              </div>
              <div>
                <span>Max Seats Available: </span>
                <span className="font-semibold text-md">{ride?.seats}</span>
              </div>
              <div>
                <span>Total Amount: </span>
                <span className="font-semibold text-md">
                  {ride?.bidAmount}/-
                </span>
              </div>
              <div>
                <span>Status: </span>
                <span className="font-semibold text-md">
                  {ride?.booked === true ? (
                    <span className="text-green-500">Booked</span>
                  ) : (
                    <span className="text-red-500">Not Booked</span>
                  )}
                </span>
              </div>
              {ride?.booked == true && (
                <div>
                  <h1 className="text-lg font-semibold underline">
                    Booked by:
                  </h1>
                  <div>
                    <span>Passenger Name: </span>
                    <span className="font-semibold text-md">
                      {ride?.passengerName}
                    </span>
                  </div>
                  <div>
                    <span>Passenger Phone: </span>
                    <span className="font-semibold text-md">
                      {ride?.passengerPhone}
                    </span>
                  </div>
                  <div>
                    <span>Passenger Email: </span>
                    <span className="font-semibold text-md">
                      {ride?.passengerEmail}
                    </span>
                  </div>
                </div>
              )}
            </div>
            {/* <button
              onClick={() => handleDelete(ride._id)}
              className="flex items-center gap-2 px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300"
            >
              <span className="text-sm font-semibold">Delete Ride</span>
              <TrashIcon color="red" height={20} width={20} />
            </button> */}
          </div>
        ))
      )}
    </div>
  );
};

export default NextRides;
