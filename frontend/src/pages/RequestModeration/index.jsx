import { useContext, useEffect, useState } from "react";
import { AiOutlineCheck, AiOutlineClose } from "react-icons/ai"
import { AlertContext } from "App";
import { Badge } from "components/Badges";
import { Levels } from "utils/constants";

import { NavigationContext } from "components/Navigation";
import { acceptRequest, declineRequest, fetchRequests } from "api/Requests";
import { ErrorAlert, SuccessAlert } from "utils/alertConstructor";

const Request = ({request, onAccept, onDecline}) => {
    return (
        <>
        <div className="bg-white md:mx-5 my-2 flex flex-row justify-between rounded items-center">
            <div className="flex flex-row p-3 mx-5 space-x-5 justify-start items-center">
                <img src={request.picture} className="w-8 rounded-full shadow-lg" alt="Avatar" />
                <div className="text-neutral-500 text-lg"> {request.name} </div>
                <Badge label={Levels.name(request.level)} />
            </div>
            <div className="flex flex-row space-x-3 me-5">
                <AiOutlineCheck className="w-8 h-8 me-3 hover:bg-slate-50 p-1 rounded" onClick={() => onAccept(request.id)}/>
                <AiOutlineClose className="w-8 h-8 me-5 hover:bg-slate-50 p-1 rounded" onClick={() => onDecline(request.id)}/>
            </div>
        </div>
        </>
    );
};


const RequestModerationScreen = () => {
    const [fetchTrigger, setFetchTrigger] = useState(false);
    const [requests, setRequests] = useState([])
    const setAlert = useContext(AlertContext)
    const setItems = useContext(NavigationContext)


    useEffect(() => { setItems([{ name: "Запросы на регистрацию", action: () => {}}]) }, [setItems])

    useEffect(() => { 
        fetchRequests().then((result) => setRequests(result));
    }, [setAlert, fetchTrigger]);

    const handleAccept = (id) => {
        acceptRequest(id)
            .then((result) => { setAlert(SuccessAlert("Успех", "Запрос на регистрацию принят")); setFetchTrigger(!fetchTrigger) })
            .catch((error) => setAlert(ErrorAlert("Ошибка", "Не удалось принять запрос на регистрацию")));
    };
    const handleDecline = (id) => {
        declineRequest(id)
            .then((result) => { setAlert(SuccessAlert("Успех", "Запрос на регистрацию отклонен")); setFetchTrigger(!fetchTrigger) })
            .catch((error) => setAlert(ErrorAlert("Ошибка", "Не удалось отклонить запрос на регистрацию")));
    };


    return (
    <> 
    <div className="h-max min-h-screen bg-slate-50">
        <div className="mx-5 md:mx-10 py-20">
            { requests && requests.map((request) => <Request key={request.id} request={request} onAccept={handleAccept} onDecline={handleDecline} /> )}
        </div>
    </div>
    </>
    );
};

export default RequestModerationScreen;