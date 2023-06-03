import { Modal, Label, Select, Button } from "flowbite-react";
import DatePicker from "../DatePicker";
// import TimePicker from 'react-gradient-timepicker';
import TimePicker from "../TimePicker";

import { useState } from "react";
import { SimpleUser } from '../User';
import TextInput from '../Input'
import moment from "moment";

import { EventTypes, Time } from "../../constants";

const LabledField = ({id, title, children}) => {
    return (
    <div>
        <div className="mb-2 block">
            <Label htmlFor={id} value={title}/>
        </div>
        { children }
    </div>
    );
};

const EventModal = ({date, updateDate, show, setShow, openUserSelect, submit}) => {

    const onSubmit = () => {
        const start = moment(`${date.start}-${date.start_time}`, 'DD/MM/YYYY-hh:mm')
        const end = moment(`${date.end}-${date.end_time}`, 'DD/MM/YYYY-hh:mm')

        const data = { title: date.title, type: EventTypes.parseFromString(date.type), start: start, end: end }
        submit(date.user, date.event, data)
    };


    return (
    <Modal show={show} onClose={() => setShow(false)}>
        <Modal.Header>  Добавление нового события </Modal.Header>
        <Modal.Body>
            <div className="space-y-3 px-6 pb-4 sm:pb-6 lg:px-8 xl:pb-8">
                <LabledField id="user" title="Пользователь">
                    <SimpleUser user={date.user} onClick={openUserSelect}/>
                </LabledField>
                <LabledField id="title" title="Название">
                    <TextInput id="title" key="title"
                        label=""
                        value={date.title}
                        onChange={(e) => { updateDate('title', e.target.value) }}
                    />
                </LabledField>

                <LabledField id="type" title="Тип">
                    <Select id="type" required={true} onChange={(e) => updateDate('type', e.target.value)}>
                        <option value="workshift"> Рабочая смена </option>
                        <option value="another"> Другое </option>
                    </Select>
                </LabledField>
                <LabledField id="date" title="Дата">
                    <div className="flex flex-row justify-between items-center">
                        <DatePicker date={date.start} onChange={(e) => { updateDate('start', e) }} pickerId="startDate"/>
                        <p className="mx-5"> до </p>
                        <DatePicker date={date.end} onChange={(e) => updateDate('end', e)} pickerId="endDate"/>
                    </div>
                </LabledField>
                <LabledField id="time" title="Время"> 
                    <div className="flex flex-row justify-between items-center">
                        <TimePicker pickerId="start-time" time={date.start_time} onChange={(e) => { updateDate('start_time', e) }}/>
                        <p className="mx-5"> до </p>
                        <TimePicker pickerId="end-time" time={date.end_time} onChange={(e) => { updateDate('end_time', e) }}/>
                    </div>
                </LabledField>
                <div className="flex flex-row justify-between items-center mx-5">
                    <Button onClick={() => setShow(false)}> Отмена </Button>
                    <Button onClick={onSubmit}> Создать </Button>
                </div>
            </div>
        </Modal.Body>
    </Modal>
    );
};

export default EventModal;
