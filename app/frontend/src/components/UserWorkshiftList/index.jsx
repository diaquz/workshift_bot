import { useState, useEffect, react } from "react";
// import './tailwind.css';
import {
  Timeline,
  Card,
} from "flowbite-react";
import * as moment from 'moment';
import Workshift from "../UserWorkshift";

const WorkshiftGroup = ({date, workshifts}) => {
    return (
    <>
        <Timeline.Item className="text-left">
            <Timeline.Point />
            <Timeline.Content>
                <Timeline.Time> {moment(date).format('LL')} </Timeline.Time>
                { workshifts.map((workshift) => (
                    <Workshift workshift={workshift}/>
                )) }
            </Timeline.Content>
        </Timeline.Item>
    </>
    );
};

const WorkshiftList = ({workshifts}) => {
    const items = Array.from(workshifts).groupByToMap(({start_time}) => { return start_time }).entries();
    const rows = []
    for(let item of items) rows.push(<WorkshiftGroup date={item[0]} workshifts={item[1]} />)

    return (
    <>
        <Timeline className="">
            {rows}
        </Timeline>
    </>
    );
};

export default WorkshiftList;
