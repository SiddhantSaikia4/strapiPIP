import { useState } from 'react';
import useSWR from 'swr';
import { useFetchUser } from '../lib/authContext';
import { fetcher } from '../lib/api';
import { getTokenFromLocalCookie } from '../lib/auth';
import CircularProgressWithLabel from '../components/CircularProgressBar';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Link from 'next/link';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import Slider from '@mui/material/Slider';

const List = ({ initialContacts }) => {
  const [pageIndex, setPageIndex] = useState(1);
  const { user, loading } = useFetchUser();
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedContact, setSelectedContact] = useState(null);

  const { data, mutate: mutateContacts } = useSWR(
    `${process.env.NEXT_PUBLIC_STRAPI_URL}/contacts?pagination[page]=${pageIndex}&pagination[pageSize]=12`,
    fetcher,
    {
      fallbackData: initialContacts,
    }
  );

  const handleDelete = async (id) => {
    try {
      const jwt = getTokenFromLocalCookie();
      const options = {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${jwt}`,
        },
      };

      const response = await fetcher(`${process.env.NEXT_PUBLIC_STRAPI_URL}/contacts/${id}`, options);

      if (!response) {
        throw new Error(`HTTP error! status: ${response}`);
      }

      mutateContacts((currentContacts) => ({
        data: currentContacts.data.filter((contact) => contact.id !== id),
      }));

      console.log('Successfully deleted emp data from Strapi:', response);
    } catch (error) {
      console.error('Error deleting data from Strapi:', error);
    }
  };

  const calculateProgress = (ragData) => {
    const totalDays = 30;
    const availableDays = ragData?.length || 0;
    const percentage = (availableDays / totalDays) * 100;
    return percentage;
  };

  const handleMenuOpen = (event, contact) => {
    setAnchorEl(event.currentTarget);
    setSelectedContact(contact);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedContact(null);
  };

  const downloadReport = (contact) => {
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text("Summary Report", 14, 20);

    const basicInfo = [
      ["Employee Name", contact.attributes.empName],
      ["PIP Start Date", new Date(contact.attributes.date).toLocaleString()],
      ["Designation", contact.attributes.position],
      ["Department", contact.attributes.departmentName],
      ["Employee Contact", contact.attributes.phoneNumber],
      ["Reporting Manager (RM)", contact.attributes.manager],
      ["Employee Signature", contact.attributes.employeeSignature],
      ["RM Signature", contact.attributes.reportingManagerSignature],
      ["RGM Name", contact.attributes.rmgName],
      ["PM Signature", contact.attributes.resourceManagerSignature],
      ["HR Signature", contact.attributes.hrSignature],
    ];

    doc.autoTable({
      startY: 30,
      head: [["Field", "Value"]],
      body: basicInfo,
    });

    console.log(contact, 'contact');

    const ragData = contact.attributes.ragData.map((ragEntry, index) => [
      index + 1,
      new Date(ragEntry.date).toLocaleDateString(),
      ragEntry.actionsTaken,
      ragEntry.goalsmet,
      ragEntry.observations,
      ragEntry.color,
    ]);

    doc.autoTable({
      startY: doc.autoTable.previous.finalY + 10,
      head: [["#", "Date", "Actions Taken", "Goals Met", "Observations", "RAG"]],
      body: ragData,
    });

    doc.save(`${contact.attributes.empName}_summary_report.pdf`);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <div>Please log in to view the employee list.</div>;
  }

  const getGradeColor = (grade) => {
    if (grade >= 4) return 'green';
    if (grade >= 3) return 'orange';
    return 'red';
  };

  const handleGradeChange = async (id, skill, newGrade) => {
    try {
      const jwt = getTokenFromLocalCookie();
      const contact = data.data.find((contact) => contact.id === id);
      const updatedGrade = { ...contact.attributes.grade, [skill]: newGrade };
  
      const options = {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${jwt}`,
        },
        body: JSON.stringify({
          data: {
            grade: updatedGrade,
          },
        }),
      };
  
      const response = await fetcher(`${process.env.NEXT_PUBLIC_STRAPI_URL}/contacts/${id}`, options);
  
      if (!response) {
        throw new Error(`HTTP error! status: ${response}`);
      }
  
      mutateContacts();
      console.log('Successfully updated grade in Strapi:', response);
    } catch (error) {
      console.error('Error updating grade in Strapi:', error);
    }
  };
  

  return (
    <>
      <Box sx={{ mx: 'auto', py: 2, display: 'flex', flexWrap: 'wrap', gap: 2 }}>
        <Typography variant="h5" style={{ marginTop: '5px', alignContent: 'center', width: '100%', textAlign: 'center' }}>Employee Performance Cards</Typography>
        <Grid container spacing={2}>
          {data?.data?.reverse().map((contact) => {
            const progress = calculateProgress(contact.attributes.ragData);
            const initial = contact.attributes.empName ? contact.attributes.empName.charAt(0).toUpperCase() : '';

            const grade = contact.attributes.grade || {};
            const { Javascript, Java, Cplusplus } = grade;

            return (
              <Grid item xs={12} sm={6} md={4} key={contact.id}>
                <Paper
                  sx={{
                    mb: 4,
                    p: 2,
                    backgroundColor: 'rgba(255, 255, 255, 0.75)',
                    backdropFilter: 'blur(16px) saturate(180%)',
                    WebkitBackdropFilter: 'blur(16px) saturate(180%)',
                    borderRadius: '12px',
                    border: '1px solid rgba(209, 213, 219, 0.3)',
                  }}
                >
                  <Grid container spacing={2}>
                    <Grid item xs={2} container alignItems="flex-start">
                      <Avatar>{initial}</Avatar>
                    </Grid>
                    <Grid item xs={8} container alignItems="flex-start">
                      <Typography variant="h6" style={{ fontWeight: 'bold', background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                        {contact.attributes.empName}
                      </Typography>
                    </Grid>
                    <Grid item xs={2} container justifyContent="flex-end">
                      <IconButton
                        aria-label="more"
                        aria-controls="long-menu"
                        aria-haspopup="true"
                        onClick={(event) => handleMenuOpen(event, contact)}
                      >
                        <MoreVertIcon />
                      </IconButton>
                      <Menu
                        anchorEl={anchorEl}
                        open={Boolean(anchorEl) && selectedContact?.id === contact.id}
                        onClose={handleMenuClose}
                      >
                        <MenuItem onClick={() => handleMenuClose()}>
                          <Link href={`/contact/${contact.id}`}>
                            <Button variant="text" color="primary">
                              View
                            </Button>
                          </Link>
                        </MenuItem>
                        <MenuItem onClick={() => {
                          handleDelete(contact.id);
                          handleMenuClose();
                        }}>
                          <Button variant="text" color="secondary">
                            Delete
                          </Button>
                        </MenuItem>
                        <MenuItem onClick={() => {
                          downloadReport(contact);
                          handleMenuClose();
                        }}>
                          <Button variant="text" color="primary">
                            Download Report
                          </Button>
                        </MenuItem>
                      </Menu>
                    </Grid>
                    <Grid item xs={12} container spacing={2}>
                      <Grid item xs={8}>
                        <Paper
                          sx={{
                            p: 2,
                            backgroundColor: 'rgba(255, 255, 255, 0.75)',
                            backdropFilter: 'blur(16px) saturate(180%)',
                            WebkitBackdropFilter: 'blur(16px) saturate(180%)',
                            borderRadius: '12px',
                            border: '1px solid rgba(209, 213, 219, 0.3)',
                          }}
                        >
                          <Typography variant="body2" style={{ fontWeight: 'bold', color: getGradeColor(Javascript) }}>
                            JavaScript: {Javascript || 0}
                          </Typography>
                          <Slider
                            defaultValue={Javascript || 0}
                            aria-label="Javascript"
                            valueLabelDisplay="auto"
                            step={1}
                            marks
                            min={0}
                            max={5}
                            onChangeCommitted={(event, value) => handleGradeChange(contact.id, 'Javascript', value)}
                            sx={{
                              color: '#FE6B8B',
                              '& .MuiSlider-thumb': {
                                width: '12px',
                                height: '12px',
                              },
                            }}
                          />
                          <Typography variant="body2" style={{ fontWeight: 'bold', color: getGradeColor(Java) }}>
                            Java: {Java || 0}
                          </Typography>
                          <Slider
                            defaultValue={Java || 0}
                            aria-label="Java"
                            valueLabelDisplay="auto"
                            step={1}
                            marks
                            min={0}
                            max={5}
                            onChangeCommitted={(event, value) => handleGradeChange(contact.id, 'Java', value)}
                            sx={{
                              color: '#FE6B8B',
                              '& .MuiSlider-thumb': {
                                width: '12px',
                                height: '12px',
                              },
                            }}
                          />
                          <Typography variant="body2" style={{ fontWeight: 'bold', color: getGradeColor(Cplusplus) }}>
                            C++: {Cplusplus || 0}
                          </Typography>
                          <Slider
                            defaultValue={Cplusplus || 0}
                            aria-label="Cplusplus"
                            valueLabelDisplay="auto"
                            step={1}
                            marks
                            min={0}
                            max={5}
                            onChangeCommitted={(event, value) => handleGradeChange(contact.id, 'Cplusplus', value)}
                            sx={{
                              color: '#FE6B8B',
                              '& .MuiSlider-thumb': {
                                width: '12px',
                                height: '12px',
                              },
                            }}
                          />
                        </Paper>
                      </Grid>
                      <Grid item xs={4} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }} >
                        <CircularProgressWithLabel  value={progress} />
                      </Grid>
                    </Grid>
                  </Grid>
                </Paper>
              </Grid>
            );
          })}
        </Grid>
      </Box>
      <Box sx={{ display: 'flex', justifyContent: 'center', py: 2 }}>
        <Button
          variant="contained"
          color="primary"
          disabled={pageIndex === 1}
          onClick={() => setPageIndex((prev) => Math.max(prev - 1, 1))}
          sx={{ mx: 1 }}
        >
          Previous
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={() => setPageIndex((prev) => prev + 1)}
          sx={{ mx: 1 }}
        >
          Next
        </Button>
      </Box>
    </>
  );
};

export default List;
