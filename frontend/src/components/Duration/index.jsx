import { Progress } from "flowbite-react";
import * as moment from 'moment';

const Duration = ({start, end}) => {
  // alert(start)
    const start_date = moment(start);
    const end_date = moment(end);

    return (
        <>
        <div className="flex flex-col md:mx-10">
            <div className="flex flex-row justify-between">
                <span>{start_date.format('HH:mm')}</span>
                <span>{end_date.format('HH:mm')}</span>
            </div>
            <Progress progress={100} color="blue" className="block"/>
        </div>
        </>
        );
};

export default Duration;

