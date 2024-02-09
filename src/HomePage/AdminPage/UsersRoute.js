import { useEffect, useState } from 'react';
import AdminUserView from './UsersPart/AdminUserView';
import UserDataWindow from "./UsersPart/UserDataWindow";
import BanUserWindow from './UsersPart/BanUserWindow';

export default function UsersRoute({adminUsername}) {
    const [allUsers, setAllUsers] = useState([]);
    const [userData, setUserData] = useState({
        user : 0,
        selected: false,
        value: ""
    });
    const [banning, setBanning] = useState(0);

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

    function showData(value) {
        setUserData(value);
        console.log(userData);
    }

    function closeWindow() {
        setUserData(oldData => {
            return {...oldData, selected: false}
        })
    }

    function Banning(id) {
        setBanning(id);
    }

    function closeBanning() {
        setBanning(0);
    }

    return(
        <div style={{width : "100vw", height : "100vh",overflow : "scroll"}}>
            {allUsers.map(user => <AdminUserView {...user} showData={showData} banHandler={Banning} />)}
            {userData.selected && <UserDataWindow data={allUsers[userData.user - 1][userData.value]} type={userData.value} closeWindow={closeWindow} />}
            {banning !== 0 && <BanUserWindow userID={allUsers[banning - 1].id} userName={allUsers[banning - 1].username} adminUsername={adminUsername} onClose={closeBanning}/>}
        </div>
    );
}