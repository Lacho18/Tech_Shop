import "./BannedView.css";

export default function BannedView(props) {

    async function confirmFunction() {
        let response = await fetch("http://localhost:5000/login/?id=" +encodeURIComponent(props.info.id), {
            method : "PUT",
            headers : {
                'Content-type': 'application/json'
            }
        });

        props.onClose();
    }

    return(
        <div className="banned-view">
            <p>{props.info.dateOfBanning}</p>
            <div>
                <p>Hello <span>{props.info.username}</span></p>
                <p>You have been banned from the side from administrator <span>{props.info.from}</span></p>
                <p>The administrator <span>{props.info.from}</span> gave this reason : </p>
                <p id="reason">{props.info.reason}</p>
                <p>Your account no longer exists</p>
            </div>
            <button onClick={confirmFunction} id="confirmButton">Confirm</button>
        </div>
    );
}