import React from "react";
import { FormControl, TextField } from "@mui/material";
import {
  useController,
  UseControllerReturn,
  useFormContext,
} from "react-hook-form";

export interface InputProps {
  name: string;
  placeholder?: string;
  label?: string;
  style?: React.CSSProperties;
  defaultValue?: any;
}

export const TextInput = (props: InputProps) => {
  const { control } = useFormContext();

  const controller: UseControllerReturn = useController({
    name: props.name,
    control,
    defaultValue: props.defaultValue,
  });

  return (
    <FormControl fullWidth>
      <TextField
        variant="outlined"
        placeholder={props.placeholder}
        label={props.label}
        onChange={controller.field.onChange}
        onBlur={controller.field.onBlur}
        name={controller.field.name}
        value={controller.field.value}
        ref={controller.field.ref}
        error={!!controller.fieldState.error}
        helperText={controller.fieldState.error?.message}
      
      />
    </FormControl>
  );
};
