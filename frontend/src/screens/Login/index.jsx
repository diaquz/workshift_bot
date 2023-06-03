import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { Card,  Modal, Label,  Button } from "flowbite-react";

import TelegramLoginButton from 'react-telegram-login';
import TextInput from "../../components/Input";

import FastAPIClient from "../../client";
import config from "../../config";

const client = new FastAPIClient(config)

const Login = () => {

    const levels = ["Новичок", "Продвинутый", "Сложный", "Мастер"];
    const [level, setLevel] = useState(1);
    const [showForm, setShowForm] = useState(false);
    const [registerForm, setRegisterForm] = useState({ name: '', level: '' });

    const navigate = useNavigate()

    const onAuth = (response) => {
        client.login(response).then(
            () => { navigate('/schedule') }
        ).catch((error) => {
            
            if(error.response.status === 401) { 
                setShowForm(true) 
            }
            
        });
    };

    const handleLevelChange = (value) => {
        setLevel(value);
        setRegisterForm({...registerForm, level: value});
    };

    const onRegister = () => {
        const inp = document.querySelector("#text-input-name")

        client.register(inp.value, registerForm.level)
            .then(() => {})
            .catch(() => {});
    };

    return (
    <>
        <Card className="m-10 min-h-screen flex justify-center items-center">
            <TelegramLoginButton dataOnauth={onAuth} botName="NNtksg_bot"/>
        </Card>
        <Modal
            show={showForm}
        >
            <Modal.Header/>
            <Modal.Body>
                <div className="space-y-6 px-6 pb-4 sm:pb-6 lg:px-8 xl:pb-8">
                    <h3 className="text-xl font-medium text-gray-900 dark:text-white">
                        Оставьте заявку на регистрацию
                    </h3>
                    <div>
                        <div className="mb-2 block">
                            <Label htmlFor="name" value="Ваше имя"/>
                        </div>
                        <TextInput 
                            label=""
                            inputId="name"
                            value={registerForm.name}
                            onChange={(e) => setRegisterForm({...registerForm, name: e.targer.value})}
                        />
                    </div>
                    <div>
                        <div className="mb-2 block">
                            <Label
                                htmlFor="level"
                                value="Ваш уровень"
                            />
                        </div>

                        <div className="flex justify-center">
                            <Button.Group>
                                { levels.map((value, index) => {
                                    return (<ToggleButton label={value} checked={index == level} handle={() => handleLevelChange(index)}/>);
                                })}
                                
                            </Button.Group>
                        </div>
                    </div>
                    <div className="w-full flex justify-end">
                        <Button onClick={onRegister}>
                            Отправить заявку
                        </Button>
                    </div>
            </div>
            </Modal.Body>
        </Modal>
    </>
    );
};

const ToggleButton = ({label, checked, handle}) => {
    if(checked) return (
        <Button gradientMonochrome="info"> {label} </Button>
    );

    return (
        <Button color="gray" onClick={handle}> {label} </Button>
    );
};

export default Login;
