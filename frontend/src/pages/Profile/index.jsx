import { useEffect, useState, useContext } from "react";
import { NavigationContext } from "components/Navigation";
import { AlertContext } from "App";
import { Modal } from "tw-elements";
import { FeedbackModal } from "components/Modal";
import { currentUser } from "utils/auth";


const Profile = () => {
    const [user, setUser] = useState(currentUser());
    const [modal, setModal] = useState(null);

    const setAlert = useContext(AlertContext)
    const setItems = useContext(NavigationContext)

    useEffect(() => { 
        const modalElement = document.getElementById("feedback-modal");
        setModal(new Modal(modalElement, {}));
    }, [])

    useEffect(() => {
        setItems([{name: "Профиль", action: () => {}}, {name: "Обратная связь", action: () => { modal?.show() } }], [modal])
    }, [modal]); 

    return (
    <>
    <div className="h-max min-h-screen bg-slate-50">
        <div className="mx-10 py-20">

        </div>
    </div>
    <FeedbackModal modalId="feedback-modal" user={currentUser} />
    </>
    );
};

export default Profile;
