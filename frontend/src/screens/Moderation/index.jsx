import { useState, useEffect } from "react";
import {  Card,  Tabs } from "flowbite-react";
import { useNavigate } from 'react-router-dom';

import { UserList } from "../../components/UsersList";
import EventsModeration from "../../components/EventsModeration";
import UserFeedbackList from "../../components/UserFeedbackList";
import SelectUserModal from "../../components/SelectUserModal";
import RequestsList from "../../components/RequestsList";
import MessageToast from "../../components/BaseToast";

import FastAPIClient from "../../client";
import config from "../../config";

const client = new FastAPIClient(config)


const MoaderationScreen = () => {

    const [users, setUsers] = useState([]);
    const [requests, setRequests] = useState([]);
    const [events, setEvents] = useState([]);
    const [feedbacks, setFeedbacks] = useState([]);
    const [toasts, setToasts] = useState([]);

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
        }).catch((data) => { setToasts(["Ошибка"])});
    };

    const fetchEvents = (timestamp) => {
        client.fetchEvent(timestamp).then((data) => {
            setEvents(data?.result);
        }).catch((data) => { setToasts(["Ошибка"])});
    };

    const createEvent = (user, event, time) => {
        client.createEvent(user, event, time).then((data) => {
            //TODO create notify
        }).catch((data) => { setToasts(["Ошибка"]); });
    };

    const fetchFeedback = () => {
        client.fetchFeedback().then((data) => {
            setFeedbacks(data?.result)
        }).catch((data) => { setToasts(["Ошибка"]); });
    };

    const handleDelete = (id) => {
        client.deleteEvent(id).then((data) => {
            setToasts(["Событие удалено"])
        }).catch((data) => { setToasts(["Ошибка"]); })
    }

    const acceptRequest = (id) => {
        client.acceptRequest(id).then((data) => {
            setToasts(["Запрос принят"])
        }).catch((data) => { setToasts(["Ошибка"])});
    };

    const declineRequest = (id) => {
        client.declineRequest(id).then((data) => {
            setToasts(["Запрос отклонен"]);
            fetchRequests(0, 10)
        }).catch((data) => { setToasts(["Ошибка"])});
    };

    const removeFeedback = (id) => {
        client.removeFeedback(id).then((data) => {
            setToasts();
        }).catch((data) => { setToasts(["Ошибка"]); });
    };

    return (
    <>
        <Card className="m-5 lg:m-10 min-h-screen">
        {toasts && toasts.map((toast) => <MessageToast message={toast} onClose={() => setToasts([])}/>)}
            <Tabs.Group className="container place-content-center mx-auto">
                <Tabs.Item title="График">
                    <EventsModeration events={events} fetch={fetchEvents} users={users} fetchUsers={fetchUsers} submit={createEvent} onDelete={handleDelete}/>
                </Tabs.Item>
                <Tabs.Item title="Статистика">
                    
                </Tabs.Item>
                <Tabs.Item title="Пользователи">
                    <UserList users={users} fetch={fetchUsers}/>
                </Tabs.Item>
                <Tabs.Item title="Запросы на регистрацию">
                    <RequestsList requests={requests} fetch={fetchRequests} accept={acceptRequest} decline={declineRequest}/>
                </Tabs.Item>
                <Tabs.Item title="Запросы пользователей">
                    <UserFeedbackList feedbacks={feedbacks} fetch={fetchFeedback} remove={removeFeedback} />
                </Tabs.Item>
                
            </Tabs.Group>
        </Card>
    </>
    );
};


export default MoaderationScreen;
