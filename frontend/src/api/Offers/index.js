import axios from "axios";
import moment from "moment";
import { groupBy } from "core-js/actual/array/group-by";

import config from "utils/config";

const processOffers = ({result}) => {
    if(!result) return [];

    result.forEach((offer) => {
        offer.workshift.start_time = moment(offer.workshift.start_time)
        offer.workshift.end_time = moment(offer.workshift.end_time)
    })

    return Object.entries(
        Array.from(result).groupBy(({workshift}) => { 
            if(!workshift.long) {
                return workshift.start_time.format("dddd, DD MMMM") 
            } else {
                return `${workshift.start_time.format("dddd, DD MMMM")} - ${workshift.end_time.format("dddd, DD MMMM") }`
            }
        })
    )  
};

const fetchOffers = async (date, offset, limit) => {
    return await axios.get(`${config.apiOfferPath}/?date=${date}&offset=${offset}&limit=${limit}`)
        .then(({data}) => { return processOffers(data) })
        .catch((error) => alert(error));
};

const fetchUserOffers = async () => {
    return await axios.get(`${config.apiOfferPath}/mine`)
        .then(({data}) => { return processOffers(data) })
        .catch((error) => { return [] });
}

const createOffer = async (id) => {
    return await axios.post(`${config.apiOfferPath}/create?id=${id}`)
        .then(({data}) => { return data; });
};

const removeOffer = async (id) => {
    return await axios.post(`${config.apiOfferPath}/delete?id=${id}`)
        .then(({data}) => { return data; })
};

export { fetchOffers, fetchUserOffers, createOffer, removeOffer };
