import * as yup from "yup";
import {  EmployeePosition } from "./models";
import "yup-phone";

const today = new Date();
today.setHours(0, 0, 0, 0);

export const validationSchema = yup.object().shape({
  empname: yup.string().required().min(2).max(120).label("Employee Name"),
  date: yup
    .date()
    .required()
    .min(today, "Date must be today or later")
    .label("Date"),
  position: yup
    .string()
    // .oneOf([EmployeePosition.Senior, EmployeePosition.Junior])
    .required()
    .label("Position"),
  contact: yup.object({
    reportingGroup: yup.string().required().min(2).max(120).label("Reporting name"),
    rmgName: yup.string().required().min(2).max(120).label("RMG name"),
    phoneNumber: yup.string().required().phone().label("Phone number"),
    email: yup.string().email().label("Email"),
    // callMeBack: yup.boolean().required().label("Callback"),
  }),
  // pets: yup.array(
  //   yup.object({
  //     name: yup.string().required().min(2).max(120).label("Name"),
  //     breed: yup.string().required().min(2).max(120).label("Breed"),
  //     description: yup.string().min(2).max(120).label("Description"),
  //   })
  // ),
});
