import { useEffect, useState } from "react";

export default function CurrentComments(props) {

    /*
        Make a component to visualize the comments with the date and user username on it
    */

    return(
        <div>
            {props.comments.map(indexValue => {
                return <p>{indexValue.comment}</p>
            })}
        </div>
    );
}