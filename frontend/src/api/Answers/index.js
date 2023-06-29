import axios from "axios";
import config from "utils/config";
import { groupBy } from "core-js/actual/array/group-by";

const fetchUserAnswers = async () => {
    const processAnswers = ({result}) => {
        if(!result) return [];

        // result.forEach(event => {
        //     event.start_time = moment(event.start_time)
        //     event.end_time = moment(event.end_time)
        // });
        
        return Object.entries(
            Array.from(result).groupBy(({offer_id}) => { 
                return offer_id;
            })
        )
    };

    return await axios.get(`${config.apiAnswerPath}/me`)
        .then(({data}) => { return processAnswers(data) })
        .catch((error) => { return [] });
};

const createAnswer = async (offer_id, event_id) => {
    return await axios.post(`${config.apiAnswerPath}/create?offer_id=${offer_id}&event_id=${event_id}`)
        .then(({data}) => { return data });
};

const acceptAnswer = async (id) => {
    return await axios.post(`${config.apiAnswerPath}/accept?id=${id}`)
        .then(({data}) => { return data });
};

const removeAnswer = async (id) => {
    return await axios.post(`${config.apiAnswerPath}/delete?id=${id}`)
        .then(({data}) => { return data });
};

export { fetchUserAnswers, acceptAnswer, createAnswer, removeAnswer };
