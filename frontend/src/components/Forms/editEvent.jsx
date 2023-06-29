import { Badge, UserBadge } from "components/Badges";
import { Button, DatePicker, TextInput, TimePicker } from "components/Inputs";
import { SelectUserModal } from "components/Modal";
import { useEffect, useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import { EventTypes, Levels } from "utils/constants";
import timeFormat from "utils/time";
import { Modal } from "tw-elements"

const initValue = {
    isEdit: false,
    user: null,
    event: null,
    title: "Рабочая смена",
    start_time: "8:00",
    end_time: "17:00",
    start_date: timeFormat.formatNow(),
    end_date: timeFormat.formatNow(),
    type: 0
}

const TypeButton = ({label, active, onClick}) => {
    return (
    <button
        type="button"
        onClick={onClick}
        className={`inline-block ${active ? "bg-primary-700" : "bg-primary"}  px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white transition duration-150 ease-in-out hover:bg-primary-600 focus:bg-primary-600 focus:outline-none focus:ring-0 active:bg-primary-700`}
    >
        {label}
    </button>
    );
};

const Label = ({label}) => {
    return (
    <div className="my-4 flex items-center before:mt-0.5 before:flex-1 before:border-t before:border-neutral-300 after:mt-0.5 after:flex-1 after:border-t after:border-neutral-300"> 
        <span className="mx-3 text-neutral-500 ">
            {label}
        </span> 
    </div>
    );
}

const EditEventForm = ({event, onSubmit, onCancel}) => {
    const [modal, setModal] = useState(null);
    const [form, setForm] = useState(initValue);
    const [users, setUsers] = useState([]);

    useEffect(() => {
        if(event != null) {
            setForm({
                isEdit: true,
                user: event.user,
                event: event,
                title: event.title,
                start_time: timeFormat.timeFrom(event.start_time),
                end_time: timeFormat.timeFrom(event.end_time),
                start_date: timeFormat.format(event.start_time),
                end_date: timeFormat.format(event.end_time),
                type: event.type
            })
        } else 
            setForm(initValue);
    }, [event]);

    useEffect(() => { 
        const modalElement = document.getElementById("user-select-modal");
        setModal(new Modal(modalElement, {}));
    }, [])

    const toggleUser = (user) => {
        if(user.id in users) {
            const newState = { ...users };
            delete newState[user.id];
            setUsers(newState)

        } else {
            const diff = { };
            diff[user.id] = user;

            setUsers({...users, ...diff})
        }
    };

    const update = (field, value) => {
        const changes = { };
        changes[field] = value;

        setForm(prev => { return {...prev, ...changes }; })
    };

    return (
    <>
        <div className="flex flex-col">

            <div className="mx-12">
                <TextInput name="title-input" label="Название" value={form.title} onChange={(e) => setForm({...form, title: e})} />
            </div>

            <Label label="Пользователь" />
            <div>
                { form.isEdit && (
                    <div className="flex flex-row p-3 mx-5 space-x-5 justify-center items-center">
                        <img src={form.user.picture} className="w-8 h-8 rounded-full shadow-lg" alt="Avatar" />
                        <div className="text-neutral-500 text-lg"> {form.user.name} </div>
                        <Badge label={Levels.name(form.user.level)} />
                    </div>
                ) }
                { !form.isEdit && (
                <div className="mx-12 flex flex-row space-x-1 space-y-1">
                    <AiOutlinePlus className="w-6 h-6 me-3 hover:bg-slate-50 p-1 rounded" onClick={() => { modal?.show() }}/>
                    { users && Object.keys(users).map((id) => <UserBadge key={id} name={users[id].name} onClick={() => toggleUser(users[id])}/>) }

                </div>)}
            </div>

            <Label label="Тип события" />
            <div className="flex flex-row justify-center">
                { EventTypes.labels.map((value, index) => <TypeButton key={index} label={value} active={form.type === index} onClick={() => setForm({...form, type: index})}/>) }
            </div>

            <Label label="Дата"/>
            <div className="flex flex-row justify-center space-x-10">
                <DatePicker name="start-date-picker" label="Начало" date={form.start_date} onChange={(e) => update('start_date', e)} />
                <DatePicker name="end-date-picker" label="Конец" date={form.end_date} onChange={(e) => update('end_date', e) } />
            </div>
            <Label label="Время"/>
            <div className="flex flex-row justify-center space-x-10">
                <TimePicker pickerId="start-time-picker" label="Начало" time={form.start_time} onChange={(e) => update('start_time', e)} />
                <TimePicker pickerId="end-time-picker" label="Конец" time={form.end_time} onChange={(e) => update('end_time', e)} />
            </div>
            
            <div className="flex flex-row mx-20 my-10 justify-between">
                <Button label="Отмена" onClick={onCancel} />
                <Button label="Сохранить" onClick={() => { onSubmit(form, users) }} />
            </div>
        </div>
        <SelectUserModal modalId="user-select-modal" label="Выбор пользователей" selectedUsers={users} toggleUser={toggleUser} />
    </>
    );
};

export default EditEventForm;
