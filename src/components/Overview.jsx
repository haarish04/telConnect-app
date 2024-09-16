import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';  // Recharts for pie charts
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import { LocalizationProvider, DateCalendar } from '@mui/x-date-pickers';
import dayjs from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';  // Correct import for AdapterDayjs
import axios from 'axios';  // Import Axios
import '../styles/Overview.css'; // Custom CSS

const Overview = () => {
  const [activeUsersCount, setActiveUsersCount] = useState(0);
  const [inactiveUsersCount, setInactiveUsersCount] = useState(0);
  const [prepaidUsersCount, setPrepaidUsersCount] = useState(0);
  const [postpaidUsersCount, setPostpaidUsersCount] = useState(0);

  useEffect(() => {
    // Function to fetch and process data
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8082/api/customers/plans?adminId=1');
        const data = response.data;

        // Initialize counts
        let activeCount = 0;
        let inactiveCount = 0;
        let prepaidCount = 0;
        let postpaidCount = 0;

        // Process data
        data.forEach(item => {
          if (item.status === 'Active') {
            activeCount++;
          } else if (item.status === 'Expired') {
            inactiveCount++;
          }

          if (item.planId.startsWith('PREP')) {
            prepaidCount++;
          } else if (item.planId.startsWith('POST')) {
            postpaidCount++;
          }
        });

        // Update state with processed data
        setActiveUsersCount(activeCount);
        setInactiveUsersCount(inactiveCount);
        setPrepaidUsersCount(prepaidCount);
        setPostpaidUsersCount(postpaidCount);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  // Data for PieCharts
  const activeUsersData = [
    { name: 'Active Users', value: activeUsersCount },
    { name: 'Inactive Users', value: inactiveUsersCount },
  ];

  const prepaidPostpaidData = [
    { name: 'Prepaid Users', value: prepaidUsersCount },
    { name: 'Postpaid Users', value: postpaidUsersCount },
  ];

  const COLORS = ['#007bff', '#28a745']; // Corporate colors

  return (
    <Container fluid className="overview-container">
      <Row className="justify-content-md-center mb-4">
        {/* Pie chart for number of active users */}
        <Col md={6} lg={5} className="pie-chart-container">
          <Typography variant="h6" gutterBottom className="chart-title">
            Number of Active Users
          </Typography>
          <PieChart width={350} height={350}>
            <Pie
              data={activeUsersData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={120}
              fill="#007bff"
            >
              {activeUsersData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </Col>

        {/* Pie chart for ratio of prepaid and postpaid users */}
        <Col md={6} lg={5} className="pie-chart-container">
          <Typography variant="h6" gutterBottom className="chart-title">
            Ratio of Prepaid and Postpaid Users
          </Typography>
          <PieChart width={350} height={350}>
            <Pie
              data={prepaidPostpaidData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={120}
              fill="#28a745"
            >
              {prepaidPostpaidData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </Col>
      </Row>

      <Row className="justify-content-md-center">
        {/* Notepad for the Admin */}
        <Col md={6} lg={5} className="notepad-container">
          <Typography variant="h6" gutterBottom className="section-title">
            Admin Notepad
          </Typography>
          <Card>
            <Card.Body>
              <TextField
                id="outlined-multiline-static"
                label="Admin Tasks"
                multiline
                rows={6}
                defaultValue="Tasks can be jotted down by the admin..."
                fullWidth
                variant="outlined"
                className="notepad-textfield"
              />
            </Card.Body>
          </Card>
        </Col>

        {/* Calendar Section */}
        <Col md={6} lg={5} className="calendar-container">
          <Typography variant="h6" gutterBottom className="section-title">
            <CalendarTodayIcon style={{ marginRight: '10px' }} />
            Calendar
          </Typography>
          <Card>
            <Card.Body>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DateCalendar
                  referenceDate={dayjs('2022-04-17')}
                  views={['year', 'month', 'day']}
                />
              </LocalizationProvider>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Overview;
