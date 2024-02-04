import { useState } from "react";
import "./NewComment.css";

export default function NewComment(props) {
    const [newComment, setNewComment] = useState("");
    const [responseMessage, setResponseMessage] = useState("");

    function newCommentFunction(e) {
        setNewComment(e.target.value);
        console.log(newComment);
    }

    async function commentCommitment() {
        if(newComment !== "") {
            const response = await fetch("http://localhost:5000/comments", {
                method: "POST",
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify({
                    userID: props.userID,
                    productType : props.type,
                    productID: props.id,
                    productType : props.type,
                    comment: newComment
                })
            })

            const responseData = await response.json();

            setResponseMessage(responseData.message);
            setNewComment("");
            props.onCommitment();

            setTimeout(() => {
                setResponseMessage("");
            }, 2000)
        }
    }


    return (
        <div className="new-comment">
            <div className="product-part">
                <div className="img-div">
                    <img src={props.titleImage} />
                </div>
                <div className="data-div">
                    <p>Product type : {props.type}</p>
                    <p>Brand : {props.brand}</p>
                    <p>Model : {props.model}</p>
                    <p>Warranty : {props.warranty}</p>
                    <p>Price : {props.price}</p>
                </div>
            </div>

            {responseMessage !== "" && <p id="responseMessage">{responseMessage}</p>}
            <textarea className="comments-area" value={newComment} placeholder="Type your comment here..." onChange={newCommentFunction}>

            </textarea>
            <button id="commitComment" onClick={commentCommitment}>Commit your comment</button>
        </div >
    );
}