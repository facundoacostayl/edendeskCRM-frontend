import React, { useState, useEffect } from "react";
import DatePicker, { registerLocale, setDefaultLocale } from "react-datepicker";
import es from "date-fns/locale/es";
registerLocale("es", es);

import "react-datepicker/dist/react-datepicker.css";

type Props = {
  selected: Date;
  onChange: (date: Date) => void;
  value: string;
};

export const DateField = ({ selected, onChange, value }: Props) => {
  return (
    <DatePicker
      selected={selected}
      onChange={onChange}
      locale="es"
      dateFormat="dd-MM-yyyy"
      value={value}
      className={
        "w-full py-2 px-2 md:py-4 md:px-4 md:text-lg text-indigo-500 font-semibold border border-gray-200 rounded-md shadow-sm focus:border-none focus:outline-indigo-500 focus:ring-1 focus:ring-indigo-500"
      }
      maxDate={new Date()}
    />
  );
};
