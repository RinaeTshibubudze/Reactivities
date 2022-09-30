import React, { Fragment, useEffect, useState } from 'react';
import axios from 'axios';
import { Container} from 'semantic-ui-react';
import { Activity } from '../models/activity';
import Navbar from './Navbar';
import ActivityDashboard from '../../features/activities/dashboard/ActivityDashboard';


function App() {
const [activities, setActivities] = useState<Activity[]>([]);

useEffect(() => {
  axios.get<Activity[]>("http://localhost:5000/api/activities").then(response => {
    setActivities(response.data);
  });
}, [])

  return (
    <>
      <Navbar />
      <Container style={{marginTop: '7em'}}>
          <ActivityDashboard activities={activities} />
      </Container>

    </>
  );
}

export default App;
