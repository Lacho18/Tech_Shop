import "./SingleCommentComponents.css";

export default function SingleCommentComponents(props) {

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
        console.log(responseData.message);
        props.onDeletedCommentar(props.commentID);
    }

    let time = calculateTime();

    return (
        <div className="comment-main-div">
            <p id="commentatorName">{props.username}   <span> before {time.time} {time.type}</span></p>
            <div className="comment-div">
                <p>{props.comment}</p>
            </div>
            {props.isAuthorized && <button onClick={deleteCommentHandler}>X</button>}
        </div>
    );
}