import { useEffect, useState } from 'react';

export default function UsersRoute() {
    const [allUsers, setAllUsers] = useState([]);

    useEffect(() => {
        async function getAllUsers() {
            const response = await fetch("http://localhost:5000/allUsers", {
                method: "GET",
                headers: {
                    'Content-type': 'application/json'
                }
            });

            const responseData = await response.json();
            if(Array.isArray(responseData)) {
                setAllUsers(responseData);
            }
            else {
                console.log(responseData.message);
            }
        }

        getAllUsers();
    }, [])

    return(
        <div>
            UsersRoute
        </div>
    );
}