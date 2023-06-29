import axios from "axios";
import config from "utils/config";

const fetchRequests = async () => {
    return await axios.get(`${config.apiAuthPath}/requests?offset=0&limit=100`)
        .then(({data}) => { return data?.result })
        .catch((error) => { return [] });
}

const acceptRequest = async (id) => {
    return await axios.post(`${config.apiAuthPath}/requests/accept?request_id=${id}`)
        .then(({data}) => { return data });
};

const declineRequest = async (id) => {
    return await axios.post(`${config.apiAuthPath}/requests/dismiss?request_id=${id}`)
        .then(({data}) => { return data });
};

export { fetchRequests, acceptRequest, declineRequest };

