import React, { useState } from "react";
import { useFieldArray, useFormContext, UseFormReturn } from "react-hook-form";
import { Appointment, Colors, Goals } from "../models";
import { TextInput } from "./TextInput";
import { DateInput } from "./DateInput";
import { SelectInput, SelectInputOption } from "./SelectInput";

const initialRow = {
  day: "",
  date: "",
  actionsTaken: "",
  goalsmet: Goals.No,
  observations: "",
  color: Colors.Red,
};

interface Styles {
  [key: string]: React.CSSProperties;
}

const styles: Styles = {
  table: {
    width: "100%",
    borderCollapse: "collapse",
  },
  th: {
    border: "1px solid black",
    padding: "8px",
    textAlign: "left",
    color: "burlywood",
  },
  td: {
    border: "1px solid black",
    padding: "13px",
  },
  buttonContainer: {
    display: "flex",
    justifyContent: "flex-end",
    marginBottom: "1rem",
    marginTop:"1rem"
  },
  button: {
    backgroundColor: "green",
    color: "white",
    border: "none",
    padding: "8px 16px",
    cursor: "pointer",
  },
  textarea: {
    width: "200%",
    height: "200%",
  },
};

export const RagForm: React.FC = () => {
  const form: UseFormReturn<Appointment> = useFormContext();
  const [rows, setRows] = useState([initialRow]);

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "rag",
  });

  const handleAddRow = () => {
    const newRow = { ...initialRow, day: (rows.length + 1).toString() };
    append(newRow);
    setRows([...rows, newRow]);
  };

  const handleDeleteRow = (index: number) => {
    const updatedRows = rows.filter((_, i) => i !== index);
    setRows(updatedRows);
    const newValues = form.getValues("rag").filter((_, i) => i !== index);
    form.setValue("rag", newValues); // Update form state
  };

  const planOptions: SelectInputOption[] = [
    { value: Goals.Yes, title: "Yes" },
    { value: Goals.No, title: "No" },
    { value: Goals.Partially, title: "Partially" },
  ];

  const colorOptions: SelectInputOption[] = [
    { value: Colors.Green, title: "", color: "green" },
    { value: Colors.Amber, title: "", color: "orange" },
    { value: Colors.Red, title: "", color: "red" },
  ];

  return (
    <section>
      <div style={styles.buttonContainer}>
        <button type="button" onClick={handleAddRow} style={styles.button}>
          +
        </button>
      </div>
      <table style={styles.table}>
        <thead>
          <tr>
            <th style={styles.th}>Day</th>
            <th style={styles.th}>Date</th>
            <th style={styles.th}>Actions Taken</th>
            <th style={styles.th}>Goals Met</th>
            <th style={styles.th}>Observations</th>
            <th style={styles.th}>RAG</th>
            <th style={styles.th}>Action</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, index) => (
            <tr key={index}>
              <td style={styles.td}>
                <TextInput name={`rag[${index}].day`} placeholder="Enter Day" defaultValue={(index + 1).toString()} />
              </td>
              <td style={styles.td}>
                <DateInput name={`rag[${index}].date`} />
              </td>
              <td style={styles.td}>
                <TextInput
                  name={`rag[${index}].actionsTaken`}
                  placeholder="Enter actions taken"
                  style={styles.textarea}
                />
              </td>
              <td style={styles.td}>
                <SelectInput
                  name={`rag[${index}].goalsmet`}
                  options={planOptions}
                  label=""
                  defaultValue={row.goalsmet}
                />
              </td>
              <td style={styles.td}>
                <TextInput
                  name={`rag[${index}].observations`}
                  placeholder="Enter observations"
                  style={styles.textarea}
                />
              </td>
              <td style={{ ...styles.td, backgroundColor: row.color, width: '10rem' }}>
                <SelectInput
                  name={`rag[${index}].color`}
                  options={colorOptions}
                  defaultValue={row.color}
                  onChange={(e) => {
                    const newRows = [...rows];
                    newRows[index].color = e.target.value as Colors;
                    setRows(newRows);
                  }}
                />
              </td>
              <td style={styles.td}>
                <button
                  type="button"
                  onClick={() => handleDeleteRow(index)}
                  style={{ ...styles.button, backgroundColor: "red" }}
                >
                  X
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
};
