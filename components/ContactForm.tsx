import React from "react";
import { useFormContext, UseFormProps, UseFormReturn } from "react-hook-form";
import { Appointment } from "../models";
import { TextInput } from "./TextInput";
import { CheckboxInput } from "./CheckboxInput";

export const AppointmentContactForm = () => {
  const form: UseFormReturn<Appointment, UseFormProps> = useFormContext();

  const containerStyle = {
    display: "grid",
    gridTemplateColumns: "repeat(2, 1fr)",
    gap: "1.5rem",
  };

  const fullWidthStyle = {
    gridColumn: "span 2",
  };

  const headingStyle = {
    fontWeight: "600",
    margin: "1rem 0",
    fontSize: "1.125rem", 
  };

  return (
    <section>
      <h2 style={headingStyle}>Contact information</h2>
      <div style={containerStyle}>
        <div>
          <TextInput
            name="contact.reportingGroup"
            label="Reporting Group*"
            placeholder="Enter"
          />
        </div>
        <div>
          <TextInput
            name="contact.rmgName"
            label="Reporting/Resource Manager Name*"
            placeholder="Enter"
          />
        </div>
        <div>
          <TextInput
            name="contact.phoneNumber"
            label="Phone number*"
            placeholder="Enter"
          />
        </div>
        <div>
          <TextInput name="contact.email" label="Email" placeholder="Enter" />
        </div>
        <div style={fullWidthStyle}>
          {/* <CheckboxInput
            name="contact.callMeBack"
            label="Expectations Met"
          /> */}
        </div>
        <div>
          <TextInput
            name="contact.employeeSignature"
            label="Employee Signature"
            placeholder="Enter"
          />
        </div>
        <div>
          <TextInput
            name="contact.manager"
            label="Manager Name"
            placeholder="Enter"
          />
        </div>
        <div>
          {/* <TextInput
            name="contact.expectations"
            label="M Signature*"
            placeholder="Enter"
          /> */}
        </div>
        <div style={fullWidthStyle}>
          <TextInput
            name="contact.evaluationProcess"
            label="Evaluation Process"
            placeholder="Enter"
            
          />
        </div>
        <div>
          <TextInput
            name="contact.reportingManagerSignature"
            label="Reporting Manager Signature"
            placeholder="Enter"
          />
        </div>
        <div>
          <TextInput
            name="contact.resourceManagerSignature"
            label="Resource Manager Signature"
            placeholder="Enter"
          />
        </div>
      </div>
    </section>
  );
};
