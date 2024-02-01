import BoxSide from "./BoxSide";
import "./Box.css";
import { useNavigate } from "react-router-dom";

export default function Box(props) {
    const navigate = useNavigate();
    let totalSum;
    let uniceElement = 0;

    //Function that calculates the whole sum from every product in the cart
    function getTotalSum() {
        let result = 0;
        props.box.forEach(element => {
            result += element.price;
        });

        return result;
    }

    totalSum = getTotalSum();

    //Function that removes everything from the box and navigates to the payment page
    function purchaseHandler() {
        props.onPurchase();
        navigate('/purchase');
    }

    //Function that sends to App.js the specific index of the component that should be removed from the box
    function onSingleRemove(id) {
        props.onPurchase(id);
    }

    //Checks weather there is anything in the box or not
    if(!props.box !== undefined && props.box.length === 0) {
        return(
            <div className="empty-box">
                <p>Your box is empty!</p>
            </div>
        );
    }
    return(
        <div className="card-main-div">
            <p>Hello {props.username}</p>
            <p>Here are your selected products : </p>
            <div className="card-components">
                {props.box.map(element => {
                    uniceElement++;
                    return <BoxSide key={uniceElement} unice={uniceElement} {...element} onRemoving={onSingleRemove} />
                })}
            </div>
            <p>Total sum : <span style={{color : "#ff6600"}}>{totalSum}</span></p>
            <button className="purchase-button" onClick={purchaseHandler}>Purchase product{props.box.length > 1 && "s"}</button>
        </div>
    );
}