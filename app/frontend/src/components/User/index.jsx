import { Card } from "flowbite-react";

const User = ({user}) => {
    return (
    <>
        <li className="py-1">
            <Card>
                <div className="flex items-center space-x-10">
                    <div className="shrink-0">
                        <img className="h-16 w-16 rounded-full" src="https://t.me/i/userpic/320/_5CRzPHr0LcMkhvA2-Vj2-Pxxg0IXI2Kt6E-WzrxEZ8.jpg" alt="User image"/>
                    </div>
                    <div className="min-w-0 flex-col items-start text-left">
                        <p className="truncate text-md text-gray-900"> {user.name} </p>
                        <p className="truncate text-sm text-gray-500"> Мастер </p>
                    </div>
                
                </div>
            </Card>
        </li>
    </>
    );    
};

export default User;
