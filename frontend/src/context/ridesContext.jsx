import axios from "axios";
import { useEffect, createContext, useState } from "react";

const RidesContext = createContext();

export const RidesContextProvider = ({ children }) => {
  const [ridesData, setRidesData] = useState(null);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const fetchRides = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get("http://localhost:5000/rides/");
        setRidesData(data);
        setLoading(false);
      } catch (e) {
        setLoading(false);
        console.log(e.message);
      }
    };
    fetchRides();
  }, []);

  return (
    <RidesContext.Provider value={{ ridesData, loading }}>
      {children}
    </RidesContext.Provider>
  );
};
