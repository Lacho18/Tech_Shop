import "./UserDataWindow.css";

export default function UserDataWindow(props) {
    function onClose() {
        props.closeWindow();
    }

    return(
        <div className="user-data-main">
            <p id="title">Total {props.type} : {props.data.length}</p>
            {props.data.length !== 0 ? <div className="user-data">
                {props.data.map((indexValue, index) => {
                    return <li key={index}>{props.type === "comments" ? `${index} : ${indexValue.comment}` : `${index} : ${indexValue.type} ${indexValue.brand} ${indexValue.model}`}</li>
                })}
            </div> : <div className="user-data">Nothing here</div>}
            <button id="closeButton" onClick={onClose}>X</button>
        </div>
    );
}