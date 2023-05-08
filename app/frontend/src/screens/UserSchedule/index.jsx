import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { Card } from "flowbite-react";

import WorkshiftList from "../../components/UserWorkshiftList";
import CustomDatepicker from "../../components/DatePicker";


import jwtDecode from "jwt-decode";
import * as moment from "moment";

import FastAPIClient from "../../client";
import config from "../../config";

const client = new FastAPIClient(config)

const UserSchedule = () => {

    const [date, setDate] = useState(new Date());
    const [workshifts, setWorkshifts] = useState([]);
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

    useEffect(() => {
        fetchSchedule(new Date().getTime() / 1000)
    }, []);

    const fetchSchedule = (date) => {
        client.getUserWorkshifts(date).then((data) => {
            setWorkshifts(data?.result);
            // alert(workshifts);
        });
    };

    const handleDateChange = (date) => {
        // alert(date.getTime() / 1000);
        setDate(date);
        fetchSchedule(date.getTime() / 1000);
    };

    return (
    <>
        <Card className="m-5 lg:m-10 min-h-screen">
            <div className="mx-auto block lg:hidden">
                <CustomDatepicker defaultShow={false} input="" handleChange={handleDateChange} date={date}/>
            </div>
            <div className="container mx-auto flex flex-row">
                <div className="basis-full lg:basis-3/4">
                    <WorkshiftList workshifts={workshifts}/>
                </div>
                <div className="hidden lg:block lg:basis-1/4 mx-auto">
                    <CustomDatepicker defaultShow={true} input="hidden" handleChange={handleDateChange} date={date}/>
                </div>
            </div>
        </Card>
    </>
    );
}

export default UserSchedule;
