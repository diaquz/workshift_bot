import { useEffect, useState } from "react";
import DefaultModal from "./modal";
import { AiFillCheckCircle } from "react-icons/ai";
import { Button, TextInput } from "components/Inputs";
import Pagination from "components/Pagination";
import { Badge } from "components/Badges";
import { Levels } from "utils/constants";
import { fetchUsers } from "api/Users";
import DefaulLargeModal from "./bigModal";
import DefaultLargeModal from "./bigModal";

const User = ({user, checked, toggle}) => {
    return (
        <>
        <div className="bg-white mx-5 my-2 flex flex-row justify-between rounded border-white border-2 hover:border-slate-100 items-center " onClick={() => toggle(user)}>
            <div className="flex flex-row p-3 mx-5 space-x-5 justify-start items-center">
                <img src={user.picture} className="w-8 rounded-full shadow-lg" alt="Avatar" />
                <div className="text-neutral-500 text-lg"> {user.name} </div>
                <Badge label={Levels.name(user.level)} />
            </div>
            <div className="flex flex-row space-x-3 me-5">
                { checked && <AiFillCheckCircle className="w-8 h-8 me-3 hover:bg-slate-50 p-1 rounded" /> }
            </div>
        </div>
        </>
    );
};

const SelectUserModal = ({modalId, label, selectedUsers, toggleUser}) => {
    const [filters, setFilters] = useState({ keyword: "", page: 1 });
    const [keyword, setKeyword] = useState("");
    const [users, setUsers] = useState([]);

    useEffect(() => {
        fetchUsers(filters.keyword, (filters.page - 1) * 10, 10).then((result) => setUsers(result));
    }, [filters]);

    const handleSearch = () => { setFilters({...filters, keyword: keyword}) };

    return (
    <>
        <DefaultLargeModal modalId={modalId} label={label}>
        {/* <DefaultModal modalId={modalId} label={label}> */}
            
            <div className="relative p-4">
                <div className="">
                    <div className="flex flex-col mx-5 justify-center space-y-5 items-center">
                        <div className="flex flex-row justify-center space-x-5 mb-5 items-center">
                            <TextInput name="search-keyword" label="Запрос" value={keyword} onChange={(e) => setKeyword(e)} />
                            <Button label="Поиск" onClick={handleSearch} />
                        </div>
                        <Pagination number={filters.page} onPageChange={(n) => setFilters({...filters, page: n})}/>
                    </div>
                    <div className="justify-center text-center my-5">
                        {users && users.map((user) => <User key={user.id} user={user} checked={(user.id in selectedUsers)} toggle={toggleUser}/>)}
                    </div>
                </div>
            </div>
        </DefaultLargeModal>
    </>
    );
};

export default SelectUserModal;
