
import { useEffect } from "react";
import Request from "./request";

const RequestsList = ({requests, fetch, accept, decline}) => {

    useEffect(() => {
        if(!requests || requests.length == 0) fetch(0, 10);
    }, []);

    return (
    <>
        <ul className="lg:mx-32">
            {requests && requests.map((request) => <Request request={request}  accept={accept} decline={decline}/> )}
        </ul>
    </>
    );
};

export default RequestsList;
