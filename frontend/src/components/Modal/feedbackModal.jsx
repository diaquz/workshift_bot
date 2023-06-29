import { Modal, Ripple, initTE } from "tw-elements";
import { useEffect } from "react";
import { EditEventForm, FeedbackForm } from "components/Forms";
import DefaultModal from "./modal";

const FeedbackModal = ({modalId, user}) => {
    return (
    <>
    <DefaultModal label="Обратная связь" modalId={modalId}>
        <FeedbackForm user={user} />
    </DefaultModal>
    </>
    );
}

export default FeedbackModal;
