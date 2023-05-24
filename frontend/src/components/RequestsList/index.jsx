
import Request from "./request";

const RequestsList = ({requests, fetch, accept, decline}) => {
    return (
    <>
        <ul className="lg:mx-32">
            {requests && requests.map((request) => <Request /> )}
        </ul>
    </>
    );
};

export default RequestsList;
