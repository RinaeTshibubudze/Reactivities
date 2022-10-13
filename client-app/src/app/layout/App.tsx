import React from 'react';
import { Container} from 'semantic-ui-react';
import Navbar from './Navbar';
import ActivityDashboard from '../../features/activities/dashboard/ActivityDashboard';
import { observer } from 'mobx-react-lite';
import { Route } from 'react-router-dom';
import HomePage from '../../features/home/Homepage';
import ActivityForm from '../../features/activities/form/ActivityForm';
import ActivityDetails from '../../features/activities/details/ActivityDetails';

function App() {
  return (
    <>
      <Navbar  />
      <Container style={{marginTop: '7em'}}>
          <Route exact path='/' component={HomePage} />
          <Route exact path='/activities' component={ActivityDashboard} />
          <Route path='/activities/:id' component={ActivityDetails} />
          <Route path={['/createActivity','/manage/:id']} component={ActivityForm} />
      </Container>
    </>
  );
}

export default observer(App);

