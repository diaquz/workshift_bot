import { Card } from "flowbite-react";
import Duration from "../Duration";
import { Children } from "react";
import moment from "moment";

const EventCard = ({event, user=null, onClick=null, date=false, children}) => {
    const start = moment(event.start_time);
    const end = moment(event.end_time);

    return (
    <>
        <Card className={`py-1 lg:mx-10 ${onClick && "hover:border-sky-700"}`} onClick={onClick}>
            <div className="flex flex-row justify-between md:mx-10">
                <div className="flex flex-row items-center space-x-4">
                    <p className="leading-none text-gray-700 flex flex-row items-center"> 
                        <p className="text-lg"> Рабочая смена </p>
                        <div className="flex flex-row mx-5 space-x-1 text-gray-500">
                            {(date || !start.isSame(end, 'day')) ? (
                                <div className="text-sm">{start.format('LL') }</div>) : ""}
                            {!start.isSame(end,'day') ? (
                                <div className="flex flex-row space-x-1">
                                    <p className="text-sm"> - </p>
                                    <div className="text-sm">{end.format('LL')}</div>
                                </div>
                            ) : ""}
                        </div>
                    </p>
                    {user && (<p className="text-sm underline font-medium text-gray-500">{user.name}</p>)}
                </div>
                { children }
            </div>
            <Duration start={event.start_time} end={event.end_time}/>
        </Card>
    </> 
    );
};

export default EventCard;
