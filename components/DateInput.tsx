import React from "react";
import TextField from "@mui/material/TextField";
import AdapterDayjs from "@mui/lab/AdapterDayjs";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DatePicker from "@mui/lab/DatePicker";
import {
  useController,
  UseControllerReturn,
  useFormContext,
} from "react-hook-form";
import { InputProps } from "./TextInput";
import { FormControl } from "@mui/material";

export const DateInput = (props: InputProps) => {
  const { control } = useFormContext();

  const controller: UseControllerReturn = useController({
    name: props.name,
    control,
  });

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker
        label={props.label}
        value={controller.field.value}
        onChange={controller.field.onChange}
        renderInput={(params) => (
          <FormControl fullWidth>
            <TextField
              {...params}
              error={!!controller.fieldState.error}
              helperText={controller.fieldState.error?.message}
            />
          </FormControl>
        )}
      />
    </LocalizationProvider>
  );
};
