import { Card, Progress, Timeline, Button, Pagination } from "flowbite-react";
import {HiCheck} from 'react-icons/hi2'
import * as moment from 'moment';
import * as core from  "core-js";

const UserOffer = ({offer}) => {
    const date = moment(offer.workshift.start_time, 'YYYY-MM-DDThh:mm:ss', 'ru')

    return (
    <>
        <Timeline.Item>
            <Timeline.Point/>
            <Timeline.Content>
                <Timeline.Time> {date.format("LL")} </Timeline.Time>

                <Card className="py-1">
                    <div className="flex flex-row justify-between lg:mx-10">
                        <p className="text-lg leading-none text-gray-700"> Рабочая смена </p>
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

            </Timeline.Content>
        </Timeline.Item>
    </>);
};

const UserOffersList = ({offers}) => {
    return (
    <>

        <Timeline>
            {offers && offers.map((offer) => <UserOffer offer={offer}/>)}
            <Pagination currentPage={1} totalPages={100} />
        </Timeline>
    </>
    );
};

export default UserOffersList;
