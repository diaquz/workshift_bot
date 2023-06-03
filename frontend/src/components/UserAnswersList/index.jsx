
import { useEffect } from "react";
import { SimpleEvent } from "../EventCard";

const UserAnswer = ({answer, remove}) => {
    const date = moment(offer.workshift.start_time, 'YYYY-MM-DDThh:mm:ss', 'ru')

    return (
    <>
        <div>
            <SimpleEvent event={answer.offer.workshift} />
            <SimpleEvent event={answer.workshift}/>
            // <EventCard event={offer.workshift} date={true} >
            //     <IconButton icon={<HiXMark/>} onClick={() => remove(offer.id)}/>
            // </EventCard>
        </div>
    </>);
};

const UserAnswersList = ({answers, remove, fetchAnswers}) => {
    useEffect(() => {
        if(!answers || answers.length == 0) fetchAnswers() 
    }, []);

    return (
        <>
            <div className="text-left mt-3 lg:mx-32 space-y-4 content-center">
                {answers && answers.map((answer) => <UserAnswer answer={answer} remove={remove}/>)}
            </div>
        </>
    );
};

export default UserAnswersList;