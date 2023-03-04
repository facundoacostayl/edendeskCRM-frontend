import React, { useState, useEffect } from "react";
import DatePicker, { registerLocale, setDefaultLocale } from "react-datepicker";
import es from "date-fns/locale/es";
registerLocale("es", es);

import "react-datepicker/dist/react-datepicker.css";

type Props = {};

export const DateField = () => {
  const [startDate, setStartDate] = useState<Date>(new Date());

  useEffect(() => {
    console.log(startDate);
  }, [startDate]);

  return (
    <DatePicker
      selected={startDate}
      onChange={(date: Date) => setStartDate(date)}
      locale="es"
      dateFormat="dd-MM-yyyy"
    />
  );
};
