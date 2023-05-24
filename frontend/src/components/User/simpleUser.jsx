import { Badge } from "flowbite-react";

const SimpleUser = ({user, onClick}) => {
    if(!user)
        return (
        <>
            <div className="flex items-center hover:bg-slate-50 p-2 rounded-lg" onClick={onClick}>
                <p> Пользователь не выбран </p>
            </div>
        </>
        );

    return (
    <>
       <div className="flex items-center space-x-5 hover:bg-slate-50 p-2 rounded-lg" onClick={onClick}>
            <div className="shrink-0">
                <img className="h-10 w-10 rounded-full" src={user.picture} alt="User image"/>
            </div>
            <div className="min-w-0 flex-col items-start text-left">
                <p className="truncate text-md text-gray-900"> {user.name} </p>
                <div className="flex flex-col md:flex-row align-middle">
                    <p className="truncate text-sm text-gray-500 mr-3"> Мастер </p>
                    {(user.privilage == 1) ? (<Badge color="indigo">Модератор</Badge>) : ""}
                    {(user.privilage == 2) ? (<Badge color="purple">Администратор</Badge>) : "" }
                </div>
            </div>
        </div> 
    </>
    );
};

export default SimpleUser;
