import TelegramLoginButton from 'react-telegram-login'

const TelegramLogin = ({onAuth, name}) => {

    return (
    <>
        <TelegramLoginButton dataOnauth={onAuth} botName={name}/>  {/* NNtksg_bot */}
    </>
    );
};

export default TelegramLogin;
