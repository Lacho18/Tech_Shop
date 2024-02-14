import { useEffect, useState } from "react";
import SingleCommentComponents from "./SingleCommentComponents";

export default function CurrentComments(props) {
    const [comments, setComments] = useState([]);
    const [loading, IsLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1); 
    const [allPages, setAllPages] = useState([]);

    useEffect(() => {
        async function getComments() {
            const response = await fetch(`http://localhost:5000/comments/?pageNumber=${encodeURIComponent(JSON.stringify({ productType: props.productType, productID: props.productID, page: currentPage, isAuthorized : props.isAuthorized }))}`, {
                method: "GET",
                headers: {
                    'Content-type': 'application/json'
                }
            });
            const responseData = await response.json();
            if (responseData.allComments) {
                let pages = Math.floor((responseData.allComments / 10) + 1);
                let everyPage = [];
                for(let i = 1; i <= pages; i++) {
                    everyPage.push(i);
                }
                setAllPages(everyPage);
            }

            setComments(oldComments => responseData.comments); 
        }

        getComments();
        IsLoading(false);
    }, [currentPage]);

    function updatePage(value) {
        setCurrentPage(value);
    }

    function deleteHandler(id) {
        //setComments(oldData => oldData.filter(indexValue => indexValue.commentID !== id));
        setComments(oldData => {
            let newData = oldData.filter(indexValue => indexValue.commentID !== id);
            newData = newData.map(indexValue => {
                if(indexValue.commentID > id) {
                    return {...indexValue, commentID : indexValue.commentID - 1};
                }
                else {
                    return {...indexValue};
                }
            });
            return newData;
        });
    }

    if (loading) {
        return (
            <div>Loading....</div>
        );
    }
    else {
        if (comments.length === 0) {
            return (
                <div className="new-comment">
                    <p style={{ textAlign: "center" }}>No comments on this product.</p>
                </div>
            );
        }
        else {
        return (
            <div className="new-comment" style={{ overflow: "scroll" }}>
                {comments.map(indexValue => {
                    return <SingleCommentComponents {...indexValue} isAuthorized={props.isAuthorized} 
                                                    idOfCurrentUser={props.currentUserID} productID={props.productID} productType={props.productType} 
                                                    onDeletedCommentar={deleteHandler}/>
                })}
                
                {allPages.length !== 0 && allPages.map(indexValue => <button onClick={() => updatePage(indexValue)} value={indexValue}>{indexValue}</button>)}
            </div>
        );
        }

    }
}