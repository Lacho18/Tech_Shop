import "./BanUserWindow.css";

export default function BanUserWindow(props) {

    return (
        <div className="user-data-main">
            <p style={{fontSize:"2vmax"}}>Banning user : <span style={{color:"red"}}>{props.userName}</span></p>
            <div className="text-area-ban">
                <label htmlFor="ban">Give reason for banning {props.userName} <span style={{fontStyle:"italic"}}>(required field)(This message can only be seen from {props.userName})</span></label>
                <br></br>
                <textarea name="ban" placeholder="Banning reason...."></textarea>
            </div>
            <div className="buttons-ban">
                <button style={{backgroundColor:"red"}}>Commit banning</button>
                <button style={{backgroundColor:"green"}}>Cancel</button>
            </div>
        </div>
    );
}