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
    />
  );
};
