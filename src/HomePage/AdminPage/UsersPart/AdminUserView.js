import "./AdminUserView.css";
import UserImage from "../../../Images/UserImage1.png";

export default function AdminUserView(props) {
    let todaysDate = new Date();
    let year = todaysDate.getFullYear();
    let yearsOld = year - new Date(props.birthday).getFullYear();

    let creationDate = new Date(props.acountCreation);
    let creationDay = creationDate.getDate() < 10 ? "0" + creationDate.getDate() : creationDate.getDate();
    let creationMonth = creationDate.getMonth() < 10 ? "0" + creationDate.getMonth() : creationDate.getMonth();
    let creationDateView = `${creationDay}:${creationMonth}:${creationDate.getFullYear()}`;

    function showUser(value) {
        let data = {
            user : props.id,
            selected : true,
            value : value
        }
        props.showData(data);
    }

    function banUserHandler() {
        props.banHandler(props.id);
    }

    return (
        <div className="side-user-div" style={{ border: props.role === "admin" ? "4px solid #ff9933" : "" }}>
            <div className="user-img-div">
                <img src={UserImage} />
            </div>
            <div className="info-1">
                <p>Username : {props.username}</p>
                <p>Role : {props.role}</p>
            </div>
            <div className="info-2">
                <p>Created : {creationDateView}</p>
                <p>Age : {yearsOld}</p>
            </div>
            <div className="show-buttons">
                <button onClick={() => { showUser("comments") }}>View comments written by {props.username}</button>
                <button onClick={() => { showUser("purchases") }}>View products purchased by {props.username}</button>
            </div>
            {props.role === "user" && <button id="banButton" onClick={banUserHandler}>Ban {props.username}</button>}

        </div>
    );
}