import {
    Timeline,
    Button,
    Card,
    Modal
  } from "flowbite-react";

export default function LoginScreen() {
    return (
        <Modal show={false} popup={true}>
            <Modal.Header/>
            <Modal.Body>
            <script async 
                src="https://telegram.org/js/telegram-widget.js?22" 
                data-telegram-login="NNtksg_bot" 
                data-size="large" 
                data-onauth="onTelegramAuth(user)" 
                data-request-access="write"></script>
            </Modal.Body>
        </Modal>
    );
} 