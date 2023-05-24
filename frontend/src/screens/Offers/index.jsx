import { useState, useEffect } from "react";
import { Card, Tabs, Toast } from "flowbite-react";
import { useNavigate } from 'react-router-dom';

import FastAPIClient from "../../client";
import config from "../../config";

import AviableOffersList from "../../components/AviableOffersList";
import UserOffersList from "../../components/UserOffersList";
import MessageToast from "../../components/BaseToast";

const client = new FastAPIClient(config)

const OffersScreen = () => {

    const [offers, setOffers] = useState([]);
    const [answers, setAnswer] = useState([]);
    const [events, setEvents] = useState([]);
    const [myOffers, setMyOffers] = useState([]);
    const [toasts, setToasts] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {
        if(!client.checkAuth()) navigate('/login')
    }, []);

    // useEffect(() => setToasts([]), [toasts]);

    useEffect(() => fetchAviableOffers(), []);

    const fetchAviableOffers = () => {
        client.fetchAviableOffers().then((data) => {
            setOffers(data?.result);
        });
    };

    const fetchUserOffers = () => {
        client.fetchUserOffers().then((data) => {
            setMyOffers(data?.result)
        });
    };

    const fetchUserAnswers = () => {
        
    };

    const fetchEvents = (date) => {
        client.fetchUserEvents(date, 1, true)
            .then((data) => { setEvents(data?.result) })
            .catch((data) => { 
                setToasts(["Ошибка"]);
                return [];
            })
    } 

    const acceptOffer = (offer_id, event_id) => {
        client.createAnswer(offer_id, event_id)
        .then((data) => { setToasts(["Ответ создан"]) })
        .catch((data) => { setToasts(["Ошибка"])});
    };

    const removeOffer = (id) => {
        client.deleteOffer(id)
        .then((data) => {
            setToasts(["Предложение обмена успешно удалено"])
            fetchUserOffers();
        })
        .catch((data) => { setToasts(["Ошибка"]) });
    };

    const acceptAnswer = (id) => {
        client.acceptAnswer(id)
            .then((data) => { setToasts(["Ответ принят"]) })
            .catch((data) => { setToasts(["Ошибка"]) });
    };

    const declineAnswer = (id) => {
        client.deleteAnswer(id)
            .then((data) => { setToasts(["Ответ отклонен"]); })
            .catch((data) => { setToasts(["Ошибка"]); });
    };

    return (
        <Card className="m-5 lg:m-10 min-h-screen">
            {toasts && toasts.map((toast) => <MessageToast message={toast} onClose={() => setToasts([])}/>)}
            <Tabs.Group className="container place-content-center mx-auto">
                <Tabs.Item title="Мои предложения">
                    <UserOffersList offers={myOffers} fetch={fetchUserOffers} removeOffer={removeOffer} accept={acceptAnswer} decline={declineAnswer}/>
                </Tabs.Item>
                <Tabs.Item title="Мои ответы">

                </Tabs.Item>
                <Tabs.Item title="Доступные обмены" active={true}>
                    <AviableOffersList offers={offers} events={events} accept={acceptOffer} fetchEvents={fetchEvents}/>
                </Tabs.Item>
            </Tabs.Group>
        </Card>
    );
};

export default OffersScreen;
