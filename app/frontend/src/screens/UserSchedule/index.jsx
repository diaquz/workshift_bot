import { useEffect, useState } from "react";
import FastAPIClient from "../../client";
import config from "../../config";

import { Card } from "flowbite-react"

import WorkshiftList from "../../components/UserWorkshiftList";
import CustomDatepicker from "../../components/DatePicker";

const client = new FastAPIClient(config)

const UserSchedule = () => {

    const [date, setDate] = useState(new Date());
    const [workshifts, setWorkshifts] = useState([]);

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
        <Card className="m-10 min-h-screen">
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
