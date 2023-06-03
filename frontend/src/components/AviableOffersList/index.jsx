import { Card, Progress, Timeline, Pagination } from "flowbite-react";
import {HiCheck} from 'react-icons/hi2'
import * as moment from 'moment';
import * as core from  "core-js";

import Duration from "../Duration";
import { EventCard } from "../EventCard";
import SelectEvent from "./selectEventModal";
import { useState } from "react";
import IconButton from "../IconButton";

const AviableOffer = ({offer, onClick}) => {
    const date = moment(offer.workshift.start_time, 'YYYY-MM-DDThh:mm:ss', 'ru')

    return (
        <EventCard event={offer.workshift} user={offer.user}>
            <IconButton icon={<HiCheck/>} onClick={onClick}/>
        </EventCard>
    );
};

const AviableOffersGroup = ({date, offers, onClick}) => {
    return (
    <>
        <Timeline.Item className="text-left">
            <Timeline.Point />
            <Timeline.Content>
                <Timeline.Time> {moment(date).format('LL')} </Timeline.Time>
                { offers.map((offer) => (
                    <AviableOffer offer={offer} onClick={() => onClick(offer.id)}/>
                )) }
            </Timeline.Content>
        </Timeline.Item>
    </>
    );
};


const AviableOffersList = ({offers, events, accept, fetchOffers, fetchEvents}) => {
    const [modal, setModal] = useState(false);
    const [selected, setSelected] = useState(null);
    const [page, setPage] = useState(0);
    const items = Array.from(offers).groupByToMap(({workshift}) => { return workshift.start_time }).entries();
    const rows = []

    const handleAccept = (id) => {
        accept(selected, id);
    };

    const handlePageChange = (n) => {
        setPage(n);
        fetchOffers(n)
    };

    for(let item of items) rows.push(<AviableOffersGroup date={item[0]} offers={item[1]} onClick={(id) => { setSelected(id); setModal(true); }}/>)

    return (
    <>
        <SelectEvent events={events} show={modal} close={() => setModal(false)} fetchEvents={fetchEvents} onClick={handleAccept}/>
        <Timeline className="lg:mx-32">
            {rows}
        </Timeline>
        <Pagination currentPage={1} totalPages={100} onPageChange={(n) => handlePageChange(n)}/>
    </>
    );
};

export default AviableOffersList;
