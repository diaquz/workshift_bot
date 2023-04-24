import { useState, useEffect } from "react";
import './tailwind.css';

import {HiArrowLeft, HiArrowRight} from 'react-icons/hi2'
import Datepicker from "tailwind-datepicker-react"

export default function CustomDatepicker({handleChange, defaultShow, input})
{
    const options = {
        title: "Выбор даты",
        autoHide: false,
        todayBtn: true,
        clearBtn: false,
        maxDate: new Date("2030-01-01"),
        minDate: new Date("2000-01-01"),
        theme: {
            background: "bg-white",
            todayBtn: "",
            clearBtn: "",
            icons: "",
            text: "",
            disabledText: "bg-slate-100",
            input: input,
            inputIcon: "",
            selected: "",
        },
        icons: {
            prev: () => <HiArrowLeft/>,
            next: () => <HiArrowRight/>
        },
        datepickerClassNames: "top-40",
        defaultDate: new Date(),
        language: "ru",
    };

    const [show, setShow] = useState(defaultShow);
    // const [selectedDate, setSelectedDate] = useState(new Date())

    const handleClose = (state) => {
        if(!defaultShow) setShow(state);
    }

    return (
        <div>
        <Datepicker options={options} onChange={handleChange} show={show} setShow={handleClose}>
    
        </Datepicker>
        </div>
    );
}