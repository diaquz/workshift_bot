import { Card } from "flowbite-react";
import IconButton from "../IconButton";
import {HiCheck, HiXMark} from 'react-icons/hi2'

const Request = ({request}) => {
    return (
    <>
        <li className="py-1">
            <Card>
                <div className="flex items-center space-x-10">
                    <div className="shrink-0">
                        <img className="h-16 w-16 rounded-full" src={request.picture} alt="User image"/>
                    </div>
                    <div className="min-w-0 flex-col items-start text-left">
                        <p className="truncate text-md text-gray-900"> {request.name} </p>
                        <p className="truncate text-sm text-gray-500"> {request.level} </p>
                    </div>
                    <div>
                        <IconButton icon={<HiCheck/>} onClick={() => {}} />
                        <IconButton icon={<HiXMark/>} onClick={() => {}} />
                    </div>

                </div>
            </Card>
        </li>
    </>
    );
};

export default Request;
