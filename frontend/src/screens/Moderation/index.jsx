import { useState, useEffect } from "react";
import {  Card,  Tabs } from "flowbite-react";
import { useNavigate } from 'react-router-dom';

import { UserList } from "../../components/UsersList";
import EventsModeration from "../../components/EventsModeration";
import SelectUserModal from "../../components/SelectUserModal";
import RequestsList from "../../components/RequestsList";

import FastAPIClient from "../../client";
import config from "../../config";

const client = new FastAPIClient(config)


const MoaderationScreen = () => {

    const [users, setUsers] = useState([]);
    const [requests, setRequests] = useState([]);
    const [events, setEvents] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {
        if(!client.checkAuth()) navigate('/login')
        if(!client.checkPermissions()) navigate('/')
    }, []);

    useEffect(() => {
        fetchUsers(0, 10)
    }, [])

    const fetchUsers = (offset, limit) => {
        client.fetchUsers(offset, limit).then((data) => {
            setUsers(data?.result)
        });
    };

    const fetchRequests = (offset, limit) => {
        client.fetchRequests(offset, limit).then((data) => {
            setRequests(data?.result);
        });
    };

    const fetchEvents = (timestamp) => {
        client.fetchEvent(timestamp).then((data) => {
            setEvents(data?.result);
        });
    };

    const createEvent = (user, event, time) => {
        client.createEvent(user, event, time).then((data) => {
            //TODO create notify
        });
    };

    const acceptRequest = (id) => {
        client.acceptRequest(id).then((data) => {

        });
    };

    const declineRequest = (id) => {
        client.declineRequest(id).then((data) => {

        });
    };

    return (
    <>
        <Card className="m-5 lg:m-10 min-h-screen">
            <Tabs.Group className="container place-content-center mx-auto">
                <Tabs.Item title="График">
                    <EventsModeration events={events} fetch={fetchEvents} users={users} fetchUsers={fetchUsers} submit={createEvent}/>
                </Tabs.Item>
                <Tabs.Item title="Статистика">
                    
                </Tabs.Item>
                <Tabs.Item title="Пользователи">
                    <UserList users={users} fetch={fetchUsers}/>
                </Tabs.Item>
                <Tabs.Item title="Запросы на регистрацию">
                    <RequestsList requests={requests} fetch={fetchRequests} accept={acceptRequest} decline={declineRequest}/>
                </Tabs.Item>
                
            </Tabs.Group>
        </Card>
    </>
    );
};


export default MoaderationScreen;
