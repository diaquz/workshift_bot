import { useEffect } from "react";
import IconButton from "../IconButton";
import {HiXMark} from 'react-icons/hi2'

const Feedback = ({feedback, remove}) => {
    return (
        <>
        <div className="flex flex-row justify-between md:mx-10">
            <div className="flex flex-col">
                <p className="text-lg leading-none text-gray-700 mb-3"> {feedback.title} </p>
                <div className="flex flex-row">
                    { feedback.message }
                </div>
            </div>
            <IconButton icon={<HiXMark/>} onClick={() => remove(feedback.id)}/>
        </div>
        </>);
}

const UserFeedbackList = ({feedbacks, fetch, remove}) => {
    useEffect(() => {
        if(!feedbacks || feedbacks.length == 0) fetch()
    }, []);

    return (
        <>
            <div className="text-left mt-3 lg:mx-32 space-y-4 content-center">
                {feedbacks && feedbacks.map((feedback) => <Feedback feedback={feedback} remove={remove}/>)}
            </div>
        </>
    );
};

export default UserFeedbackList;
