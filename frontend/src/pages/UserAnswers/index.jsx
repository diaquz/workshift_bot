import { AlertContext } from "App";
import { fetchUserAnswers, removeAnswer } from "api/Answers";
import { NavigationContext } from "components/Navigation";
import moment from "moment";
import { useContext, useEffect, useState } from "react";
import { AiOutlineDelete } from "react-icons/ai";
import { ErrorAlert, SuccessAlert } from "utils/alertConstructor";


const Answer = ({answer, onRemove}) => {
    return (
    <>
        <div className="bg-white p-3 flex flex-row justify-between mx-1 md:mx-5 my-2 items-start rounded">
            <div className="flex flex-row space-x-5 justify-between items-center">
                <div>{moment(answer.workshift.start_time).format('dddd, DD MMMM')}</div> 
                <div className="text-lg"> {answer.offer.workshift.title} </div>
                <div className="flex flex-row space-x-1 text-neutral-500"> 
                    <div> {moment(answer.workshift.start_time).format('HH:mm')}</div>
                    <div> - </div>
                    <div> {moment(answer.workshift.end_time).format('HH:mm')} </div>
                </div>
            </div>
            <div>
                <AiOutlineDelete className="w-8 h-8 me-5 hover:bg-slate-50 p-1 rounded" onClick={() => onRemove(answer.id)}/>
            </div>
        </div>
    </>
    );
};

const AnswersGroup = ({label, answers, onRemove}) => {
    return (
        <>
            <div>
                <div className="flex flex-col space-y-1 items-start">
                    <div className="flex flex-row space-x-1 items-center">
                        <img src={label.offer.workshift.user.picture} className="w-6 rounded-full shadow-lg" alt="Avatar" />
                        <div>{label.offer.workshift.user.name}</div> 
                    </div>
                    <div className="flex flex-row text-sm space-x-1">
                        <div className="mr-1 text-sm"> {label.offer.workshift.title} </div>
                        <div> {moment(label.offer.workshift.start_time).format('dddd, DD MMMM, HH:mm')} </div>
                        <div> - {moment(label.offer.workshift.end_time).format('HH:mm')} </div>
                    </div>
                </div>

                <div>
                    { answers && answers.map((answer) => <Answer key={answer.id} answer={answer} onRemove={onRemove}/>)}
                </div>
            </div>
        </>
        );
};


const UserAnswersScreen = () => {
    const [fetchTrigger, setFetchTrigger] = useState(false);
    const [answers, setAnswers] = useState([])

    const setItem = useContext(NavigationContext)
    const setAlert = useContext(AlertContext)


    useEffect(() => {
        setItem([{name: "Мои ответы", action: () => {}}])
        fetchUserAnswers().then((result) => setAnswers(result));
    }, [fetchTrigger, setItem]);

    const handleAnswerRemove = (id) => {
        removeAnswer(id)
            .then((data) => {
                setAlert(SuccessAlert("Успех", "Ответ был удален"));
                setFetchTrigger(!fetchTrigger);
            })
            .catch((error) => {
                setAlert(ErrorAlert("Ошика", "Не удалось удалить ответ"));
            });
    }

    return (
    <>
    <div className="h-max min-h-screen bg-slate-50">
        <div className="mx-5 md:mx-10 py-20">
            { answers && answers.map((group) => <AnswersGroup key={group[0]} label={group[1][0]} answers={group[1]} onRemove={handleAnswerRemove}/>)}
        </div>
    </div>
    </>
    );
};

export default UserAnswersScreen;
