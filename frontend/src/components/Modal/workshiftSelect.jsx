import { Modal, Ripple, initTE } from "tw-elements";
import { fetchWorkshifts } from "api/Events";
import { useEffect, useState } from "react";
import { DatePicker } from "components/Inputs";
import timeFormat from "utils/time";
import { Event } from "components/Events";
import { AiOutlineCheck } from "react-icons/ai"



const EventGroup = ({date, events, onSelect}) => {
    return (
    <>
        <div>
            <div className=" text-sm"> {date} </div>
            <div className="divide-y-2">
                {events && events.map((event) => 
                    <Event key={event.id} event={event}>
                        <AiOutlineCheck className="w-8 h-8 me-5 hover:bg-slate-50 p-1 rounded" onClick={() => onSelect(event.id)} />
                    </Event>
                )}
            </div>
        </div>
    </>
    );
};

const WorkshiftSelectModal = ({modalId, onSelect, onClose}) => {
    const [date, setDate] = useState(timeFormat.formatNow(1))
    const [events, setEvents] = useState([])    

    useEffect(() => { initTE({ Modal, Ripple }) }, []);

    useEffect(() => {
        const start = timeFormat.moment(date).unix()
        const end = timeFormat.moment(date).add(1, 'days').unix()

        fetchWorkshifts(start, end).then((result) => setEvents(result))
    }, [date]);

    return (
    <>
    <div
        data-te-modal-init
        className="fixed left-0 top-0 z-[1055] hidden h-full w-full overflow-y-auto overflow-x-hidden outline-none"
        id={modalId}
        tabIndex="-1"
        aria-labelledby="exampleModalXlLabel"
        aria-modal="true"
        role="dialog">
        <div
            data-te-modal-dialog-ref
            className="pointer-events-none relative w-auto translate-y-[-50px] opacity-0 transition-all duration-300 ease-in-out min-[576px]:mx-auto min-[576px]:mt-7 min-[576px]:max-w-[500px] min-[992px]:max-w-[800px] min-[1200px]:max-w-[1140px]">
            <div
                className="pointer-events-auto relative flex w-full flex-col rounded-md border-none bg-white bg-clip-padding text-current shadow-lg outline-none dark:bg-neutral-600">
                <div
                    className="flex flex-shrink-0 items-center justify-between rounded-t-md border-b-2 border-neutral-100 border-opacity-100 p-4 dark:border-opacity-50">
                
                    <h5
                    className="text-xl font-medium leading-normal text-neutral-800 dark:text-neutral-200"
                    id="exampleModalXlLabel">
                        Выбор рабочий смены для обмена
                    </h5>
            
                    <button
                        type="button"
                        className="box-content rounded-none border-none hover:no-underline hover:opacity-75 focus:opacity-100 focus:shadow-none focus:outline-none"
                        data-te-modal-dismiss
                        onClick={onClose}
                        aria-label="Close">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="h-6 w-6">
                        <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M6 18L18 6M6 6l12 12" />
                    </svg>
                    </button>
                </div>


                <div className="relative p-4">
                    <div className="">
                        <div className="flex flex-col mx-5 justify-center space-y-5 items-center">
                            <DatePicker name="workshift-date" label="Дата" date={date} onChange={(e) => setDate(e)} />
                        </div>
                        <div className="justify-center text-center my-5">
                            { events && events.map((group) => <EventGroup key={group[0]} date={group[0]} events={group[1]} onSelect={onSelect}/>) }
                            { (!events || events.length == 0) && <span className="text-neutral-500"> Нет подходящих событий </span>}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    </>
    );
};

export default WorkshiftSelectModal;
