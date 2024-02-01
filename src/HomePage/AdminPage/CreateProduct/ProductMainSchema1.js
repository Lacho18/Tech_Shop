import "./ProductMainSchema.css";

export default function ProductMainSchema(props) {
    let fieldType = "string";

    function setProductWithoutState(key, event, type) {
        let value = event.target.value;
        props.onInputChange(key, value, type);
    }

    if(props.fieldType !== "object") {
        return (
            <div>
                <label htmlFor={props.value}>Enter product <span style={{ color: "#990000", fontWeight: "bold" }}>{props.value}</span></label>
                <input className={props.classNameForInput} type={props.fieldType === "number" ? "number" : "text"} 
                name={props.value} placeholder={`Type ${props.value}`} onChange={(event) => { setProductWithoutState(props.value, event, props.fieldType) }} />
            </div>
        )
    }
    else {
        return (
            <div>
                <label htmlFor={props.value}>Enter product <span style={{ color: "#990000", fontWeight: "bold" }}>{props.value}</span></label>
                <textarea name={props.value} rows="4" cols="50" placeholder={`Please insert multiple ${props.value} components here. To separate them place , between them`}
                onChange={(event) => { setProductWithoutState(props.value, event, props.type) }}></textarea>
            </div>
        )
    }
}