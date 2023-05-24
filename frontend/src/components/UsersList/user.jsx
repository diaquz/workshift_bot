import { Card, Badge } from "flowbite-react";
import { UserLevel } from "../../constants";

const User = ({user}) => {
    return (
    <>
        <li className="py-1">
            <Card>
                <div className="flex items-center space-x-10">
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
                </div>
            </Card>
        </li>
    </>
    );    
};

export default User;
