import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { Card } from "flowbite-react";
import { Time } from "../../constants";
import * as moment from 'moment';

import MessageToast from "../../components/BaseToast";
import { EventsList } from "../../components/UserEventsList";
import DatePicker from "../../components/DatePicker";

import FastAPIClient from "../../client";
import config from "../../config";

const client = new FastAPIClient(config)

const UserSchedule = () => {

    const [date, setDate] = useState(moment());
    const [events, setEvents] = useState([]);
    const [toasts, setToasts] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {
        if(!client.checkAuth()) navigate('/login')
    }, []);

    useEffect(() => {
        fetchSchedule(date.unix())
    }, []);

    const fetchSchedule = (date) => {
        client.fetchUserEvents(date).then((data) => {
            setEvents(data?.result);
        }).catch((data) => { 
            setToasts(["Ошибка"]);
        });
    };

    const handleDateChange = (date) => {
        const parsed = moment(date, Time.dateFormat)

        setDate(parsed);
        fetchSchedule(parsed.unix());
    };

    const publishEvent = (id) => {
        client.publishOffer(id).then((data) => {
            setToasts(["Предложение обмена создано"])
        }).catch((data) => { 
            setToasts(["Ошибка"]);
        });
    };


    return (
    <>
        <Card className="m-5 lg:m-10 min-h-screen">
            {toasts && toasts.map((toast) => <MessageToast message={toast} onClose={() => setToasts([])}/>)}
            <div className="container flex flex-col-reverse md:flex-row min-w-full">
                <div className="md:basis-3/4">
                    <EventsList events={events} publish={publishEvent}/>
                </div>
                <div className="md:basis-1/4 flex flex-col mb-5 space-y-2">
                    <DatePicker pickerId="user-event-calendar" date={Time.date(date)} onChange={handleDateChange}/>
                    {/* <CustomDatepicker defaultShow={true} input="hidden" handleChange={handleDateChange} date={date}/> */}
                </div>
            </div>
        </Card>
    </>
    );
}

export default UserSchedule;
