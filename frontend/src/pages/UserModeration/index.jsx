import { useContext, useEffect, useState } from "react";
import { Button, TextInput } from "components/Inputs";
import { Modal } from "tw-elements";
import { AiOutlineEdit, AiOutlineDelete } from "react-icons/ai"
import { AlertContext } from "App";
import { Badge } from "components/Badges";
import { Levels } from "utils/constants";
import { editUser, fetchUsers, removeUser } from "api/Users";
import Pagination from "components/Pagination";
import { NavigationContext } from "components/Navigation";
import { EditUserModal } from "components/Modal";
import { ErrorAlert, SuccessAlert } from "utils/alertConstructor";

const User = ({user, onEdit, onDelete}) => {
    return (
        <>
        <div className="bg-white md:mx-5 my-2 flex flex-row justify-between rounded items-center">
            <div className="flex flex-row p-1 mx-5 space-x-5 justify-start items-center">
                <img src={user.picture} className="w-10 h-10 rounded-lg shadow-lg" alt="Avatar" />
                <div className="text-neutral-500 text-lg text-center"> {user.name} </div>
                <Badge label={Levels.name(user.level)} />
            </div>
            <div className="flex flex-row space-x-3 me-5">
                <AiOutlineEdit className="w-8 h-8 me-3 hover:bg-slate-50 p-1 rounded" onClick={() => onEdit(user)}/>
                <AiOutlineDelete className="w-8 h-8 me-5 hover:bg-slate-50 p-1 rounded" onClick={() => onDelete(user.id)}/>
            </div>
        </div>
        </>
    );
};


const UserModerationScreen = () => {
    const [users, setUsers] = useState([]);
    const [fetchTrigger, setFetchTrigger] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);
    const setAlert = useContext(AlertContext);
    const setItems = useContext(NavigationContext);

    const [filters, setFilters] = useState({ keyword: "", page: 1 });
    const [keyword, setKeyword] = useState("");
    const [modal, setModal] = useState(null);

    useEffect(() => { 
        setItems([{ name: "Пользователи", action: () => {}}]);

        const modalElement = document.getElementById("edit-user-modal");
        setModal(new Modal(modalElement, {}));
    }, [setItems, setModal]);

    useEffect(() => { 
        fetchUsers(filters.keyword, (filters.page - 1) * 10, 10).then((result) => setUsers(result));
    }, [filters, setAlert, fetchTrigger]);


    const handleSearch = () => {
        setFilters({...filters, keyword: keyword})
    };

    const onEdit = (user) => {
        setSelectedUser(user);
        modal?.show();
    };

    const handleEdit = (data) => {
        const user = {
            id: data.user.id,
            name: data.name,
            picture: data.picture,
            level: data.level,
            privilage: data.privilage,
            telegram_id: data.user.telegram_id
        };

        editUser(user)
            .then((result) => { setAlert(SuccessAlert("Успех", "Внесенные изменения сохранены")); setFetchTrigger(!fetchTrigger); })
            .catch((error) => { setAlert(ErrorAlert("Ошибка", "Не удалось сохранить изменения")) });

        modal?.hide();
    };

    const handleRemove = (id) => {
        removeUser(id)
            .then((result) => { setAlert(SuccessAlert("Успех", "Пользователь удален")); setFetchTrigger(!fetchTrigger); })
            .catch((error) => { setAlert(ErrorAlert("Ошибка", "Не удалось удалить пользователя")) });
    };

    return (
    <> 
    <div className="h-max min-h-screen bg-slate-50">
        <div className="mx-5 md:mx-10 py-20">
            <div className="flex flex-col justify-center items-center mb-5">
                <div className="flex flex-row justify-center space-x-5 mb-5 items-center">
                    <TextInput name="search-keyword" label="Запрос" value={keyword} onChange={(e) => setKeyword(e)} />
                    <Button label="Поиск" onClick={handleSearch} />
                </div>
                <Pagination number={filters.page} onPageChange={(n) => setFilters({...filters, page: n})}/>
            </div>
                { users && users.map((user) => <User key={user.id} user={user} onEdit={onEdit} onDelete={handleRemove} />) }
                {/* { events && events.map((group) => <EventGroup key={group[0]} id={group[0]} events={group[1]} />)} */}
        </div>
    </div>
    <EditUserModal modalId="edit-user-modal" label="Редактирование пользователя" user={selectedUser} onSubmit={handleEdit} onClose={() => modal?.hide()} />
    </>
    );
};

export default UserModerationScreen;