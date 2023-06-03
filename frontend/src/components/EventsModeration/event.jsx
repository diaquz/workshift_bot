import { Card } from "flowbite-react";
import { HiOutlinePencil, HiOutlineTrash } from "react-icons/hi2";
import IconButton from "../IconButton"
import Duration from "../Duration";
import * as moment from 'moment'

const Event = ({event, onSelect, onDelete}) => {
    const start = moment(event.start_time);
    const end = moment(event.end_time);

    return ( event && (
        <>
            <div className="ml-3 lg:mx-10 py-3">
                <div className="flex flex-col text-left">
                    <div className="flex flex-row justify-between md:mx-10">
                        <div className="flex flex-row">
                            <p className="text-lg leading-none text-gray-700 mb-3 "> Рабочая смена </p>
                            <p className="text-sm text-gray-500 ml-3"> {start.format('LL')} </p>
                            {!start.isSame(end, 'day') ? 
                                (
                                <span className="flex row">
                                    <p className="text-sm text-gray-500 mx-1"> - </p>
                                    <p className="text-sm text-gray-500"> {end.format('LL')} </p>
                                </span>)
                                 : ""}
                        </div>
                        <div className="flex flex-row">
                            <IconButton icon={<HiOutlinePencil />} onClick={() => { onSelect(event) }}/>
                            <IconButton icon={<HiOutlineTrash />} onClick={() => { onDelete(event.id) }}/>
                        </div>
                    </div>
                    <Duration start={event.start_time} end={event.end_time}/>
                </div>
            </div>
        </>
        ));
};

export default Event;
