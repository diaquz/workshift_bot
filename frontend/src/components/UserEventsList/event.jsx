import { Card } from "flowbite-react";
import Duration from "../Duration";


const Event = ({event}) => {

    return ( event && (
    <>
        <Card className="lg:mx-10 my-1">
            <div className="flex flex-col ">
                <p className="text-lg leading-none text-gray-700 mb-3"> Рабочая смена </p>
                <Duration start={event.start_time} end={event.end_time}/>
            </div>
        </Card>
    </>
    ));
};

export default Event;