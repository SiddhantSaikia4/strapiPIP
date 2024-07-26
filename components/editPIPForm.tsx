import React, { useEffect } from "react";
import { useRouter } from "next/router";
import { Grid, Typography, Button, Paper } from "@mui/material";
import { useForm, FormProvider } from "react-hook-form";
import { AppointmentBaseForm } from "./BaseForm";
import { DigitalForm } from "./DigitalForm";
import { AppointmentContactForm } from "./ContactForm";
import { RagForm } from "./RagForm"; 

const EditPIPForm = ({ initialData, onSave, onSubmit }) => {
  const router = useRouter();
  const { id } = router.query;

  const methods = useForm({
    defaultValues: initialData || {},
  });

  useEffect(() => {
    console.log("Initial data received:", initialData);
    if (initialData) {
      methods.reset(initialData);
    }
  }, [initialData, methods]);

  const handleSave = () => {
    const data = methods.getValues();
    onSave(data);
  };

  const handleSubmit = (data) => {
    const payload = {
      ...data,
      ragData: data.rag.map((item) => ({
        date: item.date,
        color: item.color,
        goalsmet: item.goalsmet,
        day: item.day,
        actionsTaken: item.actionsTaken,
        observations: item.observations,
      })),
    };
    onSubmit(payload);
  };

  if (!initialData) {
    return <Typography variant="h6">Loading...</Typography>;
  }

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Typography variant="h4" gutterBottom>
          {/* Edit Form for {initialData?.attributes?.empName} */}
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(handleSubmit)}>
            <Paper elevation={3} style={{ padding: "1rem" }}>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <Paper elevation={3} style={{ padding: "30px", marginTop: '10px' }}>
                    <RagForm />
                  </Paper>
                </Grid>
              </Grid>
            </Paper>
            <Grid item>
              <div style={{ display: 'flex', justifyContent: 'center', marginTop: '10px' }}>
                <Button onClick={handleSave} variant="outlined" style={{ marginRight: '10px', width: '100px' }}>
                  Save
                </Button>
                <Button type="submit" variant="outlined" style={{ width: '100px' }}>
                  Submit
                </Button>
              </div>
            </Grid>
          </form>
        </FormProvider>
      </Grid>
    </Grid>
  );
};

export default EditPIPForm;
