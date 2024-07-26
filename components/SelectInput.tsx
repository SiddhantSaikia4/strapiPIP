import React from "react";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { useController, UseControllerReturn, useFormContext } from "react-hook-form";
import { InputProps } from "./TextInput";

export interface SelectInputOption {
  value: string;
  title: string;
  color?: string; // Add color property
}

export interface SelectInputProps extends InputProps {
  options: SelectInputOption[];
  onChange?: (e: any) => void;
}

export const SelectInput = (props: SelectInputProps) => {
  const { control } = useFormContext();

  const controller: UseControllerReturn = useController({
    name: props.name,
    control,
  });

  const handleChange = (e: any) => {
    controller.field.onChange(e);
    if (props.onChange) {
      props.onChange(e);
    }
  };

  return (
    <FormControl fullWidth>
      <InputLabel>{props.label}</InputLabel>
      <Select
        variant="outlined"
        id={props.name}
        label={props.label}
        placeholder={props.placeholder}
        onChange={handleChange}
        onBlur={controller.field.onBlur}
        name={controller.field.name}
        value={controller.field.value}
        ref={controller.field.ref}
        MenuProps={{
          sx: {
            "& .MuiList-root": {
              paddingTop: 0,
              paddingBottom: 0,
            },
          },
        }}
      >
        {props.options.map((option: SelectInputOption) => (
          <MenuItem
            key={option.value}
            value={option.value}
            style={{ backgroundColor: option.color, height: '20px', width: "10rem" }} 
          >
            {option.title}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};
