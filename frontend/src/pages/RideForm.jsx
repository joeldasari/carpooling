import { useUser } from "@clerk/clerk-react";
import DateTime from "../components/DateTime";
import Selector from "../components/Selector";
import { City } from "country-state-city";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import { enqueueSnackbar } from "notistack";

const RideForm = () => {
  const navigate = useNavigate();
  const { user } = useUser();
  const ts = City.getCitiesOfState("IN", "TG");
  const ap = City.getCitiesOfState("IN", "AP");

  const cityData = [...ts, ...ap];

  // cities

  const [startCity, setStartCity] = useState(cityData[0]);

  const [destinationCity, setDestinationCity] = useState(cityData[0]);

  // vechicle details
  const [vechicleId, setVechicleId] = useState("");
  const [vechicleName, setVechicleName] = useState("");

  // date & time
  const [dateTime, setDatetime] = useState(new Date());

  // bid
  const [bid, setBid] = useState("");

  // seats
  const [seats, setSeats] = useState(0);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const f = new Intl.DateTimeFormat("en-in", {
      dateStyle: "short",
      timeStyle: "short",
    });

    if (startCity.name === destinationCity.name) {
      enqueueSnackbar("Pick Up and Drop Point should not be same", {
        variant: "error",
      });
    } else {
      const finalDoc = {
        name: user.firstName,
        email: user.emailAddresses[0].emailAddress,
        phone: user.phoneNumbers[0].phoneNumber,
        vechicleID: vechicleId,
        vechicleName: vechicleName,
        dateTime: f.format(dateTime),
        pickUp: startCity.name,
        drop: destinationCity.name,
        bidAmount: bid,
        seats: seats,
      };
      try {
        const { status } = await axios.post(
          "http://localhost:5000/rides/new",
          finalDoc
        );
        if (status === 201) {
          enqueueSnackbar("Your ride has been created", { variant: "success" });
          navigate("/dashboard");
        }
      } catch (e) {
        enqueueSnackbar(e.messages, { variant: "error" });
      }
    }
  };
  return (
    <div className="flex flex-col items-center gap-2 mt-6 mb-12 ">
      <h1 className="text-2xl font-semibold text-primary">
        Fill out this form
      </h1>
      <form
        onSubmit={handleSubmit}
        className="p-10 border border-gray-300 shadow-xl w-fit rounded-xl"
      >
        <div className="grid grid-cols-2 gap-6 mb-6">
          <label className="flex flex-col gap-1">
            <span className="text-sm text-black">
              Your Name <span className="text-red-500">*</span>
            </span>

            <input
              className="px-4 py-2 text-sm border border-gray-300 rounded-full outline-blue-500"
              type="text"
              value={user.firstName}
              placeholder="Name"
            />
          </label>

          <label className="flex flex-col gap-1">
            <span className="text-sm text-black">
              Phone Number <span className="text-red-500">*</span>
            </span>

            <input
              className="px-4 py-2 text-sm border border-gray-300 rounded-full outline-blue-500"
              type="text"
              value={user.phoneNumbers[0].phoneNumber}
              placeholder="Phone Number"
              required
            />
          </label>

          <label className="flex flex-col gap-1">
            <span className="text-sm text-black">
              Email <span className="text-red-500">*</span>
            </span>

            <input
              className="px-4 py-2 text-sm border border-gray-300 rounded-full outline-blue-500"
              type="email"
              value={user.emailAddresses[0].emailAddress}
              placeholder="Email"
              required
            />
          </label>

          <label className="flex flex-col gap-1">
            <span className="text-sm text-black">
              Vechicle ID <span className="text-red-500">*</span>
            </span>

            <input
              className="px-4 py-2 text-sm border border-gray-300 rounded-full outline-blue-500"
              type="text"
              placeholder="Vechicle ID"
              onChange={(e) => setVechicleId(e.target.value)}
              required
            />
          </label>

          <label className="flex flex-col gap-1">
            <span className="text-sm text-black">
              Vechicle Name <span className="text-red-500">*</span>
            </span>

            <input
              className="px-4 py-2 text-sm border border-gray-300 rounded-full outline-blue-500"
              type="text"
              placeholder="Vechicle Name"
              onChange={(e) => setVechicleName(e.target.value)}
              required
            />
          </label>

          <label className="flex flex-col gap-1">
            <span className="text-sm text-black">
              Pick Date & Time <span className="text-red-500">*</span>
            </span>

            <div className="flex justify-center">
              <DateTime value={dateTime} setValue={setDatetime} />
            </div>
          </label>

          <label className="flex flex-col gap-1">
            <span className="text-sm text-black">
              Pick up point <span className="text-red-500">*</span>
            </span>

            <Selector
              people={cityData}
              selected={startCity}
              setSelected={setStartCity}
            />
          </label>

          <label className="flex flex-col gap-1">
            <span className="text-sm text-black">
              Drop Point <span className="text-red-500">*</span>
            </span>

            <Selector
              people={cityData}
              selected={destinationCity}
              setSelected={setDestinationCity}
            />
          </label>

          <label className="flex flex-col gap-1">
            <span className="text-sm text-black">
              Enter Bid <span className="text-red-500">*</span>
            </span>

            <input
              className="px-4 py-2 text-sm border border-gray-300 rounded-full outline-blue-500"
              type="number"
              min={0}
              placeholder="Enter amount in Rupees"
              onChange={(e) => setBid(e.target.value)}
              required
            />
          </label>

          <label className="flex flex-col gap-1">
            <span className="text-sm text-black">
              Number of seats <span className="text-red-500">*</span>
            </span>

            <input
              className="px-4 py-2 text-sm border border-gray-300 rounded-full outline-blue-500"
              type="number"
              min={1}
              max={6}
              placeholder="Number of seats"
              onChange={(e) => setSeats(e.target.value)}
              required
            />
          </label>
        </div>

        <button className="w-full px-4 py-2 text-white bg-blue-500 rounded-full hover:bg-blue-600">
          Submit
        </button>
      </form>
    </div>
  );
};

export default RideForm;
