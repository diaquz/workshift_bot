import {
    Timeline,
    Button,
    Card,
    Progress
  } from "flowbite-react";

import * as moment from 'moment';


const Workshift= ({workshift}) => {
    moment.updateLocale('en', {
        months : [
            "Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", "Июль",
            "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"
        ]
    })

    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const shortOptions = { hour: '2-digit', minute: '2-digit' };

    const startDate = moment(workshift.start_time, 'YYYY-MM-DDThh:mm:ss', 'ru');

    const startTime = new Date(workshift.start_time);
    
    // alert(startTime)
    // const endTime = 

    return ( workshift && (
        <>
            <Timeline.Item className="text-left">
                <Timeline.Point/>
                <Timeline.Content>
                    <Timeline.Time>
                        { startDate.format('LL') }
                        {/* { startTime.toLocaleDateString("ru-RU", options) } */}
                        {/* { `${startTime.getDate()} ${startTime.getMonth() }`} */}
                    </Timeline.Time>
                    <Timeline.Title>
                        Рабочая смена
                    </Timeline.Title>
                    <Timeline.Body>
                        <div className="flex flex-col mx-10">
                            <div className="flex flex-row justify-between">
                                <span>{startDate.format('HH:mm')}</span>
                                <span>{startDate.add(workshift.duration, 'hours').format('HH:mm')}</span>
                            </div>
                            <Progress progress={100} color="blue"/>
                        </div>
                        {/* <Duration start={startTime} duration={workshift.duration}/> */}
                    </Timeline.Body>
                    <Button color="gray" outline={true} className="hidden hover:block">
                        Обмен
                    </Button>
                </Timeline.Content>
            </Timeline.Item>
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