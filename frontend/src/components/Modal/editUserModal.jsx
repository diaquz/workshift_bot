import { EditUserForm } from "components/Forms";
import DefaultModal from "./modal";


const EditUserModal = ({modalId, label, user, onSubmit, onClose}) => {
    return (
    <>
        <DefaultModal modalId={modalId} label={label}>
            <EditUserForm user={user} onSubmit={onSubmit} onClose={onClose} />
        </DefaultModal>
    </>
    );
}

export default EditUserModal;
