import React, { Fragment, useEffect, useState } from 'react';
import { Container} from 'semantic-ui-react';
import { Activity } from '../models/activity';
import Navbar from './Navbar';
import ActivityDashboard from '../../features/activities/dashboard/ActivityDashboard';
import agent from '../api/agent';
import LoadingComponent from './LoadingComponets';
import { v4 } from "uuid";
import { useStore } from '../stores/store';

function App() {
  const {activityStore} = useStore();

  const [activities, setActivities] = useState<Activity[]>([]);
  const [selectedActivity, setSelectedActivity] = useState<Activity | undefined >(undefined);
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);


useEffect(() => {
  agent.Activities.list().then(response => {
    let activities: Activity[] = [];
    response.forEach(activity => {
      activity.date = activity.date.split('T')[0];
      activities.push(activity);
    })

    setActivities(activities);
    setLoading(false);
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
  setSubmitting(true);
  if (activity.id) {
    agent.Activities.update(activity).then(() => {
      setActivities([...activities.filter(x => x.id !== activity.id), activity])
      setSelectedActivity(activity);
      setEditMode(false);
      setSubmitting(false);
    })
  } else {
    activity.id = uuid();
    agent.Activities.create(activity).then(() => {
      setActivities([...activities, activity])
      setSelectedActivity(activity);
      setEditMode(false);
      setSubmitting(false);
    })
  }
}

function handleDeleteActivity (id: string) {
  setSubmitting(true);
  agent.Activities.delete(id).then(() => {
    setActivities([...activities.filter(x => x.id !== id)])
  } )
  
}

if (loading) return <LoadingComponent content='Loading app' />

  return (
    <>
      <Navbar openForm={handleFormOpen} />
      <Container style={{marginTop: '7em'}}>
          <h2>{activityStore.title}</h2>

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
          submitting={submitting}

          />
      </Container>
    </>
  );
}

export default App;

export function uuid(): string {
  return v4();
}
