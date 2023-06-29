import { useContext, useEffect, useState } from "react";
import { DatePicker } from "components/Inputs";
import Pagination from "components/Pagination";
import { WorkshiftSelectModal } from "components/Modal";
import { fetchOffers } from "api/Offers";
import timeFormat from "utils/time";
import { AlertContext } from "App";
import { AiOutlineSelect } from "react-icons/ai"
import { Modal } from "tw-elements";
import { createAnswer } from "api/Answers";

const Offer = ({offer, onSelect}) => {
    return (
     <>
     <div className="bg-white mx-1 md:mx-5 my-2 flex flex-row justify-between rounded items-center">
        <div className="p-3 flex flex-col justify-start items-start divide">
            <div className="flex flex-row mx-5 space-x-5 justify-start">
                <img src={offer.user.picture} className="w-6 rounded-full shadow-lg" alt="Avatar" />
                <div className="text-neutral-500"> {offer.user.name} </div>
            </div>
            <div className="flex flex-row space-x-5 justify-between mx-5 mt-3 items-center ">
                <div className="text-lg"> {offer.workshift.title} </div>
                <div className="flex flex-row space-x-1 text-neutral-500"> 
                    <div> {offer.workshift.start_time.format('HH:mm')}</div>
                    <div> - </div>
                    <div> {offer.workshift.end_time.format('HH:mm')} </div>
                </div>
            </div>
        </div>
        <div className="flex flex-row space-x-3">
            <AiOutlineSelect className="w-8 h-8 me-5 hover:bg-slate-50 p-1 rounded" onClick={() => onSelect(offer.id)}/>
        </div>
    </div>
    </>
    );
}

const OffersGroup = ({date, offers, onSelect}) => {
    return (
    <>
        <div>
            <div className=" text-sm"> {date} </div>
            <div>
                {offers && offers.map((offer) => <Offer key={offer.id} offer={offer} onSelect={onSelect} />)}
            </div>
        </div> 
    </>
    );
}

const AviableOffersScreen = () => {
    const [offers, setOffers] = useState([])
    const [filters, setFilters] = useState({ date: timeFormat.formatNow(), page: 1 });
    const [modal, setModal] = useState(null);
    const [selectedOffer, setSelectedOffer] = useState(0)
    const setAlert = useContext(AlertContext)

    useEffect(() => {
        const modal = document.getElementById("select-workshift")
        setModal(new Modal(modal, {}));
    }, [])

    useEffect(() => {
        fetchOffers(timeFormat.parse(filters.date), (filters.page-1)*10, 10).then((result) => setOffers(result));
    }, [filters]);

    const handleOfferSelect = (id) => {
        setSelectedOffer(id)
        modal?.show()
    };

    const handleEventSelect = (id) => {
        createAnswer(selectedOffer, id)
            .then((result) => setAlert({ success: true, label: "Успех", message: "Ответ успешно создано"}))
            .catch((error) => setAlert({ success: false, label: "Ошибка", message: "Не удалось создать ответ на предложение обмена" }));
        
        modal?.hide();
    }

    return (
    <>
    <div className="h-max min-h-screen bg-slate-50">
        <div className="mx-5 md:mx-10 py-20">
            <div className="flex flex-col mx-5 justify-center space-y-5 items-center">
                <DatePicker name="schedule-start-time" label="Дата" date={filters.date} onChange={(e) => setFilters({...filters, date: e})} />
                <Pagination number={filters.page} onPageChange={(n) => setFilters({...filters, page: n})}/>
            </div>
            { offers && offers.map((group) => <OffersGroup key={group[0]} date={group[0]} offers={group[1]} onSelect={handleOfferSelect} />) }
        </div>
    </div>
    <WorkshiftSelectModal modalId="select-workshift" onSelect={handleEventSelect} onClose={() => modal?.hide()}/>
    </>
    );
};

export default AviableOffersScreen;
