import { useNavigate } from "react-router-dom";
import UserDataWindow from "../AdminPage/UsersPart/UserDataWindow";
import AskWindow from "./AskWindow";
import "./UserMenu.css";
import { useState } from "react";

export default function UserMenu(props) {
    const [showNavigate, setShowNavigate] = useState({
        type : "",
        active : false
    });
    let [askWindow, setAskWindow] = useState(false);
    let navigate = useNavigate();

    //set the type of data that will be displayed in the UserDataWindow component and sets active to true so it can be visible
    function showData(type) {
        setShowNavigate({
            type : type,
            active : true
        })
    }

    //closes the window that appeares to show the comments of the current user or the purchases
    function closeWindow() {
        setShowNavigate({
            type : "",
            active : false
        })
    }

    //set the user object declayred in App.js to null, which represents the log out of the user and navigates back to the main page
    function logOut() {
        props.setUserToNull();
        navigate('/');
    }

    function showQuestionWindow() {
        setAskWindow(oldData => !oldData);
    }

    return(
        <div className="user-menus-div">
            <button onClick={() => {navigate("/card");}}>View your box</button>
            <button onClick={() => showData("comments")}>See your comments</button>
            <button onClick={() => showData("purchases")}>See purchased items</button>
            <button onClick={logOut}>Log out</button>
            <button onClick={showQuestionWindow}>Delete account</button>

            {showNavigate.active && <UserDataWindow data={props.user[showNavigate.type]} closeWindow={closeWindow}/>}
            {askWindow && <AskWindow userID={props.user.id} question="Are you sure you want to delete your account" closeWindow={() => {setAskWindow(false)}}/>}
        </div>
    );
}