const Event = ({event, children}) => {
    return (
    <>
        <div className="bg-white p-3 flex flex-row justify-between mx-1 md:mx-5 my-2 items-center rounded">
            <div className="flex flex-row space-x-5 justify-between items-center">
                <div className="text-lg"> {event.title} </div>
                <div className="flex flex-row space-x-1 text-neutral-500"> 
                    <div> {event.start_time.format('HH:mm')}</div>
                    <div> - </div>
                    <div> {event.end_time.format('HH:mm')} </div>
                </div>
            </div>
            <div className="flex flex-row space-x-3">
                {children}
            </div>
        </div>
    </>
    );
};

const EventGroup = ({date, events, children}) => {
    return (
    <>
        <div>
            <div className=" text-sm"> {date} </div>
            <div>
                {events && events.map((event) => <Event key={event.id} event={event}> {children} </Event>)}
            </div>
        </div>
    </>
    );
};


export { EventGroup, Event }