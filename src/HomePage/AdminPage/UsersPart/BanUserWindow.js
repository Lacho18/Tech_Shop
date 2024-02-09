import { useState } from "react";
import "./BanUserWindow.css";

export default function BanUserWindow(props) {
    const [reason, setReason] = useState("");
    const [responseMessage, setResponseMessage] = useState("");

    async function banUser() {
        let data = {
            user : props.userID,
            bannedFrom : props.adminUsername,
            reason : reason
        };
        let response = await fetch("http://localhost:5000/login/?banData=" +encodeURIComponent(JSON.stringify(data)), {
            method : "DELETE",
            headers : {
                'Content-type': 'application/json'
            }
        });

        let responseData = await response.json();
        setResponseMessage(responseData.responseMessage);

        setTimeout(() => {
            props.onClose();
        }, 2000);
    }

    function closeWindow() {
        props.onClose();
    }

    return (
        <div className="user-data-main">
            <p style={{fontSize:"2vmax"}}>Banning user : <span style={{color:"red"}}>{props.userName}</span></p>
            <div className="text-area-ban">
                <label htmlFor="ban">Give reason for banning {props.userName} <span style={{fontStyle:"italic"}}>(required field)(This message can only be seen from {props.userName})</span></label>
                <br></br>
                <textarea onChange={(e) => {setReason(e.target.value)}} name="ban" placeholder="Banning reason...."></textarea>
                {responseMessage !== "" && <p>{responseMessage}</p>}
            </div>
            <div className="buttons-ban">
                <button onClick={banUser} style={{backgroundColor:"red"}} disabled={reason === ""}>Commit banning</button>
                <button onClick={closeWindow} style={{backgroundColor:"green"}}>Cancel</button>
            </div>
        </div>
    );
}