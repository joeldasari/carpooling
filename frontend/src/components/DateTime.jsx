import { useState } from "react";
import "react-datetime-picker/dist/DateTimePicker.css";
import "react-calendar/dist/Calendar.css";
import "react-clock/dist/Clock.css";

import DateTimePicker from "react-datetime-picker";
const DateTime = ({ value, setValue }) => {
  return <DateTimePicker onChange={setValue} value={value} />;
};

export default DateTime;
