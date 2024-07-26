import { Grid, Button, Link, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@mui/material";
import { fetcher } from "../../lib/api";

const Contact = ({ contacts }) => {
    const { id, attributes } = contacts || {};

    return (
        <Grid container spacing={2} justifyContent="center" alignItems="center" style={{ minHeight: '100vh' }}>
            <Grid item style={{background: 'radial-gradient(circle, rgba(238,174,202,1) 0%, rgba(148,187,233,1) 100%);'}} xs={12}>
                <h1 className="text-5xl md:text-xl text-center text-black">
                    {contacts?.attributes?.empName} - {contacts?.attributes?.departmentName}
                </h1>
            </Grid>
            
            <Grid item xs={12} style={{background: 'radial-gradient(circle, rgba(238,174,202,1) 0%, rgba(148,187,233,1) 100%);'}} >
                {/* Existing Table for Contact Details */}
                <TableContainer component={Paper} style={{ width: '80%', borderCollapse: 'collapse', marginTop: '1rem', border: '1px solid black', marginLeft:'10%', display:'flex' }}>
                    <Table aria-label="Contact details">
                        <TableBody>
                            <TableRow>
                                <TableCell style={{ border: '1px solid black', padding: '0.5rem', backgroundColor: '#C6E7F5' }}>PIP Start Date</TableCell>
                                <TableCell style={{ border: '1px solid black', padding: '0.5rem' }}>{new Date(contacts?.attributes?.date).toLocaleString()}</TableCell>
                                <TableCell rowSpan={2} style={{ border: '1px solid black', padding: '0.5rem', backgroundColor: '#C6E7F5', verticalAlign: 'top' }}>Evaluation Process</TableCell>
                                <TableCell rowSpan={2} style={{ border: '1px solid black', padding: '0.5rem', verticalAlign: 'top' }}>{attributes?.evaluationProcess}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell style={{ border: '1px solid black', padding: '0.5rem', backgroundColor: '#C6E7F5' }}>Employee Name</TableCell>
                                <TableCell style={{ border: '1px solid black', padding: '0.5rem' }}>{contacts?.attributes?.empName}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell style={{ border: '1px solid black', padding: '0.5rem', backgroundColor: '#C6E7F5' }}>Designation</TableCell>
                                <TableCell style={{ border: '1px solid black', padding: '0.5rem' }}>{contacts?.attributes?.position}</TableCell>
                                <TableCell rowSpan={2} style={{ border: '1px solid black', padding: '0.5rem', backgroundColor: '#C6E7F5', verticalAlign: 'top' }}>Improvement Plan</TableCell>
                                <TableCell rowSpan={2} style={{ border: '1px solid black', padding: '0.5rem', verticalAlign: 'top' }}>{contacts?.attributes?.improvementPlan}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell style={{ border: '1px solid black', padding: '0.5rem', backgroundColor: '#C6E7F5' }}>Department</TableCell>
                                <TableCell style={{ border: '1px solid black', padding: '0.5rem' }}>{contacts?.attributes?.departmentName}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell style={{ border: '1px solid black', padding: '0.5rem', backgroundColor: '#C6E7F5' }}>Employee Contact</TableCell>
                                <TableCell style={{ border: '1px solid black', padding: '0.5rem' }}>{contacts?.attributes?.phoneNumber}</TableCell>
                                <TableCell style={{ border: '1px solid black', padding: '0.5rem', backgroundColor: '#C6E7F5' }}>Reporting Manager (RM)</TableCell>
                                <TableCell style={{ border: '1px solid black', padding: '0.5rem' }}>{contacts?.attributes?.manager}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell style={{ border: '1px solid black', padding: '0.5rem', backgroundColor: '#C6E7F5' }}>Employee Signature</TableCell>
                                <TableCell style={{ border: '1px solid black', padding: '0.5rem' }}>{contacts?.attributes?.employeeSignature}</TableCell>
                                <TableCell style={{ border: '1px solid black', padding: '0.5rem', backgroundColor: '#C6E7F5' }}>RM Signature</TableCell>
                                <TableCell style={{ border: '1px solid black', padding: '0.5rem' }}>{contacts?.attributes?.reportingManagerSignature}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell style={{ border: '1px solid black', padding: '0.5rem', backgroundColor: '#C6E7F5' }}>RGM Name</TableCell>
                                <TableCell style={{ border: '1px solid black', padding: '0.5rem' }}>{contacts?.attributes?.rmgName}</TableCell>
                                <TableCell style={{ border: '1px solid black', padding: '0.5rem', backgroundColor: '#C6E7F5' }}>PM Signature</TableCell>
                                <TableCell style={{ border: '1px solid black', padding: '0.5rem' }}>{contacts?.attributes?.resourceManagerSignature}</TableCell>
                            </TableRow>
                            <TableRow>
                                {/* <TableCell style={{ border: '1px solid black', padding: '0.5rem', backgroundColor: '#C6E7F5' }}>HR Signature</TableCell> */}
                                {/* <TableCell style={{ border: '1px solid black', padding: '0.5rem' }}>{contacts?.attributes?.hrSignature}</TableCell> */}
                            </TableRow>
                        </TableBody>
                    </Table>
                </TableContainer>
            
            </Grid>

            <Grid item xs={12} style={{ borderRadius: '10px', overflow: 'hidden', margin: '1rem 0', background: 'radial-gradient(circle, rgba(238,174,202,1) 0%, rgba(148,187,233,1) 100%)' }}>
    {/* New Table for ragData */}
    <TableContainer component={Paper} style={{ width: '80%',marginLeft: '10%', marginRight: '10%', borderCollapse: 'collapse', border: '1px solid #E5E7EB', borderRadius:'10px' }}>
        <Table>
            <TableHead>
                <TableRow>
                    <TableCell style={{ border: '1px solid #E5E7EB', padding: '0.5rem', backgroundColor: '#F9FAFB' }}>#</TableCell>
                    <TableCell style={{ border: '1px solid #E5E7EB', padding: '0.5rem', backgroundColor: '#F9FAFB' }}>DATE</TableCell>
                    <TableCell style={{ border: '1px solid #E5E7EB', padding: '0.5rem', backgroundColor: '#F9FAFB' }}>ACTIONS TAKEN</TableCell>
                    <TableCell style={{ border: '1px solid #E5E7EB', padding: '0.5rem', backgroundColor: '#F9FAFB' }}>GOALS MET</TableCell>
                    <TableCell style={{ border: '1px solid #E5E7EB', padding: '0.5rem', backgroundColor: '#F9FAFB' }}>OBSERVATIONS</TableCell>
                    <TableCell style={{ border: '1px solid #E5E7EB', padding: '0.5rem', backgroundColor: '#F9FAFB' }}>RAG</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {contacts?.attributes?.ragData?.map((ragEntry, index) => (
                    <TableRow key={index}>
                        <TableCell style={{ border: '1px solid #E5E7EB', padding: '0.5rem' }}>{ragEntry.day}</TableCell>
                        <TableCell style={{ border: '1px solid #E5E7EB', padding: '0.5rem' }}>{new Date(ragEntry.date).toLocaleDateString()}</TableCell>
                        <TableCell style={{ border: '1px solid #E5E7EB', padding: '0.5rem' }}>{ragEntry.actionsTaken}</TableCell>
                        <TableCell style={{ border: '1px solid #E5E7EB', padding: '0.5rem' }}>{ragEntry.goalsmet}</TableCell>
                        <TableCell style={{ border: '1px solid #E5E7EB', padding: '0.5rem' }}>{ragEntry.observations}</TableCell>
                        <TableCell style={{ border: '1px solid #E5E7EB', padding: '0.75rem', backgroundColor: ragEntry.color }}>{ragEntry.color}</TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    </TableContainer>
</Grid>

            <Grid item xs={12} style={{ textAlign: 'center', marginTop: '1rem', marginBottom:'1rem' }}>
                    <Button variant="contained" color="primary"   style={{ borderRadius: '20px',width:'100px',  background: 'radial-gradient(circle, rgba(238,174,202,1) 0%, rgba(148,187,233,1) 100%)',}}>
                        <Link href={`/edit/${id}`} passHref>
                            Edit
                        </Link>
                    </Button>
                </Grid>
        </Grid>
    );
}

export async function getServerSideProps({ params }) {
    const { slug } = params;
    const formResponse = await fetcher(`${process.env.NEXT_PUBLIC_STRAPI_URL}/contacts/${slug}`);
    return {
        props: {
            contacts: formResponse.data,
        },
    };
}

export default Contact;
