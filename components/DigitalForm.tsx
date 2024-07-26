import React from "react";
import { useFormContext, UseFormProps, UseFormReturn } from "react-hook-form";
import { Appointment } from "../models";
import { TextInput } from "./TextInput";
import { DateInput } from "./DateInput";
import { SelectInput, SelectInputOption } from "./SelectInput";
import ColorPicker from "./ColorPicker";
import ColorPickers from "./ColorPicker";

export const DigitalForm = () => {
  const form: UseFormReturn<Appointment, UseFormProps> = useFormContext();

  const containerStyle = {
    display: "grid",
    gridTemplateColumns: "repeat(2, 1fr)",
    gap: "1.5rem",
    marginTop: '20px'
  };

  const fullWidthStyle = {
    gridColumn: "span 2",
  };

  const headingStyle = {
    fontWeight: "600",
    margin: "1rem 0",
    fontSize: "1.125rem",
  };

  const doubleHeightStyle = {
    height: "4rem", 
  };


  return (
    <section>
      {/* <h2 style={headingStyle}>Actions Taken</h2> */}
      <div style={containerStyle}>
        {/* <div>
        <SelectInput
            name="rag.Enddate"
            label="Select Day*"
            placeholder="Day"
            options={daysOptions}
          />
        </div> */}
        <div>
          <TextInput
            name="contact.departmentName"
            label="Department Name*"
            placeholder="Enter Department"
          />
        </div>
   
        <div>
      
        </div>
        <div style={fullWidthStyle}>
          <TextInput
            name="contact.improvementPlan"
            label="Improvement Plan*"
            placeholder="Enter Improvement Plan"
            style={doubleHeightStyle}
          />
        </div>
      </div>
    </section>
  );
};
