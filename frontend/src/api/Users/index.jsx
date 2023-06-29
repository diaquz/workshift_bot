import axios from "axios";
import moment from "moment";
import config from "utils/config";

const fetchUsers = async (keyword, offset, limit) => {

    if(keyword && keyword != "")
        return await axios.get(`${config.apiUserPath}/search?keyword=${keyword}offset=${offset}&limit=${limit}`)
            .then(({data}) => { return data?.result; })
            .catch((error) => { return []});

    return await axios.get(`${config.apiUserPath}/?offset=${offset}&limit=${limit}`)
        .then(({data}) => { return data?.result; })
        .catch((error) => { return [] });
};

const fetchCurrent = async () => {

    await axios.get(`${config.apiUserPath}/me`)
        .then(({data}) => { localStorage.setItem('user', JSON.stringify(data)); })
        .catch((error) => {})

};

const editUser = async (data) => {
    return await axios.post(`${config.apiUserPath}/edit`, data)
        .then(({data}) => { return data });
};

const removeUser = async (id) => {
    return await axios.post(`${config.apiUserPath}/delete?user_id=${id}`)
        .then(({data}) => { return data });
}

export { fetchUsers, fetchCurrent, editUser, removeUser };
