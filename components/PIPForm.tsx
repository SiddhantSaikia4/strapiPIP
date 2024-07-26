import React, { useState, useEffect } from "react";
import { useForm, UseFormProps, UseFormReturn, FormProvider } from "react-hook-form";
import { Appointment, Colors, EmployeePosition, Goals } from "../models";
import { AppointmentBaseForm } from "./BaseForm";
import { AppointmentContactForm } from "./ContactForm";
import { yupResolver } from "@hookform/resolvers/yup";
import { validationSchema } from "../validation";
import { Button, Grid, Paper, Typography, Select, MenuItem, FormControl, InputLabel, SelectChangeEvent } from "@mui/material";
import { DevTool } from "@hookform/devtools";
import { RagForm } from "./RagForm";
import { DigitalForm } from "./DigitalForm";
import { fetcher } from "../lib/api";
import { getTokenFromLocalCookie, getTokenFromServerCookie, setToken } from "../lib/auth";
import jsPDF from "jspdf";
import 'jspdf-autotable';
import GradeScaler from "./GradeScaler";


const defaultValues: Appointment = {
  empname: "",
  date: new Date().toString(),
  position: EmployeePosition.Junior,
  contact: {
    departmentName: "",
    rmgName: "",
    phoneNumber: "",
    email: "",
    employeeSignature: "",
    manager: "",
    evaluationProcess: "",
    improvementPlan: "",
    reportingGroup: "",
    reportingManagerSignature: "",
    resourceManagerSignature: "",
    slug: ""
  },
  rag: [
    {
      date: "",
      color: Colors.Red,
      goalsmet: Goals.Yes,
      day: '',
      actionsTaken: '',
      observations: ''
    }
  ],
  grade : {
    java : '',
    javascript: '',
    Cplusplus: '',
  }
  
};

