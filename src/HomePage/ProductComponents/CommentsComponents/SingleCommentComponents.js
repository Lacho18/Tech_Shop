import { useState } from "react";
import "./SingleCommentComponents.css";

export default function SingleCommentComponents(props) {
    const [redactArea, setRedactArea] = useState(false);
    //const [currentComment, setCurrentComment] = useState(props.comment);

    //A function that calculates how much time have passed since the comment was committed or updated
    function calculateTime() {
        let date = new Date(props.timestamp);
        let currentDate = new Date();

        let result = {};

        let difference = currentDate - date;
        let differenceInDays = difference / (1000 * 60 * 60 * 24);

        //In case of less than a day
        if (differenceInDays < 1) {
            let differenseInHours = differenceInDays * 24;
            if (differenseInHours < 1) {
                return {
                    type: "minutes",
                    time: Math.floor(differenseInHours * 60)
                };
            }
            else {
                return {
                    type: "hours",
                    time: Math.floor(differenceInDays * 24)
                };
            }
        }
        //In case of more than a month
        else if (differenceInDays > 30) {
            let differenceInMonths = Math.floor(differenceInDays / 30);
            //in case of more than years
            if (differenceInMonths >= 12) {
                return {
                    type: "year",
                    time: Math.floor(differenceInMonths / 12)
                };
            }
            else {
                return {
                    type: "months",
                    time: Math.floor(differenceInMonths)
                };
            }
        }
        //in case of less than 1 month and more than 24 hours
        else {
            return {
                type: "days",
                time: Math.floor(differenceInDays)
            };
        }
    }

    async function deleteCommentHandler() {
        const response = await fetch(`http://localhost:5000/comments/?id=${encodeURIComponent(props.commentID)}`, {
            method: "DELETE",
            headers: {
                'Content-type': 'application/json'
            }
        });

        const responseData = await response.json();
        props.onDeletedCommentar(props.commentID);
    }

    async function redactComment() {
        setRedactArea(true);
    }

    async function updateComment() {
        let correctedComment = document.getElementById("correctComment");
        console.log(correctedComment.value);
        if(correctedComment.value !== "" && correctedComment.value !== props.comment) {
            let data = {
                commentID : props.commentID,
                correctedComment : correctedComment.value
            }
            let response = await fetch(`http://localhost:5000/comments/?data=${encodeURIComponent(JSON.stringify(data))}`, {
            method: "PUT",
            headers: {
                'Content-type': 'application/json'
            }
        });
        }
    }

    let time = calculateTime();

    return (
        <div className="comment-main-div">
            {((props.idOfCurrentUser && props.userID === props.idOfCurrentUser) || props.isAuthorized) &&
            <div className="">
                    <button onClick={redactComment}>🖊</button>
                    <button onClick={deleteCommentHandler}>🗑</button>
                </div>
            }
            <p id="commentatorName">{props.username}   <span> before {time.time} {time.type}</span></p>
            <div className="comment-div">
                <p>{props.comment}</p>
            </div>
            {props.isAuthorized && <button onClick={deleteCommentHandler}>X</button>}

            {redactArea && 
                <div>
                    <p>Correct your comment : </p>
                    <textarea id="correctComment">{props.comment}</textarea>
                    <button onClick={updateComment}>Confirm</button>
                    <button onClick={() => {redactArea && setRedactArea(false)}}>Cancel</button>
                </div>
            }
        </div>
    );
}