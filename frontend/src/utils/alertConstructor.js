
const ErrorAlert = (label, msg) => {
    return { 
        success: false,
         label: label, 
        message: msg
    };
}

const SuccessAlert = (label, msg) => {
    return { 
        success: true,
         label: label, 
        message: msg
    };
};

export { ErrorAlert, SuccessAlert };
