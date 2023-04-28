import { useNavigate } from 'react-router-dom';
import TelegramLoginButton from 'react-telegram-login';



const Login = () => {

    const onAuth = ({response}) => {
        console.log(response);
    };

    return (
    <>
        <TelegramLoginButton dataOnauth={onAuth} botName="T bot"/>
    </>
    );
};

export default Login;
