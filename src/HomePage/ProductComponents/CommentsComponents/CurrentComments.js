import { useEffect, useState } from "react";
import SingleCommentComponents from "./SingleCommentComponents";

export default function CurrentComments(props) {
    const [comments, setComments] = useState(props.comments);
    const [loading, IsLoading] = useState(true);

    useEffect(() => {
        let allUsersIds = [];
        props.comments.forEach(element => {
            allUsersIds.push(element.userID);
        });
        let arrayAsString = allUsersIds.join(",");

        async function getComments() {
            //gets the usernames from the users that have written a specific comments
            const response = await fetch("http://localhost:5000/comments/?usersID=" + encodeURIComponent(arrayAsString), {
                method: "GET",
                headers: {
                    'Content-type': 'application/json'
                }
            });
            const responseData = await response.json();

            //adds the username field to the comment object
            setComments(oldComments => {
                let newComments = oldComments.map(commentObject => {
                    for (let i = 0; i < responseData.length; i++) {
                        if (responseData[i].id === commentObject.userID) {
                            return { ...commentObject, username: responseData[i].username }
                        }
                    }
                })

                return newComments;
            })
        }

        getComments();
        IsLoading(false);
    }, []);

    if (loading) {
        return (
            <div>Loading....</div>
        );
    }
    else {
        if (comments.length === 0) {
            return (
                <div className="new-comment">
                    <p style={{textAlign: "center"}}>No comments on this product.</p>
                </div>
            );
        }
        else {
            return (
                <div className="new-comment" style={{ overflow: "scroll" }}>
                    {comments.map(indexValue => {
                        return <SingleCommentComponents {...indexValue} />
                    })}

                    {comments.length > 10 && <button id="seeMoreButton">See more</button>}
                </div>
            );
        }

    }
}