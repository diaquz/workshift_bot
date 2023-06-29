import axios from "axios";
import config from "utils/config";

import { fetchCurrent } from "api/Users";

const login = async (token) => {
    localStorage.setItem('telegram', JSON.stringify(token))

    return await axios.post(`${config.apiAuthPath}/telegram`, token)
        .then(({data}) => {
            localStorage.setItem('token', JSON.stringify(data));
            fetchCurrent();
            return true;
        })
        .catch((error) => { return false });
};


const register = async (token, data) => {
    data.telegram_id = 0

    return await axios.post(`${config.apiAuthPath}/register`, { token: token, data: data })
        .then(({data}) => { return true; })
        .catch((error) => { return false; });
};


export { login, register };
