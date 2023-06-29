import { useContext, useEffect, useState } from "react";
import { fetchUserOffers, removeOffer } from "api/Offers";
import { AlertContext } from "App";
import { AiOutlineCheck, AiOutlineClose, AiOutlineDelete } from "react-icons/ai"
import moment from "moment";
import { NavigationContext } from "components/Navigation";
import { ErrorAlert, SuccessAlert } from "utils/alertConstructor";
import { acceptAnswer, removeAnswer } from "api/Answers";


const Answer = ({answer, onAccept, onDecline}) => {
    return (
     <>
     <div className="bg-white mx-5 my-2 flex flex-row justify-between rounded items-center">
        <div className="p-3 flex flex-col justify-start items-start divide">
            <div className="flex flex-row mx-5 space-x-5 justify-start">
                <img src={answer.workshift.user.picture} className="w-6 rounded-full shadow-lg" alt="Avatar" />
                <div className="text-neutral-500"> {answer.workshift.user.name} </div>
            </div>
            <div className="flex flex-row space-x-5 justify-between mx-5 mt-3 items-center">
                <div className="text-lg"> {answer.workshift.title} </div>
                <div className="flex flex-row space-x-1 text-neutral-500 items-center"> 
                    <div className="me-3"> {moment(answer.workshift.start_time).format("DD MMMM, dddd") } </div>
                    <div> {moment(answer.workshift.start_time).format('HH:mm')}</div>
                    <div> - </div>
                    <div> {moment(answer.workshift.end_time).format('HH:mm')} </div>
                </div>
            </div>
        </div>
        <div className="flex flex-row space-x-3 mx-5">
            <AiOutlineCheck className="w-8 h-8 me-3 hover:bg-slate-50 p-1 rounded" onClick={() => onAccept(answer.id)}/>
            <AiOutlineClose className="w-8 h-8 me-5 hover:bg-slate-50 p-1 rounded" onClick={() => onDecline(answer.id)}/>
        </div>
    </div>
    </>
    );
};

const Offer = ({offer, onRemove, onAccept, onDecline}) => {
    const [expanded, setExpanded] = useState(false);

    return (
     <>
     <div className="mb-5" >
        <div className="bg-white mx-1 md:mx-5 my-2 flex flex-row justify-between rounded items-center hover:border-slate-100 border-white border-2 border-solid " onClick={() => setExpanded(!expanded)}>
            <div className="p-3 flex flex-col justify-start items-start divide">
                <div className="flex flex-row space-x-5 justify-between items-center ">
                    <div className="text-lg"> {offer.workshift.title} </div>
                    <div className="flex flex-row space-x-1 text-neutral-500"> 
                        <div> {offer.workshift.start_time.format('HH:mm')}</div>
                        <div> - </div>
                        <div> {offer.workshift.end_time.format('HH:mm')} </div>
                    </div>
                    <div className="text-neutral-300"> ({offer.answers.length}) </div>
                </div>
            </div>
            <div className="flex flex-row space-x-3 mx-5">
                <AiOutlineDelete className="w-8 h-8 me-5 hover:bg-slate-50 p-1 rounded" onClick={() => onRemove(offer.id)}/>
            </div>
        </div>
        <div className="mx-5">
            { expanded && offer.answers && offer.answers.map((answer) => <Answer key={answer.id} answer={answer} onAccept={onAccept} onDecline={onDecline}/>)}
        </div>
    </div>
    </>
    );
}

const OffersGroup = ({date, offers, onRemove, onAccept, onDecline}) => {
    return (
    <>
        <div>
            <div className=" text-sm"> {date} </div>
            <div>
                {offers && offers.map((offer) => <Offer key={offer.id} offer={offer} onRemove={onRemove} onAccept={onAccept} onDecline={onDecline} />)}
            </div>
        </div> 
    </>
    );
}

const UserOffersScreen = () => {
    const [fetchTrigger, setFetchTrigger] = useState(false);
    const [offers, setOffers] = useState([])

    const setItem = useContext(NavigationContext)
    const setAlert = useContext(AlertContext)


    useEffect(() => {
        setItem([{name: "Мои предложения", action: () => {}}])

        fetchUserOffers().then((result) => setOffers(result));
    }, [fetchTrigger, setItem]);

    const handleOfferRemove = (id) => {
        removeOffer(id)
            .then((data) => {
                setAlert(SuccessAlert("Успех", "Предложение обмена удалено"));
                setFetchTrigger(!fetchTrigger);
            })
            .catch((error) => {
                setAlert(ErrorAlert("Ошика", "Не удалось удалить предложение обмена"));
            });
    }

    const handleAnswerSelect = (id) => {
       acceptAnswer(id)
        .then((data) => {
            setAlert(SuccessAlert("Успех", "Ответ принят"));
            setFetchTrigger(!fetchTrigger);
        })
        .catch((error) =>  setAlert(ErrorAlert("Ошика", "Не удалось принять ответ")));
    };
    const handleAnswerDecline = (id) => {
        removeAnswer(id)
            .then((data) => {
                setAlert(SuccessAlert("Успех", "Ответ отклонен"));
                setFetchTrigger(!fetchTrigger);
            })
            .catch((error) =>  setAlert(ErrorAlert("Ошика", "Не удалось удалить ответ")));
    }


    return (
    <>
    <div className="h-max min-h-screen bg-slate-50">
        <div className="mx-5 md:mx-10 py-20">
            { offers && offers.map((group) => <OffersGroup key={group[0]} date={group[0]} offers={group[1]} onRemove={handleOfferRemove}  onAccept={handleAnswerSelect} onDecline={handleAnswerDecline}/>) }
        </div>
    </div>
    </>
    );
};

export default UserOffersScreen;
