import { useContext, useEffect, useState } from "react";

import { AlertContext } from "App";
import { AiOutlineCheck, AiOutlineClose } from "react-icons/ai"
import { BiTimeFive } from "react-icons/bi"
import { fetchFeedback } from "api/Feedback";
import { NavigationContext } from "components/Navigation";



const Feedback = ({feedback, onAccept, onRemove, onWork}) => {
    return (
     <>
     <div className="bg-white md:mx-5 my-2 flex flex-row justify-between rounded items-center">
        <div className="p-3 flex flex-col justify-start items-start divide">
            <div className="flex flex-row mx-5 space-x-5 justify-start">
                <img src={feedback.user.picture} className="w-6 rounded-full shadow-lg" alt="Avatar" />
                <div className="text-neutral-500"> {feedback.user.name} </div>
            </div>
            <div className="flex flex-col space-x-5 justify-between mx-5 mt-3 items-center ">
                <div className="text-lg"> {feedback.title} </div>
            </div>
            <div className="flex text-neutral-500 mx-5"> 
                    {feedback.message}
            </div>
        </div>
        <div className="flex flex-row space-x-1 m-5">
            <AiOutlineCheck className="w-8 h-8 hover:bg-slate-50 p-1 rounded" onClick={() => onAccept(feedback.id)}/>
            {!onWork && <BiTimeFive className="w-8 h-8 hover:bg-slate-50 p-1 rounded" onClick={() => onAccept(feedback.id)}/>}
            <AiOutlineClose className="w-8 h-8 hover:bg-slate-50 p-1 rounded" onClick={() => onRemove(feedback.id)}/>

        </div>
    </div>
    </>
    );
}

const FeedbacksGroup = ({label, onWork, feedbacks, handleAccept, onRemove}) => {

    return (
        <div className="flex flex-col mb-10">
            <div className=" text-md text-neutral-700"> {label} </div>
            { feedbacks && feedbacks.map((feedback) => <Feedback key={feedback.id} onWork={onWork} feedback={feedback} onAccept={handleAccept} onRemove={handleAccept}/>) }
        </div>
    );
}


const FeedbackModerationScreen = () => {
    const [feedbacks, setFeedbacks] = useState({ in_work: [], other: [] });

    const [modal, setModal] = useState(null);
    const setAlert = useContext(AlertContext);
    const setItems = useContext(NavigationContext);

    // useEffect(() => {
    //     const modal = document.getElementById("select-workshift")
    //     setModal(new Modal(modal, {}));
    // }, [])

    useEffect(() => setItems([{ name: "Обратная связь", action: () => {}}]), [setItems])

    useEffect(() => {
        fetchFeedback().then((result) => setFeedbacks(result));
    }, []);

    const handleAccept = (id) => {}
    

    return (
    <>
    <div className="h-max min-h-screen bg-slate-50">
        <div className="mx-5 md:mx-10 py-20">
            <FeedbacksGroup label={"Запросы в обработке"} onWork={true} feedbacks={feedbacks.in_work} onAccept={handleAccept} onRemove={handleAccept} />
            <FeedbacksGroup label={"Запросы"} feedbacks={feedbacks.other} onAccept={handleAccept} onRemove={handleAccept} />

            {/* { feedbacks && feedbacks.map((feedback) => <Feedback key={feedback.id} feedback={feedback} onAccept={handleAccept} onRemove={handleAccept}/>) } */}
        </div>
    </div>

    </>
    );
};

export default FeedbackModerationScreen;