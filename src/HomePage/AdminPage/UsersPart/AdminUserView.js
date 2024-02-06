import "./AdminUserView.css";
import UserImage from "../../../Images/UserImage1.png";
import UserDataWindow from "./UserDataWindow";
import { useState } from "react";

export default function AdminUserView(props) {
    const [userData, setUserData] = useState({
        selected: false,
        value: ""
    });

    let todaysDate = new Date();
    let year = todaysDate.getFullYear();
    let yearsOld = year - new Date(props.birthday).getFullYear();

    let creationDate = new Date(props.acountCreation);
    let creationDay = creationDate.getDay() < 10 ? "0" + creationDate.getDay() : creationDate.getDay();
    let creationMonth = creationDate.getMonth() < 10 ? "0" + creationDate.getMonth() : creationDate.getMonth();
    let creationDateView = `${creationDay}:${creationMonth}:${creationDate.getFullYear()}`;

    function showUser(value) {
        setUserData(oldData => {
            return { ...oldData, selected: true, value: value };
        })
    }

    return (
        <div className="side-user-div">
            <div className="user-img-div">
                <img src={UserImage} />
            </div>
            <div>
                <p>Created : {creationDateView}</p>
                <p>Age : {yearsOld}</p>
            </div>
            <div>
                <button onClick={() => { showUser("comments") }}>View comments written by {props.username}</button>
                <button onClick={() => { showUser("purchases") }}>View products purchased by {props.username}</button>
            </div>
            <button>Ban {props.username}</button>

            {userData.selected && props.hasOwnProperty(userData.value) && (
                <UserDataWindow data={props[userData.value]} />
            )}
        </div>
    );
}