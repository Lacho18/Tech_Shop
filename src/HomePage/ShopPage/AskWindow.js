import { useNavigate } from "react-router-dom";

export default function AskWindow(props) {
    let navigate = useNavigate();
    //deletes the user account from the database
    async function deletingAccount() {
        let data = {
            user : props.userID,
            bannedFrom : null,
            reason : null
        };

        let response = await fetch("http://localhost:5000/login/?banData=" +encodeURIComponent(JSON.stringify(data)), {
            method : "DELETE",
            headers : {
                'Content-type': 'application/json'
            }
        });
        
        let responseData = await response.json();
        console.log(responseData.message);

        navigate("/");
    }

    return (
        <div className="question-div">
            <p>{props.question}</p>
            <button onClick={deletingAccount}>Yes</button>
            <button onClick={() => {props.closeWindow()}}>No</button>
        </div>
    );
}