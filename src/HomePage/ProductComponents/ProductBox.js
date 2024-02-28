import { useNavigate } from "react-router-dom";
import "./ProductBox.css";

export default function ProductBox(props) {
    const navigate = useNavigate();
    let allKeys = Object.keys(props.data.characteristics);

    function goToProductPage() {
        navigate(`/shop/${props.data.type}s/${null}/${props.data.id}/${props.data.type}`);
    }

    async function deleteProductHandler(type, id) {
        if (props.isAuthorized) {
            const response = await fetch(`http://localhost:5000/product/?data=${encodeURIComponent(JSON.stringify({ type: type, id: id }))}`, {
                method: "DELETE",
                headers: {
                    'Content-type': 'application/json'
                }
            });

            const responseData = await response.json();
            props.onDelete(id);
        }
    }

    return (
        <div className={props.data.available > 0 ? "main-box" : "out-of-stock"} onClick={!props.isAuthorized && props.data.available > 0 ? goToProductPage : null}>
            {props.data.available <= 0 && <p style={{color : "black", fontWeight : "bold"}}>Out of stock!</p>}
            <div className="image-box">
                <img src={props.data.titleImage} />
            </div>
            <div className="title-box">
                <p>{`${props.data.type} ${props.data.brand} ${props.data.model}`}</p>
            </div>
            <div className="characteristics-box">
                <ul>
                    {allKeys.map(indexValue => {
                        return <li key={indexValue}><span style={{ color: "black" }}>{`${indexValue} : ${props.data.characteristics[indexValue]}`}</span></li>
                    })}
                </ul>
            </div>
            {props.isAuthorized && <button onClick={() => { deleteProductHandler(props.data.type, props.data.id) }}>Remove product</button>}
        </div>
    );
}