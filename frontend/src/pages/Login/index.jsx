import { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { LoginForm, RegisterForm } from 'components/Forms';
import { AlertModal } from 'components/Modal';
import { login, register } from 'api/Auth';
import { checkAuth } from 'utils/auth';
import { Modal } from "tw-elements";
import { AlertContext } from 'App';
import { ErrorAlert, SuccessAlert } from 'utils/alertConstructor';

const LoginScreen = () => {
    const [loginView, setLoginView] = useState(true);
    const [modal, setModal] = useState(null)
    const navigate = useNavigate();
    const setAlert = useContext(AlertContext);

    useEffect(() => {
        if(checkAuth()) navigate('/')
        const modal = document.getElementById("alertModal")
        setModal(new Modal(modal, {}));
    }, [navigate]);

    const handleAuth = (token) => {
        login(token).then((result) => {
            if(result) navigate('/')
            else {
                setLoginView(false)
            }
        });
    };

    const handleRegister = (token, data) => {
        register(token, data)
            .then((result) => {
                if(result) setAlert(SuccessAlert("Успех", "Запрос на регистрацию отправлен"));
                else setAlert(ErrorAlert("Ошибка", "Не удалось отправить запрос на регистрацию"));
            }
        );
    }

    return (
    <>
    <AlertModal title="Успешная регистрация" message="Вы получите уведомления, когда заявка будет принята." onClose={() => { modal?.hide() }} />
    <section className="h-screen flex justify-center">
        <div className="container h-full px-6 py-24">
            <div className="g-6 flex h-full flex-wrap items-center justify-center lg:justify-between">
                <div className="mb-12 md:mb-0 md:w-8/12 lg:w-6/12 flex justify-center">
                    <div className="flex flex-col justify-center">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="200px md:400px"
                        height="200px md:400px"
                        viewBox="0 0 32 32"
                    >
                        <path d="M27.232 3.993h-0.928c-0.442 0-0.8 0.358-0.801 0.8v17.596l-8.467-13.916c-0.143-0.232-0.396-0.384-0.684-0.384h-0.736c-0 0-0 0-0.001 0-0.288 0-0.541 0.153-0.681 0.381l-0.002 0.003-8.437 13.907v-17.588c-0-0.442-0.358-0.8-0.8-0.8h-0.928c-0.442 0-0.8 0.358-0.8 0.8v22.4c0 0.442 0.358 0.8 0.8 0.801h0.799c0.288-0 0.541-0.153 0.682-0.381l0.002-0.003 9.748-16.058 9.75 16.058c0.143 0.232 0.395 0.385 0.684 0.385h0.799c0.442-0.001 0.8-0.359 0.801-0.801v-22.4c-0.001-0.442-0.359-0.8-0.801-0.8v0z"/>
                    </svg>
                    <div className="overline text-4xl text-center"
                        style={{fontFamily: "Roboto"}}
                    > Workshift bot </div>
                    </div>
                </div> 
    
                { 
                loginView ? 
                    <LoginForm onAuth={handleAuth} onRegister={() => setLoginView(false)}/> : 
                    <RegisterForm onRegister={handleRegister} toLogin={() => setLoginView(true)}/>
                }
            </div>
        </div>
    </section>
    </>);
};


export default LoginScreen;
