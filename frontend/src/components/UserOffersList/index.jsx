import { useEffect, useState } from "react";
import { Pagination } from "flowbite-react";
import { HiXMark, HiCheck } from 'react-icons/hi2'
import * as moment from 'moment';

import IconButton from "../IconButton";
import { SimpleEvent, EventCard } from "../EventCard"


const Answer = (answer, accept, decline) => {
    return (
        <SimpleEvent event={answer.workshift}>
            <IconButton icon={<HiCheck/>} onClick={() => accept(answer.id)}/>
            <IconButton icon={<HiXMark/>} onClick={() => decline(answer.id)}/>
        </SimpleEvent>
    )
};

const UserOffer = ({offer, removeOffer, accept, decline}) => {
    const date = moment(offer.workshift.start_time, 'YYYY-MM-DDThh:mm:ss', 'ru')
    const [expanded, setExpanded] = useState(false);

    return (
    <>
        <div>
            <EventCard event={offer.workshift} date={true} onClick={() => setExpanded(!expanded)}>
                <IconButton icon={<HiXMark/>} onClick={() => removeOffer(offer.id)}/>
            </EventCard>
            {expanded && offer.answers && offer.answers.map((answer) => <Answer answer={answer} accept={accept} decline={decline}/>)}
        </div>
    </>);
};

const UserOffersList = ({offers, fetch, removeOffer, accept, decline}) => {

    useEffect(() => {
        if(!offers || offers.length == 0) fetch()
    }, []);

    return (
    <>
        {/* <Pagination currentPage={1} totalPages={100} /> */}
        <div className="text-left mt-3 lg:mx-32 space-y-4 content-center">
            {offers && offers.map((offer) => <UserOffer offer={offer} removeOffer={removeOffer} accept={accept} decline={decline}/>)}
        </div>
    </>
    );
};

export default UserOffersList;
