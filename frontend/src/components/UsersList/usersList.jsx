
import User from "./user";

const UserList = ({users, fetch}) => {
    return (
    <>
        <ul className="lg:mx-32">
            {users && users.map((user) => <User key={user.id} user={user}/> )}
            {!users && <div> Ничего не найдено T_T </div>}
        </ul>
    </>
    );
};

export default UserList;
