import { useState } from "react";
import { Avatar } from "flowbite-react";

import Event from "./event";
import EventCard from "../EventCard/eventCard";

const EventsGroup = ({user, events, onSelect, onDelete}) => {
    const [show, setShow] = useState(false)

    const handleClick = () => { setShow(!show) };

    return (
    <>
        <div className="flex flex-col md:mr-3">
            <div 
                onClick={handleClick}
                className="flex flex-row items-center p-3 space-x-4 border-solid border-2 rounded-lg hover:border-sky-700">
                <Avatar img={user.picture} rounded={true} />
                <p className="text-lg underline font-medium text-gray-700">{user.name}</p>
                <p className="text-md text-gray-500"> {events ? events.length : 0} </p>
            </div>
            <div className="divide-y divide-solid">

                {show && events && events.map((event) => <Event key={event.id} event={event} onSelect={onSelect} onDelete={onDelete}/>)}
            </div>
        </div>
    </>
    );
};

export default EventsGroup;
