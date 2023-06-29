import { useContext, useEffect, useState } from "react";
import { DatePicker, Button } from "components/Inputs";
import { createEvent, editEvent, fetchAll, removeEvent } from "api/Events";
import timeFormat from "utils/time";
import { AiOutlineEdit, AiOutlineDelete } from "react-icons/ai"
import { AlertContext } from "App";
import { EditEventModal } from "components/Modal";
import { Event } from "components/Events";
import { Badge } from "components/Badges";
import { Levels } from "utils/constants";
import { NavigationContext } from "components/Navigation";
import { Modal } from "tw-elements";
import moment from "moment";
import { ErrorAlert, SuccessAlert } from "utils/alertConstructor";

const EventGroup = ({id, events, onEdit, onRemove}) => {
    const [expanded, setExpanded] = useState(false);
    const user = (events.length > 0 ? events[0].user : null);

    return (
    <>
        <div className="mb-5">
            <div 
                className="bg-white flex flex-row p-1 md:mx-5 mb-5 space-x-5 justify-start items-center rounded hover:border-slate-100 border-white border-2 border-solid" 
                onClick={() => setExpanded(!expanded)}>
                <div className="border-2 border-solid border-slate-200 ms-5">
                    <img src={user.picture} className="w-10 h-10 rounded-lg shadow-lg" alt="Avatar" />
                </div>
                <div className="text-neutral-700 text-lg"> {user.name} </div>
                <Badge label={Levels.name(user.level)} />
                <div className="text-neutral-300 text-sm"> ({events.length}) </div>
            </div>
            <div className="mx-5">
                {expanded && events && events.map((event) => 
                    <Event key={event.id} event={event}>
                       <AiOutlineEdit className="w-8 h-8 me-5 hover:bg-slate-50 p-1 rounded" onClick={() => onEdit(event)}/>
                       <AiOutlineDelete className="w-8 h-8 me-5 hover:bg-slate-50 p-1 rounded" onClick={() => onRemove(event.id)}/>
                    </Event>)}
            </div>
        </div>
    </>
    );
};


const EventModerationScreen = () => {
    const [fetchTrigger, setFetchTrigger] = useState(false);
    const [events, setEvents] = useState([])
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [modal, setModal] = useState(null);

    const setAlert = useContext(AlertContext)
    const setItems = useContext(NavigationContext)

    const [date, setDate] = useState(timeFormat.formatNow())

    useEffect(() => { 
        const modalElement = document.getElementById("edit-event-modal");
        setModal(new Modal(modalElement, {}));
    }, [])

    useEffect(() => {
         setItems([
            { name: "График", action: () => {}},
             { name: "Новое событие", action: () => { 
                setSelectedEvent(null);
                modal?.show(); 
            }}
        ]) 
    }, [modal, setItems]);

    useEffect(() => { 
        const timestamp = timeFormat.parse(date);
        fetchAll(timestamp).then((result) => setEvents(result));
    }, [date, setAlert, fetchTrigger]);

    const handleEdit = (event) => {
        setSelectedEvent(event);
        modal?.show();
    };

    const handleRemove = (id) => {
        removeEvent(id)
            .then((result) => { setAlert(SuccessAlert("Успех", "Событие удалено"));  setFetchTrigger(!fetchTrigger); })
            .catch((error) => setAlert(ErrorAlert("Ошика", "Не удалось удалить событие")));
    };

    const handleSubmit = (form, users) => {
        const start_time = moment(`${form.start_date}-${form.start_time}`, timeFormat.fullFormat);
        const end_time = moment(`${form.end_date}-${form.end_time}`, timeFormat.fullFormat);
        const ids = (users ? Object.keys(users) : []);

        const event = {
            title: form.title,
            type: form.type,
            start_time: start_time.format(),
            end_time: end_time.format(),
            notify: false,
            long: !start_time.isSame(end_time, 'days'),
            user_id: 0
        };

        if(form.isEdit && form.user) {
            event.user_id = form.user.id;
            event.id = form.event.id;
            editEvent(event)
                .then((result) => { setAlert(SuccessAlert("Успех", "Внесенные изменения сохранены")); setFetchTrigger(!fetchTrigger); })
                .catch((error) => setAlert(ErrorAlert("Ошика", "Не удалось сохранить изменения")));
        } else if(ids.length > 0) {
            createEvent(event, ids)
                .then((result) => { setAlert(SuccessAlert("Успех", `Создано ${result.filter(x => x).length} событий`)); setFetchTrigger(!fetchTrigger); })
                .catch((error) => setAlert(ErrorAlert("Ошика", "Не удалось создать события")));
        }
        modal?.hide();
    };

    return (
    <>
    <div className="h-max min-h-screen bg-slate-50">
        <div className="mx-5 md:mx-10 py-20">
            <div className="flex flex-row mx-5 mb-10 justify-center space-x-5 items-center">
                <DatePicker name="schedule-start-time" label="Дата" date={date} onChange={(e) => setDate(e)} />
                {/* <Button label="Поиск" onClick={() => {}} /> */}
            </div>
                { events && events.map((group) => <EventGroup key={group[0]} id={group[0]} events={group[1]} onEdit={handleEdit} onRemove={handleRemove}/>)}
        </div>
    </div>
    <EditEventModal modalId="edit-event-modal" event={selectedEvent} onSubmit={handleSubmit} onClose={() => modal?.hide()}/>
    </>
    );
};

export default EventModerationScreen;
