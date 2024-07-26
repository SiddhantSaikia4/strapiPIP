import React from "react";
import styled from "styled-components";
import { useController, useFormContext } from "react-hook-form";

const Container = styled.span`
  display: inline-flex;
  align-items: center;
  width: 450px;
  max-width: 550px;
  height: 56.5px;
  padding: 4px 12px;
  border: 1px solid #bfc9d9;
  border-radius: 4px;

  select {
    margin-right: 8px;
    border: none;
    width: auto;
    height: auto;
    cursor: pointer;
    background: none;
    font-size: 14px;
  }

  input[type="text"] {
    border: none;
    width: 100%;
    font-size: 14px;
  }
`;

const ColorPicker = ({ onChange, value }) => {
  return (
    <Container>
      <select onChange={onChange} value={value}>
        <option value="#008000">Green</option>
        <option value="#FFBF00">Amber</option>
        <option value="#FF0000">Red</option>
      </select>
      {/* <input type="text" readOnly value={value} /> */}
    </Container>
  );
};

const ColorPickers = ({ name }) => {
  const { control } = useFormContext();
  const {
    field: { onChange, value },
  } = useController({
    name,
    control,
    defaultValue: "#008000",
  });

  return <ColorPicker onChange={onChange} value={value} />;
};

export default ColorPickers;
