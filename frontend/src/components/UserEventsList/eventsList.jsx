import { useState, useEffect, react } from "react";
import { Timeline } from "flowbite-react";

import EventsGroup from "./eventsGroup";


const EventsList = ({events, publish}) => {
    const items = Array.from(events).groupByToMap(({start_time}) => { return start_time }).entries();
    const rows = []
    for(let item of items) rows.push(<EventsGroup key={item[0]} date={item[0]} events={item[1]} publish={publish}/>)

    return (
    <>
        <Timeline className="">
            {rows}
        </Timeline>
    </>
    );
};

export default EventsList;