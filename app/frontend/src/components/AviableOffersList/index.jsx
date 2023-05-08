import { Card, Progress, Timeline, Pagination } from "flowbite-react";
import {HiCheck} from 'react-icons/hi2'
import * as moment from 'moment';
import * as core from  "core-js";

const AviableOffer = ({offer}) => {
    const date = moment(offer.workshift.start_time, 'YYYY-MM-DDThh:mm:ss', 'ru')

    return (
    <>
        <Card className="py-1">
            <div className="flex flex-row justify-between lg:mx-10">
                <div className="flex flex-row item-center space-x-4">
                    <p className="text-lg leading-none text-gray-700"> Рабочая смена </p>
                    <p className="text-sm underline font-medium text-gray-500">{offer.user.name}</p>
                </div>
                <div className="bg-slate-50 hover:bg-inherit rounded-full">
                    <div outline={true} className="m-1">
                        <HiCheck/>
                    </div>
                </div>
            </div>
            <div className="flex flex-col lg:mx-10">
                <div className="flex flex-row justify-between">
                    <span>{date.format('HH:mm')}</span>
                    <span>{date.add(offer.workshift.duration, 'hours').format('HH:mm')}</span>
                </div>
                <Progress progress={100} color="blue"/>
            </div>
            
        </Card>
    </> 
    );
};

const AviableOffersGroup = ({date, offers}) => {
    return (
    <>
        <Timeline.Item className="text-left">
            <Timeline.Point />
            <Timeline.Content>
                <Timeline.Time> {moment(date).format('LL')} </Timeline.Time>
                { offers.map((offer) => (
                    <AviableOffer offer={offer}/>
                )) }
            </Timeline.Content>
        </Timeline.Item>
    </>
    );
};


const AviableOffersList = ({offers}) => {
    const items = Array.from(offers).groupByToMap(({workshift}) => { return workshift.start_time }).entries();
    const rows = []

    for(let item of items) rows.push(<AviableOffersGroup date={item[0]} offers={item[1]} />)

    return (
    <>
        <Timeline className="lg:mx-32">
            {rows}
        </Timeline>
        <Pagination currentPage={1} totalPages={100}/>
    </>
    );
};

export default AviableOffersList;
