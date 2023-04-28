import { useState, useEffect, react } from "react";
// import './tailwind.css';
import {
  Timeline,
  Card,
} from "flowbite-react";
 
import Workshift from "../UserWorkshift";

const WorkshiftList = ({workshifts}) => {

    return (
    <>
        <Timeline>
            {(
                workshifts.map((workshift) => (
                    <Workshift workshift={workshift}/>
                ))
            )}
        </Timeline>
    </>
    );
};

export default WorkshiftList;
