import { useEffect, useState } from "react";
import { Button, Label, Modal } from "flowbite-react";

import TextInput from "../Input";
import User from "./user";

const LabledField = ({id, title, children}) => {
    return (
    <div>
        <div className="mb-2 block">
            <Label htmlFor={id} value={title}/>
        </div>
        { children }
    </div>
    );
};

const UserList = ({users, fetch, submit, remove}) => {
    const [showModal, setShowModal] = useState(false);
    const [data, setData] = useState({
        user: null,
        name: "", 
        telegramId: 0,
        level: 0,
        privilage: 0
    }); 


    const updateDataByUser = (newUser) => {
        setData({
            user: newUser,
            name: (newUser ? newUser.name : ""), 
            telegramId:  (newUser ? newUser.telegram_id : 0),
            level: (newUser ? newUser.level : 0),
            privilage: (newUser ? newUser.privilage : 0)
        });  
        const inp = document.querySelector(`#text-input-name-input`);
        inp.value = (newUser ? newUser.name : "")
    };

    let updateData = (field, value) => {
        let updateDict = {}
        updateDict[field] = value

        setData(prev => { return {...prev, ...updateDict} })
    };

    const onSubmit = () => {
        const inp = document.querySelector(`#text-input-name-input`);
        data.name = inp.value

        submit(data)
    };

    const handleEdit = (user) => {
        updateDataByUser(user);
        setShowModal(true);
    };


    return (
    <>
        <div className="container flex flex-col-reverse md:flex-row min-w-full">
            <div className="basis-full lg:basis-3/4">
                {users && users.map((user) => <User key={user.id} user={user}/> )}
                {!users && <div> Ничего не найдено T_T </div>}
            </div>
            <div className="md:basis-1/4 flex flex-col mb-5 space-y-2">
                {/* <SearchInput onSearch={() => {}}/> */}

                <Button className="mt-6" onClick={() => handleEdit(null)}> Добавить событие </Button>
            </div>
        </div>

        <Modal show={showModal} onClose={() => setShowModal(false)}>
            <Modal.Header>  Редактирование пользователя </Modal.Header>
            <Modal.Body>
                <div className="space-y-3 px-6 pb-4 sm:pb-6 lg:px-8 xl:pb-8">
                    <LabledField id="name" title="Имя">
                        <TextInput id="title" key="title-input"
                            label=""
                            inputId="name-input"
                            value={data.name}
                            onChange={(e) => { updateData('name', e.target.value) }}
                        />
                    </LabledField>

                    <LabledField id="level" title="Уровень">
                        
                    </LabledField>
                    <LabledField id="privilage" title="Статус">
                        
                    </LabledField>
                   
                    <div className="flex flex-row justify-between items-center mx-5">
                        <Button onClick={() => setShowModal(false)}> Отмена </Button>
                        <Button onClick={onSubmit}> Создать </Button>
                    </div>
                </div>
            </Modal.Body>
        </Modal>
    </>
    );
};

export default UserList;
