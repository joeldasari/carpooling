import { useUser } from "@clerk/clerk-react";
import { enqueueSnackbar } from "notistack";
import { useState, useEffect } from "react";
import axios from "axios";
import Loader from "./Loader";
import { TrashIcon } from "@heroicons/react/20/solid";

const NextRides = () => {
  const [nextRides, setNextRides] = useState([]);

  const { user } = useUser();

  const [loading, setLoading] = useState(false);

  const userEmail = user.emailAddresses[0].emailAddress;

  useEffect(() => {
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
    fetchNextRides();
  }, []);
  return (
    <div className="flex flex-col items-start w-[800px]">
      <h1 className="text-2xl font-semibold">Your Rides</h1>
      {loading ? (
        <div className="flex items-center justify-center w-full h-full">
          <Loader />
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
                <span>Total Seats: </span>
                <span className="font-semibold text-md">{ride?.seats}</span>
              </div>
              <div>
                <span>Booked Seats: </span>
                <span className="font-semibold text-md">{ride?.seats}</span>
              </div>
              <div>
                <span>Status: </span>

                {ride?.status === "Not Booked" ? (
                  <span className="font-semibold text-red-500 text-md">
                    {ride?.status}
                  </span>
                ) : (
                  <span className="font-semibold text-green-500 text-md">
                    {ride?.status}
                  </span>
                )}
              </div>
            </div>
            <button className="flex items-center gap-2 px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300">
              <span className="text-sm font-semibold">Delete Ride</span>
              <TrashIcon color="red" height={20} width={20} />
            </button>
          </div>
        ))
      )}
    </div>
  );
};

export default NextRides;
