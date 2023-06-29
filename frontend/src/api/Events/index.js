import axios from "axios";
import config from "utils/config";
import moment from "moment/moment";
import { groupBy } from "core-js/actual/array/group-by";

const processEvents =  ({result}) => {
    if(!result) return [];

    result.forEach(event => {
        event.start_time = moment(event.start_time)
        event.end_time = moment(event.end_time)
    });
    
    return Object.entries(
        Array.from(result).groupBy(({long, start_time, end_time}) => { 

            if(!long) {
                return start_time.format("dddd, DD MMMM") 
            } else {
                return `${start_time.format("dddd, DD MMMM")} - ${end_time.format("dddd, DD MMMM") }`
            }
        })
    )  
};

const fetchForUser = async (date) => {
    return await axios.get(`${config.apiEventPath}/?start=${date.start}&end=${date.end}`)
        .then(({data}) => { return processEvents(data)})
        .catch((error) => { return [] });
};

const fetchWorkshifts = async (start, end) => {
    return await axios.get(`${config.apiEventPath}/workshift?start=${start}&end=${end}`)
        .then(({data}) => { return processEvents(data); })
        .catch((error) => { return [] });
};

const fetchAll = async (date) => {
    const process =  ({result}) => {
        if(!result) return [];
    
        result.forEach(event => {
            event.start_time = moment(event.start_time)
            event.end_time = moment(event.end_time)
        });
        
        return Object.entries(
            Array.from(result).groupBy(({user}) => { 
                return user.id
            })
        )  
    };

    return await axios.get(`${config.apiEventPath}/all?timestamp=${date}`)
        .then(({data}) => { return process(data) })
        .catch((error) => { return [] });
};

const toggleNotify = (id) => {};


const createEvent = async (data, users) => {
    return await axios.post(`${config.apiEventPath}/create/many`, { data: data, users: users })
        .then(({data}) => { return data?.result });
};

const editEvent = async (data) => {
    return await axios.post(`${config.apiEventPath}/edit`, data)
        .then(({data}) => { return data });
};

const removeEvent = async (id) => {
    return await axios.post(`${config.apiEventPath}/delete?event_id=${id}`)
        .then(({data}) => { return data });
};

export { fetchForUser, fetchAll, fetchWorkshifts, toggleNotify, createEvent, editEvent, removeEvent };
