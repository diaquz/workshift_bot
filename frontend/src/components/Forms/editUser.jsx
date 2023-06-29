import { useEffect, useState } from "react";
import { TextInput } from "components/Inputs";
import { Levels, Privilage } from "utils/constants";

const Label = ({label}) => {
    return (
    <div className="my-4 flex items-center before:mt-0.5 before:flex-1 before:border-t before:border-neutral-300 after:mt-0.5 after:flex-1 after:border-t after:border-neutral-300"> 
        <span className="mx-3 text-neutral-500 ">
            {label}
        </span> 
    </div>
    );
}

const Button = ({label, active, onClick}) => {
    return (
    <button
        type="button"
        onClick={onClick}
        className={`inline-block ${active ? "bg-primary-700" : "bg-primary"} px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white transition duration-150 ease-in-out hover:bg-primary-600 focus:bg-primary-600 focus:outline-none focus:ring-0 active:bg-primary-700`}
    >
        {label}
    </button>
    );
};

const SkillLevels = ({array, active, set}) => {
    return (
    <>
        <div
            className="inline-flex rounded-md shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
            role="group">
            {array.map((value, index) => <Button key={index} label={value} active={active === index} onClick={() => set(index)}/>)}
        </div>
    </>
    );
};

const EditUserForm = ({user, onSubmit, onClose}) => {

    const [form, setForm] = useState({ user: null, name: "", picture: "", level: 0, privilage: 0 });

    useEffect(() => {
        if(user != null)
            setForm({
                user: user,
                name: user.name,
                picture: user.picture,
                level: user.level,
                privilage: user.privilage
            });
    }, [user]);

    return (
    <>
        <div className="flex flex-col space-y-3">
            <div className="mx-12">
                <TextInput name="name-input" label="Имя" value={form.name} onChange={(e) => setForm({...form, name: e})} />
            </div>
            <div className="mx-12">
                <TextInput name="picture-input" label="Аватар" value={form.picture} onChange={(e) => setForm({...form, picture: e})} />
            </div>

            <Label label="Уровень навыков" />
            <div className="flex flex-row justify-center">
                <SkillLevels array={Levels.labels} active={form.level} set={(e) => setForm({...form, level: e})} />
            </div>

            <Label label="Уровень привилегий" />
            <div className="flex flex-row justify-center">
                <SkillLevels array={Privilage.labels} active={form.privilage} set={(e) => setForm({...form, privilage: e})} />
            </div>

            <div className="flex flex-row mx-20 my-15 justify-between">
                <Button label="Отмена" onClick={onClose} />
                <Button label="Сохранить" onClick={() => { onSubmit(form) }} />
            </div>
        </div>
    </>
    );
};

export default EditUserForm;
