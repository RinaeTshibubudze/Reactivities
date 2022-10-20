import React, { useEffect } from "react";
import { Button, Card, Grid, Image } from "semantic-ui-react";
import { useStore } from '../../../app/stores/store';
import LoadingComponent from '../../../app/layout/LoadingComponets';
import { Link, useParams } from "react-router-dom";
import { observer } from 'mobx-react-lite';
import ActivityDetailedHeader from "./ActivityDetailedHeader";
import ActivityDetailedInfo from './ActivityDetailedInfo';
import ActivityDetailedChat from "./ActivityDetailedChat";


export default observer(function ActivityDetails() {
    const {activityStore} = useStore();
    const {selectedActivity: activity, loadActivity, loadingInitial} = activityStore;
    const {id} = useParams<{id: string}>();

    useEffect(() => { 
        if (id) loadActivity(id)

    }, [id, loadActivity])

    if (loadingInitial || !activity) return < LoadingComponent/>;
    return (
        <Grid>
            <Grid.Column width={10}>
                <ActivityDetailedHeader />
                <ActivityDetailedInfo />
                <ActivityDetailedChat />
            </Grid.Column>
            <Grid.Column width={6}>
                <ActivityDetailedChat />
            </Grid.Column>
        </Grid>
    )
})