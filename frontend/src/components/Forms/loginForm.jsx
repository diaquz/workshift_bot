import { useEffect } from "react";
import { initTE, Ripple, Input } from "tw-elements"
import TelegramLogin from "components/TelegramLogin";

const LoginForm = ({onAuth, onRegister}) => {
    useEffect(() => { initTE({ Input, Ripple }); }, []);

    return (
    <>
    <div className="md:w-8/12 lg:ml-6 lg:w-5/12"> 
        <div className="my-4 flex items-center justify-center">
            <TelegramLogin onAuth={onAuth} name="NNtksg_bot" />
        </div>

        <div className="my-4 flex items-center before:mt-0.5 before:flex-1 before:border-t before:border-neutral-300 after:mt-0.5 after:flex-1 after:border-t after:border-neutral-300">
            <p className="mx-4 mb-0 text-center font-semibold dark:text-neutral-200">
                Или
            </p>
        </div>

        <a className="mb-3 flex w-full items-center justify-center rounded bg-primary px-7 pb-2.5 pt-3 text-center text-sm font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
          
            role="button"
            href="#register"
            data-te-ripple-init
            data-te-ripple-color="light"
            onClick={onRegister}
        >
            Зарегистрироваться
        </a>
    </div>
    </>
    );
};

export default LoginForm;
