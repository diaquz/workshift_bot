import { useContext, useEffect, useState } from "react";
import { SlOptionsVertical} from "react-icons/sl"
import { HiBellAlert, HiOutlineBellAlert } from "react-icons/hi2"
import { HiUpload } from "react-icons/hi"

import { DatePicker, Button } from "components/Inputs";
import { fetchForUser } from "api/Events";
import { createOffer } from "api/Offers";
import timeFormat from "utils/time";
import { EventTypes } from "utils/constants";
import { AlertContext } from "App";

import { Event } from "components/Events";
import { NavigationContext } from "components/Navigation";

const EventGroup = ({date, events, publish}) => {
    return (
    <>
        <div>
            <div className=" text-sm"> {date} </div>
            <div>
                {events && events.map((event) => 
                    <Event key={event.id} event={event}>
                        <HiBellAlert className="w-8 h-8 hover:bg-slate-50 p-1 rounded"/>
                        { event.type == EventTypes.Workshift && <HiUpload className="w-8 h-8 hover:bg-slate-50 p-1 rounded" onClick={() => publish(event.id)}/> }
                    </Event>)}
            </div>
        </div>
    </>
    );
};


const ScheduleScreen = () => {
    const [events, setEvents] = useState([])
    const [timestapms, setTimestamps] = useState({ start: timeFormat.unix(), end: timeFormat.unix(7)});
    const setAlert = useContext(AlertContext);
    const setItems = useContext(NavigationContext);

    const [startDate, setStartDate] = useState(timeFormat.formatNow())
    const [endDate, setEndDate] = useState(timeFormat.formatNow(7))

    useEffect(() => { setItems([{name: "График", action: () => {}}]) }, []);
    useEffect(() => { fetchForUser(timestapms).then((result) => setEvents(result)).catch((error) => setAlert(["Ошибка"])) }, [timestapms, setAlert]);

    const onSearch = () => { 
        setTimestamps({ start: timeFormat.parse(startDate), end: timeFormat.parse(endDate) })
    };

    const handlePublishEvent = (id) => {
        createOffer(id)
            .then((result) => setAlert({ success: true, label: "Успех", message: "Предложение обмена успешно создано"}))
            .catch((error) => setAlert({ success: false, label: "Ошибка", message: "Не удалось создать предложение обмена"}));
    }

    const toggleNotify = (id) => {};

    return (
    <>
    <div className="h-max min-h-screen bg-slate-50">
        <div className="mx-5 md:mx-10 py-20">
            <div className="flex flex-col md:flex-row space-y-3 md:space-y-0 mx-5 justify-center md:space-x-5 items-center">
                <DatePicker name="schedule-start-time" label="Начальная дата" date={startDate} onChange={(e) => setStartDate(e)} />
                <DatePicker name="schedule-end-timer" label="Конечная дата" date={endDate} onChange={(e) => setEndDate(e)}/>
                <Button label={"Поиск"} onClick={onSearch} />
            </div>
                { events && events.map((group) => <EventGroup key={group[0]} date={group[0]} events={group[1]} publish={handlePublishEvent} />)}
        </div>
    </div>
    </>
    );
};

export default ScheduleScreen;
