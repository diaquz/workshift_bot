import { useState } from "react";
import { Modal } from "flowbite-react";
import * as moment from "moment";
import { SimpleEvent } from "../EventCard";
import { Time } from "../../constants";
import DatePicker from "../DatePicker";

const SelectEvent = ({show, events, close, fetchEvents, onClick}) => {
    const [date, setDate] = useState(moment())

    const handleDateChange = (date) => {
        const parsed = moment(date, Time.dateFormat);

        setDate(parsed)
        fetchEvents(parsed.unix());
    };


    return (
        <Modal show={show} onClose={close} onAbort={close} size="xl">
            <Modal.Header />
            <Modal.Body>
                <DatePicker date={Time.date(date)} onChange={handleDateChange} pickerId="select-event-date-picker" />
                <div className="flex flex-col h-96 overflow-auto divide-y space-y-2 divide-solid">
                    {events && events.map((event) => <SimpleEvent event={event} lg="" onClick={() => { close(); onClick(event.id)}}/>)}
                </div>
            </Modal.Body>
        </Modal>
    );
};

export default SelectEvent;
