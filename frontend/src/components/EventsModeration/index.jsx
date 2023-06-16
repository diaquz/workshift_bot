import React, { useEffect, useRef, useState } from 'react';
import { Button, Modal, Select, Label } from 'flowbite-react';
import * as moment from 'moment';
import { EventTypes, Time } from "../../constants";
import { SimpleUser } from '../User';
import TextInput from '../Input';
import TimePicker from '../TimePicker';

import DatePicker from '../DatePicker';
import EventsGroup from './eventsGroup';
import SearchInput from '../SearchInput'

import EventModal from './eventModal';
import SelectUserModal from '../SelectUserModal';

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

const EventsModeration = ({events, fetch, users, fetchUsers, submit, onDelete}) => {
    const [date, setDate] = useState(moment());
    const [showModal, setShowModal] = useState(false);
    const [userModal, setUserModal] = useState(false);

    const [data, setData] = useState({
        user: null,
        event: null,
        title: "Рабочая смена", 
        type: 'workshift', 
        start:Time.currentDate(),
        end: Time.currentDate(),
        start_time: "8:00",
        end_time: "17:00"
    });    

    useEffect(() => {
        if(!events || events.length == 0) fetch(date.unix())
    }, [])

    const handleDateChange = (date) => {
        const parsed = moment(date, Time.dateFormat);
    
        setDate(parsed);
        fetch(parsed.unix())
    };

    const updateDataByEvent = (newEvent) => {
        setData({
            user:  (newEvent ? newEvent.user : null),
            event: newEvent,
            title: (newEvent ? newEvent.title : ""), 
            type: (newEvent ? EventTypes.name(newEvent.type) : 'workshift'), 
            start: (newEvent ? Time.date(newEvent.start_time) : Time.currentDate()),
            end: (newEvent ? Time.date(newEvent.end_time) : Time.currentDate()),
            start_time: (newEvent ? Time.time(newEvent.start_time) : "8:00"),
            end_time: (newEvent ? Time.time(newEvent.end_time) : "17:00")
        });  
        const inp = document.querySelector(`#text-input-title-input`);
        if(newEvent != null)
            inp.value = newEvent.title
    };

    let updateData = (field, value) => {
        let updateDict = {}
        updateDict[field] = value

        setData(prev => { return {...prev, ...updateDict} })
    };
    
    const onSubmit = () => {
        const start = moment(`${data.start}-${data.start_time}`, 'DD/MM/YYYY-hh:mm')
        const end = moment(`${data.end}-${data.end_time}`, 'DD/MM/YYYY-hh:mm')
        const inp = document.querySelector(`#text-input-title-input`);

        const submit_data = { title: inp.value, type: EventTypes.parseFromString(date.type), start: start, end: end }
        submit(date.user, date.event, data)
    };

    const handleEdit = (event) => {
        updateDataByEvent(event);
        setShowModal(true);
    };
    const handleDelete = (data) => {
        onDelete(data)
    };
    
    const items = Array.from(events).groupByToMap(({user_id}) => { return user_id }).entries();
    const rows = []
    for(let item of items) rows.push(<EventsGroup key={item[0]} user={item[1][0].user} events={item[1]} onSelect={handleEdit} onDelete={handleDelete} />)

    return (
    <>  
        <div className="container flex flex-col-reverse md:flex-row min-w-full">
            <div className="basis-full lg:basis-3/4">
                {rows}
            </div>
            <div className="md:basis-1/4 flex flex-col mb-5 space-y-2">
                <SearchInput onSearch={() => {}}/>
                <DatePicker onChange={handleDateChange} date={Time.date(date)} pickerId="event-calendar"/>

                <Button className="mt-6" onClick={() => handleEdit(null)}> Добавить событие </Button>
            </div>
        </div>
        
        {/* <EventModal show={showModal} setShow={setShowModal} date={data} updateDate={updateData} openUserSelect={() => setUserModal(true)} submit={submit}/> */}
        {/* {EventModal({show: showModal, setShow: setShowModal, date: data, updateDate: updateData, openUserSelect: () => setUserModal(true), submit: submit})} */}

        <Modal show={showModal} onClose={() => setShowModal(false)}>
            <Modal.Header>  Добавление нового события </Modal.Header>
            <Modal.Body>
                <div className="space-y-3 px-6 pb-4 sm:pb-6 lg:px-8 xl:pb-8">
                    <LabledField id="user" title="Пользователь">
                        <SimpleUser user={data.user} onClick={() => setUserModal(true)}/>
                    </LabledField>
                    <LabledField id="title" title="Название">
                        <TextInput id="title" key="title-input"
                            label=""
                            inputId="title-input"
                            value={data.title}
                            onChange={(e) => { updateData('title', e.target.value) }}
                        />
                    </LabledField>

                    <LabledField id="type" title="Тип">
                        <Select id="type" required={true} onChange={(e) => updateData('type', e.target.value)}>
                            <option value="workshift"> Рабочая смена </option>
                            <option value="another"> Другое </option>
                        </Select>
                    </LabledField>
                    <LabledField id="date" title="Дата">
                        <div className="flex flex-row justify-between items-center">
                            <DatePicker date={data.start} onChange={(e) => { updateData('start', e) }} pickerId="startDate"/>
                            <p className="mx-5"> до </p>
                            <DatePicker date={data.end} onChange={(e) => updateData('end', e)} pickerId="endDate"/>
                        </div>
                    </LabledField>
                    <LabledField id="time" title="Время"> 
                        <div className="flex flex-row justify-between items-center">
                            <TimePicker pickerId="start-time" time={data.start_time} onChange={(e) => { updateData('start_time', e) }}/>
                            <p className="mx-5"> до </p>
                            <TimePicker pickerId="end-time" time={data.end_time} onChange={(e) => { updateData('end_time', e) }}/>
                        </div>
                    </LabledField>
                    <div className="flex flex-row justify-between items-center mx-5">
                        <Button onClick={() => setShowModal(false)}> Отмена </Button>
                        <Button onClick={onSubmit}> Создать </Button>
                    </div>
                </div>
            </Modal.Body>
        </Modal>

        
        <SelectUserModal show={userModal} close={() => setUserModal(false)} 
            users={users} fetch={fetchUsers} 
            onSelect={(user) => { setData({...data, user: user}); setUserModal(false); }} />
    </>);
};

export default EventsModeration;
