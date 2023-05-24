import { useEffect } from "react";
import { Modal } from "flowbite-react";
import { SimpleUser } from "../User";



const SelectUserModal = ({show, close, users, fetch, onSelect}) => {
    useEffect(() => {
        if(!users) fetch(0, 10)
    }, []);

    return (
    <>
    <Modal show={show} onClose={close} size="xl">
        <Modal.Header> Выбор пользователя </Modal.Header>
        <Modal.Body>
            <div className="flex flex-col h-96 overflow-auto">
                {users && users.map((user) => <SimpleUser key={user.id} user={user} onClick={() => onSelect(user)}/> )}
                {!users && <div> Ничего не найдено T_T </div>} 
            </div>
        </Modal.Body>
    </Modal>
    </> 
    );
};

export default SelectUserModal;