import axios from "axios";
import { useEffect, useState } from "react";
import { useUser } from "@clerk/clerk-react";
import { enqueueSnackbar } from "notistack";
import Loader from "./Loader";

const Bookings = () => {
  const [bookings, setBookings] = useState([]);
  const { user } = useUser();
  const [loading, setLoading] = useState(false);
  const id = user.emailAddresses[0].emailAddress;
  const fetchBookings = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `http://localhost:5000/rides/bookedRides/${id}`
      );
      setBookings(data);
      setLoading(false);
    } catch (e) {
      setLoading(false);
      enqueueSnackbar(e.message, { variant: "error" });
    }
  };
  useEffect(() => {
    fetchBookings();
  }, []);
  return (
    <div className="flex flex-col items-start w-[800px]">
      <h1 className="text-2xl font-semibold">Your Bookings</h1>

      {loading ? (
        <div className="flex items-center justify-center w-full h-full">
          <Loader />
        </div>
      ) : bookings.length === 0 ? (
        <div className="text-sm font-semibold text-red-500">
          You haven't booked any ride.
        </div>
      ) : (
        bookings.map((book, i) => (
          <div
            key={i}
            className="flex items-center justify-between w-full px-4 py-2 my-2 border border-gray-300 rounded-lg"
          >
            <div className="py-2 ">
              <div>
                <span>Pick Up Point: </span>
                <span className="font-semibold text-md">{book?.pickUp}</span>
              </div>
              <div>
                <span>Drop: </span>
                <span className="font-semibold text-md">{book?.drop}</span>
              </div>
              <div>
                <span>Amount to be paid: </span>
                <span className="font-semibold text-md">{book?.amount}</span>
              </div>
              <div>
                <span>Car Owner: </span>
                <span className="font-semibold text-md">{book?.carOwner}</span>
              </div>
              <div>
                <span>Car Owner Email: </span>
                <span className="font-semibold text-md">
                  {book?.carOwnerEmail}
                </span>
              </div>
              <div>
                <span>Car Owner Phone: </span>
                <span className="font-semibold text-md">
                  {book?.carOwnerPhone}
                </span>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default Bookings;
