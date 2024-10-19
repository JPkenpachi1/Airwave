import React from 'react';
import { Container, Tab, Tabs } from 'react-bootstrap';
import ReusableTable from '../components/widgets/table';


const Report = () => {
  const complaintColumns = [
    'name',
    'phone',
    'phone2',
    'address',
    'complaint_type',
    'complaint_description',
    'date',
    'status',
    'resolved_date',
    'technician'
  ];
  const complaintApiUrl = 'complaints/'; // Update with your API endpoint for complaints
  const complaintUpadteUrl = 'complaint'
  // Columns for Enquiries
  const enquiryColumns = [
    'enquiry_start_date',
    'booking_date',
    'enquiry_closer_date',
    'name',
    'address',
    'area',
    'contact_no',
    'enquiry_state',
    'enquiry_status',
    'assigned_to',
    'submitted_by',
    'resolution_summary',
    'remarks',
    'ending_status'
  ];
  const enquiryApiUrl = 'getenquiry/'; // Update with your API endpoint for enquiries
  const userApi = 'user-profiles/'
  const userColumns = [
    'name','phone','phone2','address','uid','username'
  ];
  return(
    <Container fluid>
    <Tabs defaultActiveKey="complaints" id="report-tabs" className="mb-3">
      <Tab eventKey="complaints" title="Complaints">
        <Container>
        <h2>Complaints</h2>
      <ReusableTable columns={complaintColumns} apiUrl={complaintApiUrl} updateUrl={complaintUpadteUrl}/>
        </Container>
      </Tab>
      <Tab eventKey="enquiries" title="Enquiries">
        <Container fluid>
        <h2>Enquiries</h2>
        <ReusableTable columns={enquiryColumns} apiUrl={enquiryApiUrl} />
        </Container>
      </Tab>
      <Tab eventKey="users" title="Users">
        <Container fluid>
        <h2>Users</h2>
        <ReusableTable columns={userColumns} apiUrl={userApi} showActions={false} />
        </Container>
      </Tab>
    </Tabs>
    </Container>
  );
};

export default Report;
