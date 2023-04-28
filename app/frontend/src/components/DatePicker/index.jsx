import { useState, useEffect, React } from "react";
// import '../tailwind.css'

import {HiArrowLeft, HiArrowRight} from 'react-icons/hi2'
import Datepicker from "tailwind-datepicker-react"

const CustomDatepicker = ({handleChange, defaultShow, input, date = new Date()}) => {
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
        defaultDate: date,
        language: "ru",
    };

    const [show, setShow] = useState(defaultShow);

    const handleClose = (state) => {
        if(!defaultShow) setShow(state);
    }

    return (
        <Datepicker options={options} onChange={handleChange} show={show} setShow={handleClose}>
        </Datepicker>
    );
}

export default CustomDatepicker;
