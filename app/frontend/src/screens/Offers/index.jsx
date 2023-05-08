import { useState, useEffect } from "react";
import {  Card,  Tabs } from "flowbite-react";
import { useNavigate } from 'react-router-dom';


import jwtDecode from "jwt-decode";
import * as moment from "moment";

import FastAPIClient from "../../client";
import config from "../../config";

import AviableOffersList from "../../components/AviableOffersList";
import UserOffersList from "../../components/UserOffersList";

const client = new FastAPIClient(config)

const OffersScreen = () => {

    const [offers, setOffers] = useState([]);
    const [answers, setAnswer] = useState([]);
    const [myOffers, setMyOffers] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {
        const tokenString = localStorage.getItem('token');
        if(tokenString) {
            const token = JSON.parse(tokenString);
            const decodedAccessToken = jwtDecode(token.access_token);
            if(!(moment.unix(decodedAccessToken.exp).toDate() > new Date())) {
                navigate('/login');
            }
        } else {
            navigate('/login');
        }
    }, []);

    useEffect(() => fetchAviableOffers(), []);

    const fetchAviableOffers = () => {
        client.getUserOffers().then((data) => {
            setOffers(data?.result);
        });
    };

    const fetchUserOffers = () => {

    };

    const fetchUserAnswers = () => {

    };

    return (
        <Card className="m-5 lg:m-10 min-h-screen">
            <Tabs.Group className="container place-content-center mx-auto">
                <Tabs.Item title="Мои предложения">
                    <UserOffersList />
                </Tabs.Item>
                <Tabs.Item title="Мои ответы">

                </Tabs.Item>
                <Tabs.Item title="Доступные обмены" active={true}>
                    <AviableOffersList offers={offers}/>
                </Tabs.Item>
            </Tabs.Group>
        </Card>
    );
};

export default OffersScreen;
