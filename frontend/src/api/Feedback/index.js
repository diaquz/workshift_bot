import axios from "axios";
import config from "utils/config";
import { groupBy } from "core-js/actual/array/group-by";

const fetchFeedback = async () => {
    const processFeedback = ({result}) => {
        if(!result) return { in_work: [], other: [] };

        return {
            in_work: result.filter(({in_work}) => { return in_work }),
            other: result.filter(({in_work}) => { return !in_work })
        };
    };

    return await axios.get(`${config.apiFeedbackPath}/`)
        .then(({data}) => { return processFeedback(data) })
        .catch((error) => { return { in_work: [], other: [] } });
};

const createFeedback = (data) => {}

const doneFeedback = (id, message) => {}

const inWorkFeedback = (id, message) => {}

const declineFeedback = (id, message) => {}

const deleteFeedback = (id) => {}

export { fetchFeedback, createFeedback, doneFeedback, inWorkFeedback, declineFeedback, deleteFeedback };
