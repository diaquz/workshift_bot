import * as moment from "moment"

const EventTypes = {
    workshift: 0,
    another: 1,

    parseFromString: (name) => { return EventTypes[name] },
    name: (value) => { return Object.keys(EventTypes)[value] }
};

const UserPrivilage = {
    User: 0,
    Moderator: 1,
    Admin: 3
};

const UserLevel = {
    levels: ["Новичок", "Средний", "Сложный", "Мастер"],
    name: (value) => { return UserLevel.levels[value]; }
};

const Time = {
    dateFormat: "DD/MM/YYYY",
    timeFormat: "HH:mm",
    format: "YYYY-MM-DDTHH:mm:ss",

    date: (value) => { return moment(value).format(Time.dateFormat); },
    time: (value) => { return moment(value).format(Time.timeFormat); },
    currentDate: () => { return moment().format(Time.dateFormat); }
};


export { EventTypes, UserPrivilage, Time, UserLevel };
