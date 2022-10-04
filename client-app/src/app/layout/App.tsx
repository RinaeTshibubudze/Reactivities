import React, { Fragment, useEffect, useState } from 'react';
import { Container} from 'semantic-ui-react';
import { Activity } from '../models/activity';
import Navbar from './Navbar';
import ActivityDashboard from '../../features/activities/dashboard/ActivityDashboard';
import agent from '../api/agent';


function App() {
const [activities, setActivities] = useState<Activity[]>([]);
const [selectedActivity, setSelectedActivity] = useState<Activity | undefined >(undefined);
const [editMode, setEditMode] = useState(false);

useEffect(() => {
  agent.Activities.list().then(response => {
    setActivities(response);
  });
}, [])

function handleSelectActivity(id: string){
  setSelectedActivity(activities.find(x => x.id === id))
}
function handleCancelSelectActivity(){
  setSelectedActivity(undefined);
}

function handleFormOpen(id?: string) {
  id ? handleSelectActivity(id) : handleCancelSelectActivity();
  setEditMode(true);
}

function handleFormClose(){
  setEditMode(false)
}

function handleCreateOrEditActivitity(activity: Activity){
  activity.id ? 
      setActivities([...activities.filter(x => x.id !== activity.id), activity])
    : setActivities([...activities, activity])
  setEditMode(false)  
  setSelectedActivity(activity);

}

function handleDeleteActivity (id: string) {
  setActivities([...activities.filter(x => x.id !== id)])
}


  return (
    <>
      <Navbar openForm={handleFormOpen} />
      <Container style={{marginTop: '7em'}}>
          <ActivityDashboard 
          activities={activities} 
          selectedActivity={selectedActivity}
          selectActivity={handleSelectActivity}
          cancelSelectActivity={handleCancelSelectActivity}
          editMode={editMode}
          openForm={handleFormOpen}
          closeForm={handleFormClose}
          createOrEdit={handleCreateOrEditActivitity}
          deleteActivity={handleDeleteActivity}

          />
      </Container>
    </>
  );
}

export default App;
