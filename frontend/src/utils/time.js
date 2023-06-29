import moment from "moment";

const timeFormat = {
    formatStr: "DD/MM/YYYY",
    timeFormat: "HH:mm",
    fullFormat: "DD/MM/YYYY-HH:mm",
    moment: (date) => moment(date, timeFormat.formatStr),
    parse: (date) => moment(date, timeFormat.formatStr).unix(),

    format: (date) => date.format(timeFormat.formatStr),
    formatNow: (d = 0) => timeFormat.now(d).format(timeFormat.formatStr),

    unix: (d=0) =>  timeFormat.now(d).unix(),
    now: (d = 0) => moment().add(d, 'days').set({ 'hour': 0, 'minute': 0, 'second': 0}),
    timeFrom: (date) => moment(date).format(timeFormat.timeFormat)
};

export default timeFormat;
