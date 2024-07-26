import React from "react";
import { Appointment, EmployeePosition } from "../models";
import { TextInput } from "./TextInput";
import { SelectInput, SelectInputOption } from "./SelectInput";
import { DateInput } from "./DateInput";
import { UseFormProps, UseFormReturn, useFormContext } from "react-hook-form";
import { Controller } from "react-hook-form";

const planOptions: SelectInputOption[] = [
  {
    title: "Senior Manager",
    value: EmployeePosition.Senior,
  },
  {
    title: "Software Engineer",
    value: EmployeePosition.Junior,
  },
  {
    title: "Asociate Software Engineer",
    value: EmployeePosition.Asociate,
  },
];

export const AppointmentBaseForm = () => {
  const form: UseFormReturn<Appointment, UseFormProps> = useFormContext();
  const containerStyle = {
    display: "grid",
    gridTemplateColumns: "repeat(2, 1fr)",
    gap: "1.5rem",
  };
  const { control } = useFormContext();
  const fullWidthStyle = {
    gridColumn: "span 2",
    display: 'flex',
    justifyContent: 'center',
  };

  return (
    <section>
      <div style={containerStyle}>
        <div style={fullWidthStyle}>
          <Controller
            name="empname"
            control={control}
            render={({ field }) => (
              <TextInput {...field} label="Employee Name*" placeholder="Enter" />
            )}
          />
        </div>
        <div>
          <Controller
            name="date"
            control={control}
            render={({ field }) => (
              <DateInput {...field} label="Date*" placeholder="Select date" />
            )}
          />
        </div>
        <div>
          <Controller
            name="position"
            control={control}
            render={({ field }) => (
              <TextInput {...field} label="Position" placeholder="Enter Position" />
            )}
          />
        </div>
      </div>
    </section>
  );
};
