import { ArrowRightIcon } from "@heroicons/react/20/solid";
import axios from "axios";
import { enqueueSnackbar } from "notistack";
import { useState } from "react";

const Payments = () => {
  const max = localStorage.getItem("seats");
  const id = localStorage.getItem("id");
  const [selectedSeats, setSelectedSeats] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleClick = async () => {
    try {
      const { data } = await axios.patch(
        `http://localhost:5000/rides/booking/${id}`,
        { seats: selectedSeats, status: `${selectedSeats} are booked` }
      );
      console.log(data);
    } catch (e) {
      enqueueSnackbar(e.message, { variant: "error" });
    }
  };

  return (
    <div className="flex justify-center gap-4 mx-2 my-4 mt-8">
      <div className="flex flex-col w-[300px] gap-2">
        <p className="flex items-center gap-1 text-sm font-semibold">
          <span>Please Note, Maximum Seats are only</span>
          <span className="text-lg text-red-500">{max}</span>
        </p>
        <input
          className="px-4 py-2 text-sm border-2 border-black rounded-lg"
          type="number"
          placeholder="Seats"
          min={1}
          max={max}
          value={selectedSeats}
          onChange={(e) => setSelectedSeats(e.target.value)}
          required
        />
        <button
          onClick={handleClick}
          className="flex items-center gap-2 px-4 py-2 text-white bg-black rounded-lg hover:bg-gray-800"
        >
          <span className="text-sm font-semibold">Book Ride</span>
          <ArrowRightIcon className="w-4 h-4 text-white" />
        </button>
      </div>
    </div>
  );
};

export default Payments;
