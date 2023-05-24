import { Timeline } from "flowbite-react";
import { HiOutlineCloudArrowUp } from 'react-icons/hi2'
import * as moment from 'moment';

import Event from "./event";
import EventCard from "../EventCard/eventCard";
import IconButton from "../IconButton";

const EventsGroup = ({date, events, publish}) => {
    return (
    <>
        <Timeline.Item className="text-left">
            <Timeline.Point />
            <Timeline.Content>
                <Timeline.Time> {moment(date).format('LL')} </Timeline.Time>
                { events.map((event) => (
                    <EventCard key={event.id} event={event}>
                        {event.type == 0 ? (
                            <IconButton icon={<HiOutlineCloudArrowUp/>} onClick={() => publish(event.id)}/>
                        ): ""}
                    </EventCard>
                    // <Event key={event.id} event={event}/>
                )) }
            </Timeline.Content>
        </Timeline.Item>
    </>
    );
};

export default EventsGroup;