export const PIPForm = ({ initialData, onSubmit }) => {
  const [submittedData, setSubmittedData] = useState<Appointment | null>(null);
  const [selectedDay, setSelectedDay] = useState<string>("");
  const [availableDays, setAvailableDays] = useState<string[]>([]);

  
  const [formData, setFormData] = useState<Appointment>(defaultValues);
  const [error, setError] = useState('');

  const form = useForm<Appointment>({
    defaultValues,
    resolver: yupResolver(validationSchema),
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleNestedChange = (section: string, e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [section]: {
        ...formData[section],
        [name]: value,
      },
    });
  };

  const handleDayChange = (event: SelectChangeEvent<string>) => {
    const id = event.target.value as string;
    setSelectedDay(id);
    const data = localStorage.getItem(`PIP_emp${id}`);
    setSubmittedData(data ? JSON.parse(data) : null);
  };

  const submitForm = async (data: Appointment) => {
    const payload = {
      data: {
        date: data.date,
        position: data.position,
        departmentName: data.contact.departmentName,
        email: data.contact.email,
        employeeSignature: data.contact.employeeSignature,
        evaluationProcess: data.contact.evaluationProcess,
        improvementPlan: data.contact.improvementPlan,
        manager: data.contact.manager,
        phoneNumber: data.contact.phoneNumber,
        reportingGroup: data.contact.reportingGroup,
        reportingManagerSignature: data.contact.reportingManagerSignature,
        empName: data.empname,
        // slug: data.contact.slug,
        resourceManagerSignature: data.contact.resourceManagerSignature,
        rmgName: data.contact.rmgName,
        ragData: data.rag.map((item) => ({
          date: item.date,
          color: item.color,
          goalsmet: item.goalsmet,
          day: item.day,
          actionsTaken: item.actionsTaken,
          observations: item.observations,
        })),
        grade: data.grade
        
      }
    };

    try {
      const jwt = getTokenFromLocalCookie();
  
      const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${jwt}`,
        },
        body: JSON.stringify(payload),
      }
      const response =  fetcher(`${process.env.NEXT_PUBLIC_STRAPI_URL}/contacts`, options);


      if (!response) {
        throw new Error(`HTTP error! status: ${response}`);
      }

      // const responseData = await response.json();
      console.log('Successfully submitted data to Strapi:', response);

      setSubmittedData(data);
      console.log(submittedData, "submitteddata");

    } catch (error) {
      console.error('Error submitting data to Strapi:', error);
      setError('Error submitting data to Strapi.');
    }
  };

  const resetForm = () => {
    form.reset(defaultValues);
    setSubmittedData(null);
  };

  const downloadReport = () => {
    if (!submittedData) {
      setError("No data available to generate report.");
      return;
    }

    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text("Summary Report", 14, 20);
    
    const basicInfo = [
      ["Employee Name", submittedData.empname],
      ["PIP Start Date", new Date(submittedData.date).toLocaleString()],
      ["Designation", submittedData.position],
      ["Department", submittedData.contact.departmentName],
      ["Employee Contact", submittedData.contact.phoneNumber],
      ["Reporting Manager (RM)", submittedData.contact.manager],
      ["Employee Signature", submittedData.contact.employeeSignature],
      ["RM Signature", submittedData.contact.reportingManagerSignature],
      ["RGM Name", submittedData.contact.rmgName],
      ["PM Signature", submittedData.contact.resourceManagerSignature],
      // ["HR Signature", submittedData.hrSignature],
    ];

    doc.autoTable({
      startY: 30,
      head: [["Field", "Value"]],
      body: basicInfo,
    });

    const ragData = submittedData.rag.map((ragEntry, index) => [
      index + 1,
      new Date(ragEntry.date).toLocaleDateString(),
      ragEntry.actionsTaken,
      ragEntry.goalsmet,
      ragEntry.observations,
      ragEntry.color,
    ]);

    const previousAutoTable = doc.previousAutoTable;

    doc.autoTable({
      startY: previousAutoTable ? previousAutoTable.finalY + 10 : 50,
      head: [["#", "Date", "Actions Taken", "Goals Met", "Observations", "RAG"]],
      body: ragData,
    });

    doc.save("summary_report.pdf");
  };


  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(submitForm)}>
        <Typography
          variant="h4"
          component="h1"
          style={{ fontWeight: 600, marginBottom: "1.5rem", textAlign: "center" }}
        >
          Create a new  Plan 
        </Typography>
        <Paper elevation={3} style={{ padding: "1rem", background: 'radial-gradient(circle, rgba(238, 174, 202, 1) 0%, rgba(148, 187, 233, 1) 100%)' }}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Paper elevation={3} style={{ padding: "1rem",   background: 'radial-gradient(circle, rgba(238, 174, 202, 1) 0%, rgba(148, 187, 233, 1) 100%)'}}>
              <AppointmentBaseForm />
                <AppointmentContactForm />
                <DigitalForm />
                <Paper elevation={3} style={{ padding: "30px", marginTop: '10px' }}>
                  <RagForm />
                  <GradeScaler   />
                </Paper>
              </Paper>
            </Grid>
            <div style={{ marginTop: "11px", marginLeft: "36px", width: '100%', marginRight: '14px' }}>
              {/* <Paper elevation={3} style={{ padding: "1rem" }}> */}
              <div style={{ display: 'flex', justifyContent: "center", marginTop: '10px' }}>
                <Grid container direction="row" justifyContent={"center"} spacing={2}>
                  <Grid item >
                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                      <Button type="submit" variant="outlined" style={{ width: '100px' }}>
                        Submit
                      </Button>
                    </div>
                  </Grid>
                  <Grid item >
                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                      <Button type="button" variant="outlined" style={{ width: '100px' }} onClick={resetForm}>
                        Save
                      </Button>
                    </div>
                  </Grid>
                  <Grid item >
                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                      <Button type="button" variant="contained" style={{ width: '100px', color: 'red' }} onClick={resetForm}>
                        Cancel
                      </Button>
                    </div>
                  </Grid>
                  <Grid item>
                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                      <Button type="button" variant="contained" style={{ width: '250px' }} onClick={downloadReport}>
                        Download Report
                      </Button>
                    </div>
                  </Grid>
                </Grid>
              </div>
              {/* </Paper> */}
            </div>
            <Grid item xs={12}>
              <FormControl fullWidth>
                {/* <InputLabel>Select Employee</InputLabel> */}
                {/* <Select value={selectedDay} onChange={handleDayChange}>
                  {availableDays.map(day => (
                    <MenuItem key={day} value={day}>
                      {day}
                    </MenuItem>
                  ))}
                </Select> */}
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              {submittedData && (
                <Paper elevation={3} style={{ padding: "1rem", marginTop: "2rem" }}>
                  <Typography
                    variant="h6"
                    component="h2"
                    style={{ fontWeight: 600, marginBottom: "1rem" }}
                  >
                    Submitted Data for {selectedDay}
                  </Typography>
                  <table
                    style={{
                      width: "100%",
                      borderCollapse: "collapse",
                      border: "1px solid #E5E7EB",
                    }}
                  >
                    <thead>
                      <tr>
                        <th
                          style={{
                            border: "1px solid #E5E7EB",
                            padding: "0.5rem",
                            backgroundColor: "#F9FAFB",
                          }}
                        >
                          #
                        </th>
                        <th
                          style={{
                            border: "1px solid #E5E7EB",
                            padding: "0.5rem",
                            backgroundColor: "#F9FAFB",
                          }}
                        >
                          DATE
                        </th>
                        <th
                          style={{
                            border: "1px solid #E5E7EB",
                            padding: "0.5rem",
                            backgroundColor: "#F9FAFB",
                          }}
                        >
                          ACTIONS TAKEN
                        </th>
                        <th
                          style={{
                            border: "1px solid #E5E7EB",
                            padding: "0.5rem",
                            backgroundColor: "#F9FAFB",
                          }}
                        >
                          GOALS MET
                        </th>
                        <th
                          style={{
                            border: "1px solid #E5E7EB",
                            padding: "0.5rem",
                            backgroundColor: "#F9FAFB",
                          }}
                        >
                          OBSERVATIONS
                        </th>
                        <th
                          style={{
                            border: "1px solid #E5E7EB",
                            padding: "0.5rem",
                            backgroundColor: "#F9FAFB",
                          }}
                        >
                          RAG
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {submittedData.rag.map((ragEntry, index) => (
                        <tr key={index}>
                          <td style={{ border: "1px solid #E5E7EB", padding: "0.5rem" }}>  {ragEntry.day}</td>
                          <td style={{ border: "1px solid #E5E7EB", padding: "0.5rem" }}>
                            {new Date(ragEntry.date).toLocaleDateString()}
                          </td>
                          <td style={{ border: "1px solid #E5E7EB", padding: "0.5rem" }}>
                            {ragEntry.actionsTaken}
                          </td>
                          <td style={{ border: "1px solid #E5E7EB", padding: "0.5rem" }}>
                            {ragEntry.goalsmet}
                          </td>
                          <td style={{ border: "1px solid #E5E7EB", padding: "0.5rem" }}>
                            {ragEntry.observations}
                          </td>
                          <td
                            style={{
                              border: "1px solid #E5E7EB",
                              padding: "0.75rem",
                              backgroundColor: ragEntry.color,
                            }}
                          >
                            {ragEntry.color}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '1rem', border: '1px solid black' }}>
                    <tbody>
                      <tr>
                        <td style={{ border: '1px solid black', padding: '0.5rem', backgroundColor: '#C6E7F5' }}>PIP Start Date</td>
                        <td style={{ border: '1px solid black', padding: '0.5rem' }}>{new Date(submittedData.date).toLocaleString()}</td>
                        <td rowSpan={2} style={{ border: '1px solid black', padding: '0.5rem', backgroundColor: '#C6E7F5', verticalAlign: 'top' }}>Evaluation Process</td>
                        <td rowSpan={2} style={{ border: '1px solid black', padding: '0.5rem', verticalAlign: 'top' }}>{submittedData.contact.evaluationProcess}</td>
                      </tr>
                      <tr>
                        <td style={{ border: '1px solid black', padding: '0.5rem', backgroundColor: '#C6E7F5' }}>Employee Name</td>
                        <td style={{ border: '1px solid black', padding: '0.5rem' }}>{submittedData.empname}</td>
                      </tr>
                      <tr>
                        <td style={{ border: '1px solid black', padding: '0.5rem', backgroundColor: '#C6E7F5' }}>Designation</td>
                        <td style={{ border: '1px solid black', padding: '0.5rem' }}>{submittedData.position}</td>
                        <td rowSpan={2} style={{ border: '1px solid black', padding: '0.5rem', backgroundColor: '#C6E7F5', verticalAlign: 'top' }}>Improvement Plan</td>
                        <td rowSpan={2} style={{ border: '1px solid black', padding: '0.5rem', verticalAlign: 'top' }}>{submittedData.contact.improvementPlan}</td>
                      </tr>
                      <tr>
                        <td style={{ border: '1px solid black', padding: '0.5rem', backgroundColor: '#C6E7F5' }}>Department</td>
                        <td style={{ border: '1px solid black', padding: '0.5rem' }}>{submittedData.contact.departmentName}</td>
                      </tr>
                      <tr>
                        <td style={{ border: '1px solid black', padding: '0.5rem', backgroundColor: '#C6E7F5' }}>Employee Contact</td>
                        <td style={{ border: '1px solid black', padding: '0.5rem' }}>{submittedData.contact.phoneNumber}</td>
                        <td style={{ border: '1px solid black', padding: '0.5rem', backgroundColor: '#C6E7F5' }}>Reporting Manager (RM)</td>
                        <td style={{ border: '1px solid black', padding: '0.5rem' }}>{submittedData.contact.manager}</td>
                      </tr>
                      <tr>
                        <td style={{ border: '1px solid black', padding: '0.5rem', backgroundColor: '#C6E7F5' }}>Employee Signature</td>
                        <td style={{ border: '1px solid black', padding: '0.5rem' }}>{submittedData.contact.employeeSignature}</td>
                        <td style={{ border: '1px solid black', padding: '0.5rem', backgroundColor: '#C6E7F5' }}>RM Signature</td>
                        <td style={{ border: '1px solid black', padding: '0.5rem' }}>{submittedData.contact.reportingManagerSignature}</td>
                      </tr>
                      <tr>
                        <td style={{ border: '1px solid black', padding: '0.5rem', backgroundColor: '#C6E7F5' }}>RGM Name</td>
                        <td style={{ border: '1px solid black', padding: '0.5rem' }}>{submittedData.contact.rmgName}</td>
                        <td style={{ border: '1px solid black', padding: '0.5rem', backgroundColor: '#C6E7F5' }}>PM Signature</td>
                        <td style={{ border: '1px solid black', padding: '0.5rem' }}>{submittedData.contact.resourceManagerSignature}</td>
                      </tr>
                      <tr>
                        <td style={{ border: '1px solid black', padding: '0.5rem', backgroundColor: '#C6E7F5' }}>HR Signature</td>
                        {/* <td style={{ border: '1px solid black', padding: '0.5rem' }}>{submittedData.hrSignature}</td> */}
                      </tr>
                    </tbody>
                  </table>


                </Paper>
              )}
            </Grid>
          </Grid>
        </Paper>
      </form>
      <DevTool control={form.control} />
    </FormProvider>
  );
};

// export async function getServerSideProps(req) {
//   const jwt = await getTokenFromLocalCookie;
//       // : getTokenFromServerCookie(req);
// console.log(jwt);
//   return {
//     props: {
//       jwt: jwt || null,
//     },
//   };
// }

export default PIPForm;
