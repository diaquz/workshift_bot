import { Card } from "flowbite-react";
import IconButton from "../IconButton";
import {HiCheck, HiXMark} from 'react-icons/hi2'
import { UserLevel } from "../../constants";

const Request = ({request, accept, decline}) => {
    return (
    <>
        <li className="py-1">
            <Card>
                <div className="flex items-center space-x-10 justify-between">
                    <div className="flex items-center flex-row space-x-10">
                        <div className="shrink-0">
                            <img className="h-16 w-16 rounded-full" src={request.picture} alt="User image"/>
                        </div>
                        <div className="min-w-0 flex-col items-start text-left">
                            <p className="truncate text-md text-gray-900"> {request.name} </p>
                            <p className="truncate text-sm text-gray-500"> {UserLevel.name(request.level) } </p>
                        </div>
                    </div>
                    <div className="flex flex-row">
                        <IconButton icon={<HiCheck/>} onClick={() => { accept(request.id) }} />
                        <IconButton icon={<HiXMark/>} onClick={() => { decline(request.id) }} />
                    </div>
                </div>
            </Card>
        </li>
    </>
    );
};

export default Request;
