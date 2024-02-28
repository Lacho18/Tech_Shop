import { useState } from "react";
import ProductMainCreation from "./ProductMainSchema";
import "./ProductMainSchema.css";

export default function ProductCreation() {
    const [selectedOption, setSelectedOption] = useState({
        selected : false,
        option: ""
    });
    const options = ["Laptop", "Computer", "Phone", "Tablet", "Mouse", "Monitor", "Disk", "TV", "Camera"];

    const [array, setArray] = useState([]);

    function onOptionSelection(option) {
        if(array.length !== 0) {
            setArray(oldArray => {
                oldArray.length = 0;
                return oldArray;
            })
        }
        setSelectedOption({
            selected : true,
            option : option
        });
    } 

    function pushToArray(component) {
        setArray(oldArray => {
            oldArray.push(component);
            return oldArray;
        })
    }

    return(
        <div style={{backgroundColor : "#ff9900"}}>
            {options.map(indexValue => {
                return <button className="create-buttons" key={indexValue} onClick={() => {onOptionSelection(indexValue)}}>{indexValue}</button>
            })}

            {selectedOption.selected && <ProductMainCreation array={array} pushToArray={pushToArray} type={selectedOption.option}/>}
        </div>
    );
}