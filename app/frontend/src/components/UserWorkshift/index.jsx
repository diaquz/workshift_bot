import {
    Timeline,
    Button,
    Card,
    Progress
  } from "flowbite-react";

import * as moment from 'moment';


const Workshift= ({workshift}) => {
    const startDate = moment(workshift.start_time, 'YYYY-MM-DDThh:mm:ss', 'ru');

    return ( workshift && (
        <>
        <Card className="lg:mx-10 my-1">
            <div className="flex flex-col ">
                <p className="text-lg leading-none text-gray-700 mb-1"> Рабочая смена </p>
                <div className="flex flex-row justify-between">
                    <span>{startDate.format('HH:mm')}</span>
                    <span>{startDate.add(workshift.duration, 'hours').format('HH:mm')}</span>
                </div>
                <Progress progress={100} color="blue"/>
            </div>
        </Card>
    </>
    ));
};

const Duration = ({start, duration}) => {

    return (
        <>
        <div className="flex flex-col mx-10">
          <div className="flex flex-row justify-between">
            <span>{start.getHours()}</span>
            <span>{start}</span>
          </div>
          <Progress progress={100} color="blue"/>
        </div>
        </>
      );
}

export default Workshift;