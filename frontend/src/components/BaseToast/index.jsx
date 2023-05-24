import { Toast } from "flowbite-react";


const MessageToast = ({message, onClose}) => {
    return (
        <Toast className="fixed bottom-12 right-12 duration-75 ease-in">
            <div className="pl-4 text-sm font-normal">
                {message}
            </div>
            <Toast.Toggle onClick={onClose}/>
        </Toast>
    );
};

export default MessageToast;
