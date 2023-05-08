
import User from "../User";

const UserList = ({users}) => {
    return (
    <>
        <ul className="lg:mx-32">
            {users && users.map((user) => <User user={user}/> )}
        </ul>
    </>
    );
};

export default UserList;
