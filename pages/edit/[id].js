import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import EditPIPForm from "../../components/editPIPForm";
import { fetcher } from "../../lib/api";
import { Grid, Typography , Box } from "@mui/material";
import { getTokenFromLocalCookie } from "../../lib/auth";

const EditPIPFormPage = ({ contact }) => {
  const [formData, setFormData] = useState(contact);
  const router = useRouter();
  const { id } = router.query;
  const [error, setError] = useState('');

  useEffect(() => {
    if (contact) {
      setFormData(contact);
    }
  }, [contact]);

  const handleSubmit = async (data) => {
    console.log('Form data before submission:', data); 

    try {
      const jwt = getTokenFromLocalCookie();
      const options = {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${jwt}`,
        },
        body: JSON.stringify({ data }),
      };
      const response = await fetcher(`${process.env.NEXT_PUBLIC_STRAPI_URL}/contacts/${id}`, options);

      if (!response) {
        throw new Error(`HTTP error! status: ${response}`);
      }

      console.log('Successfully updated emp data to Strapi:', response);
    } catch (error) {
      console.error('Error submitting data to Strapi:', error);
      setError('Error submitting data to Strapi.');
    }
  };

  const handleSave = (data) => {
    console.log('Form data saved:', data);
    setFormData(data);
  };

  if (!contact) {
    return <Typography variant="h6">Loading...</Typography>;
  }

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
      <Typography variant="h4" gutterBottom align="center" style={{marginTop: '20px'}}>
      Edit Rag Form for{' '}
      <Box component="span" sx={{ color: 'primary.main', fontWeight: 'bold' }}>
        {contact.attributes.empName}
      </Box>
    </Typography>
      </Grid>
      <Grid item xs={12}>
        <EditPIPForm
          initialData={formData.attributes}
          onSave={handleSave}
          onSubmit={handleSubmit}
        />
      </Grid>
    </Grid>
  );
};

export async function getServerSideProps({ params }) {
  const { id } = params;
  const formResponse = await fetcher(`${process.env.NEXT_PUBLIC_STRAPI_URL}/contacts/${id}`);
  return {
    props: {
      contact: formResponse.data,
    },
  };
}

export default EditPIPFormPage;
