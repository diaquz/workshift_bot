import { useState, useEffect } from "react";
import {  Card,  Tabs } from "flowbite-react";

import UserList from "../../components/UserList";

import FastAPIClient from "../../client";
import config from "../../config";

const client = new FastAPIClient(config)


const MoaderationScreen = () => {

    const [users, setUsers] = useState([])

    useEffect(() => {
        fetchUsers()
    }, [])

    const fetchUsers = () => {
        client.fetchUsers(0, 10).then((data) => {
            setUsers(data?.result)
        });
    };

    return (
    <>
        <Card className="m-5 lg:m-10 min-h-screen">
            <Tabs.Group className="container place-content-center mx-auto">
                <Tabs.Item title="Пользователи">
                    <UserList users={users}/>
                </Tabs.Item>
                <Tabs.Item title="Запросы на регистрацию"></Tabs.Item>
                <Tabs.Item title="График"></Tabs.Item>
                <Tabs.Item title="Обмены"></Tabs.Item>
            </Tabs.Group>
        </Card>
    </>
    );
};


export default MoaderationScreen;
