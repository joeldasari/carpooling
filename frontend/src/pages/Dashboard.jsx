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
        <div className="flex gap-4 text-sm font-medium">
          <div className="flex gap-4 text-sm font-semibold "></div>
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
        </div>

        {selection === "rides" && <NextRides />}
        {selection === "bookings" && <Bookings />}
      </div>
    </div>
  );
};

export default Dashboard;
