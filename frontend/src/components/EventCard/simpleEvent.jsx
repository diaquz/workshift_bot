import * as moment from 'moment'
import Duration from '../Duration';

const SimpleEvent = ({event, children, lg="lg:mx-10", onClick=null}) => {
    const start = moment(event.start_time);
    const end = moment(event.end_time);

    return ( event && (
        <>
            <div className={`ml-3 ${lg} py-3 rounded-lg ${onClick ? "hover:bg-slate-50" : ""}`}>
                <div className="flex flex-col text-left">
                    <div className="flex flex-row justify-between md:mx-10">
                        <div className="flex flex-row">
                            <p className="text-lg leading-none text-gray-700 mb-3"> Рабочая смена </p>
                            <p className="text-sm text-gray-500 ml-3"> {start.format('LL')} </p>
                            {!start.isSame(end, 'day') ? 
                                (
                                <span className="flex row">
                                    <p className="text-sm text-gray-500 mx-1"> - </p>
                                    <p className="text-sm text-gray-500"> {end.format('LL')} </p>
                                </span>)
                                 : ""}
                        </div>
                        <div className="flex flex-row">
                           { children }
                        </div>
                    </div>
                    <Duration start={event.start_time} end={event.end_time}/>
                </div>
            </div>
        </>
        ));
};

export default SimpleEvent;