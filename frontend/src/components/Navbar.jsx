import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserButton, useAuth } from "@clerk/clerk-react";
import Loader from "./Loader";
import { BellIcon } from "@heroicons/react/20/solid";

const Navbar = () => {
  const { userId, isLoaded } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!userId) {
      navigate("/");
    }
  }, [userId]);

  return (
    <div className="flex shadow-xl sticky top-0 bg-white justify-between px-[100px] h-[10vh] items-center">
      <Link className="flex items-center gap-2 text-2xl font-semibold" to={"/"}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-8 h-8"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M8.25 18.75a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 0 1-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 0 0-3.213-9.193 2.056 2.056 0 0 0-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 0 0-10.026 0 1.106 1.106 0 0 0-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12"
          />
        </svg>
        <span>CoDriveHub</span>
      </Link>
      {!isLoaded ? (
        <Loader />
      ) : userId ? (
        <div className="flex items-center gap-4">
          <Link
            to={"/notifications"}
            className="relative flex items-center gap-2 p-2 bg-gray-200 rounded-full"
          >
            <BellIcon className="w-6 h-6" />
            <span className="absolute top-0 right-0 px-1 text-xs text-white bg-red-500 rounded-full">
              0
            </span>
          </Link>
          <button className="flex items-center gap-2">
            <UserButton afterSignOutUrl="/" />
          </button>
        </div>
      ) : (
        <Link
          to={"/signin"}
          className="px-4 py-2 text-sm text-white bg-black rounded-lg hover:bg-gray-800"
        >
          Login
        </Link>
      )}
    </div>
  );
};

export default Navbar;
