import { useState, useEffect } from "react";
import { initTE, Ripple } from "tw-elements"
import { HiOutlineArrowLeft } from "react-icons/hi2"
import TelegramLogin from "components/TelegramLogin";
import { TextInput }  from "components/Inputs";
import { Levels } from "utils/constants";
import { hasTelegramToken, getTelegramToken } from "utils/auth";

const Button = ({label, active, onClick}) => {
    return (
    <button
        type="button"
        onClick={onClick}
        className={`inline-block ${active ? "bg-primary-700" : "bg-primary"} px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white transition duration-150 ease-in-out hover:bg-primary-600 focus:bg-primary-600 focus:outline-none focus:ring-0 active:bg-primary-700`}
        data-te-ripple-init
        data-te-ripple-color="light">
        {label}
    </button>
    );
};

const SkillLevels = ({active, set}) => {
    return (
    <>
        <div
            className="inline-flex rounded-md shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
            role="group"
        >
            {Levels.labels.map((value, index) => <Button key={index} label={value} active={active === index} onClick={() => set(index)}/>)}
        </div>
    </>
    );
};

const RegisterForm = ({onRegister, toLogin}) => {
    useEffect(() => { initTE({ Ripple }); }, []);

    const [data, setData] = useState({
        name: "",
        level: 0,
        picture: ""
    });

    const handleRegister = (token) => {
        if(!token) 
            token = getTelegramToken()
        onRegister(token, data)
    }

    return (
    <>
    <div className="md:w-8/12 lg:ml-6 lg:w-5/12 justify-center space-y-3"> 
        <div className="flex flex-row items-center space-x-3 my-5 p-1 rounded-lg w-20 hover:bg-slate-50" onClick={toLogin}>
            <div> <HiOutlineArrowLeft/> </div>
            <div className="text-neutral-600"> назад </div>
        </div>

        <TextInput 
            name="username"
            label="Имя"
            value={data.name}
            onChange={(value) => setData({...data, name: value})}
        />

        {/* <TextInput 
            name="photo"
            label="Фото"
            value={data.picture}
            onChange={(value) => setData({...data, picture: value})}
        /> */}

        <div className="flex justify-center">
            <SkillLevels active={data.level} set={(index) => setData({...data, level: index})} />
        </div>
        
        { hasTelegramToken() ? 
         (<a className="my-5 flex w-full items-center justify-center rounded bg-primary px-7 pb-2.5 pt-3 text-center text-sm font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
          
                role="button"
                href="#register"
                data-te-ripple-init
                data-te-ripple-color="light"
                onClick={() => handleRegister(null)}
            >
                Зарегистрироваться
            </a>): 
            (
            <div className="flex flex-col justify-center">
                <div className="flex justify-center my-5">
                    <TelegramLogin onAuth={handleRegister} name="NNtksg_bot"/>
                </div>
                <div className="text-neutral-500 text-sm text-center">
                    *Необходимо разрешить боту присылать сообщения
                </div>
            </div>
            )
        }
    </div>
    </>
    );
};

export default RegisterForm;