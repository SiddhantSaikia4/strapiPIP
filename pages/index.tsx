import React from "react";
import { Container, Grid } from "@mui/material";
import { useFetchUser } from "../lib/authContext";
import Chart from "../components/OrganizationChart";
import List from "../components/EmployeeList";
import Layout from "../components/Layout";

const Title = () => (
  <Grid container spacing={1} justifyContent="center" alignItems="center">
    <Grid item xs={12}>
      <Chart initialProfiles={[]} />
    </Grid>
    <Grid item xs={12}>
      <List initialContacts={undefined} />
    </Grid>
  </Grid>
);

export default function Home() {
  const { user } = useFetchUser();

  return (
    <Layout user={user}>
      <Container 
        maxWidth="md" 
        style={{ 
          marginTop: '24px',
          display: 'flex', 
          flexDirection: 'column', 
          alignItems: 'center', 
          justifyContent: 'center', 
          background: 'radial-gradient(circle, rgba(238,174,202,1) 0%, rgba(148,187,233,1) 100%)',
          overflow: 'auto',
          WebkitOverflowScrolling: 'touch',
          msOverflowStyle: 'none',
          scrollbarWidth: 'none'
        }}
      >
        <style jsx global>{`
          ::-webkit-scrollbar {
            display: none;
          }
        `}</style>
        <Title />
      </Container>
    </Layout>
  );
}
