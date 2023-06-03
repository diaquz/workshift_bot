import { Card, Badge } from "flowbite-react";
import FastAPIClient from "../../client";
import { UserLevel } from "../../constants";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const client = new FastAPIClient();

const ProfileScreen = () => {
    const navigate = useNavigate();
    const [form, setForm] = useState(false);

    useEffect(() => {
        if(!client.checkAuth()) navigate('/login');
    }, [])
    const user = client.currentUser();

    const logout = () => {
        client.logout();
        navigate('/login')
    };


    return (
    <>
        <Card className="m-5 lg:m-10">
            <div className="flex flex-col m-10 justify-center space-y-5">

                {user && <div className="flex items-center space-x-10 justify-center">
                    <div className="shrink-0">
                        <img className="h-16 w-16 rounded-full" src={user.picture} alt="User image"/>
                    </div>
                    <div className="min-w-0 flex-col items-start text-left">
                        <p className="truncate text-md text-gray-900"> {user.name} </p>
                        <div className="flex flex-col md:flex-row align-middle">
                            <p className="truncate text-sm text-gray-500 mr-3"> {UserLevel.name(user.level)} </p>
                            {(user.privilage == 1) ? (<Badge color="indigo">Модератор</Badge>) : ""}
                            {(user.privilage == 2) ? (<Badge color="purple">Администратор</Badge>) : "" }
                        </div>
                    </div>
                </div>}
                
                <a className="underline hover:scale-105" onClick={() => setForm(true)} > Связь с модераторами </a>
                <a className="underline hover:scale-105" onClick={() => logout()}>Выход </a>

            </div>
        </Card>
    </>
    );

};

export default ProfileScreen;
