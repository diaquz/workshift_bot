import { useEffect } from "react";
import { Modal, Ripple, initTE } from "tw-elements";

const AlertModal = ({title, message, onClose}) => {
    useEffect(() => { initTE({ Modal, Ripple }) }, []);

    return (
    <>
    <div
        data-te-modal-init
        className="fixed left-0 top-0 z-[9999] hidden h-full w-full overflow-y-auto overflow-x-hidden outline-none"
        id="alertModal"
        tabIndex="-1"
     
        role="dialog"
    >
        <div
            data-te-modal-dialog-ref
            className="pointer-events-none relative flex min-h-[calc(100%-1rem)] w-auto translate-y-[-50px] items-center opacity-0 transition-all duration-300 ease-in-out min-[576px]:mx-auto min-[576px]:mt-7 min-[576px]:min-h-[calc(100%-3.5rem)] min-[576px]:max-w-[500px]">
            <div
                className="pointer-events-auto relative flex w-full flex-col rounded-md border-none bg-white bg-clip-padding text-current shadow-lg outline-none dark:bg-neutral-600">
                <div
                    className="flex flex-shrink-0 items-center justify-between rounded-t-md border-b-2 border-neutral-100 border-opacity-100 p-4 dark:border-opacity-50">
    
                    <h5
                        className="text-xl font-medium leading-normal text-neutral-800 dark:text-neutral-200"
                        id="alert-modal-title">
                            {title}
                    </h5>
                    
                    <button
                        type="button"
                        className="box-content rounded-none border-none hover:no-underline hover:opacity-75 focus:opacity-100 focus:shadow-none focus:outline-none"
                        data-te-modal-dismiss
                        onClick={onClose}
                        aria-label="Close">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="currentColor"
                            className="h-6 w-6">
                            <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                <div className="relative p-4">
                    <p>{message}</p>
                </div>

            </div>
        </div>
    </div>
    </>
    );
};

export default AlertModal;
