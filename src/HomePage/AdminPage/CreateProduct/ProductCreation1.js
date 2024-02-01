import { useState } from "react";
import "./ProductMainSchema.css";
import structure from "./MainStructure";
import ProductMainSchema from "./ProductMainSchema1";

const keys = Object.keys(structure);

export default function ProductCreation() {
    const options = ["Laptop", "Computer", "Phone", "Tablet", "Mouse", "Monitor", "Disk", "TV", "Camera"];
    const [characteristicsKeys, setCharacteristicsKeys] = useState([]);
    const [errorMessage, setErrorMessage] = useState("");
    const [product, setProduct] = useState({
        type: "",
        brand: "",
        model: "",
        titleImage: "",
        images: [],
        characteristics: {},
        warranty: -1,
        comments: [],
        price: -1,
        available: -1,
        buyed: 0
    })

    async function onOptionSelection(option) {
        let characteristicsStructure = await getCharacteristicsStructure(option);
        let charKeys = Object.keys(characteristicsStructure);
        setCharacteristicsKeys(charKeys);
        setProduct(prevProduct => {
            return { ...prevProduct, type: option };
        });
        setProduct(oldProduct => {
            oldProduct.characteristics = {};
            return oldProduct;
        })
    }

    async function getCharacteristicsStructure(type) {
        let response = await fetch(`http://localhost:5000/characteristics/${type}`, {
            method: "GET",
            headers: {
                'Content-type': 'application/json'
            }
        });

        let responseData = await response.json();
        return responseData;
    }

    function changeProductField(key, value, type) {
        if (type === "number") {
            value = Number(value);
            if(value === 0) {
                value = -1;
            }
        }
        if (product.hasOwnProperty(key)) {
            setProduct(prevProduct => {
                if (typeof prevProduct[key] !== "object") {
                    return { ...prevProduct, [key]: value }
                }
                else {
                    const updatedArray = [value];
                    return { ...prevProduct, [key]: updatedArray };
                }
            })
        }
        else {
            setProduct(prevProduct => {
                prevProduct.characteristics = { ...prevProduct.characteristics, [key]: value };
                return prevProduct;
            })
        }

        //console.log(product);
    }

    async function productSubmition(e) {
        e.preventDefault();

        let response = await fetch("http://localhost:5000/product/null", {
            method: "POST",
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(product)
        });

        let responseData = await response.json();
        console.log(responseData.message);
        setErrorMessage(responseData.message);

        if (responseData.status) {
            //Cleares the input fields after submiting the data
            let allFields = document.getElementsByClassName("input-field");
            for (let i = 0; i < allFields.length; i++) {
                console.log("ALOOOOO");
                allFields[i].value = "";
                console.log(allFields[i].value);
            }

            //cleares the product object, so it can be used again
            setProduct(oldProduct => {
                oldProduct.characteristics = {};
                return oldProduct;
            })
        }

        setTimeout(() => {
            setErrorMessage("");
        }, 5000)
    }

    return (
        <div style={{ backgroundColor: "#ff9900" }}>
            {options.map(indexValue => {
                return <button className="create-buttons" key={indexValue} onClick={() => { onOptionSelection(indexValue) }}>{indexValue}</button>
            })}

            <div className="product-inputs">
                <form className="product-form" onSubmit={productSubmition}>
                    {keys.map((key) => {
                        return <ProductMainSchema onInputChange={changeProductField} classNameForInput="input-field" key={key} value={key} fieldType={typeof structure[key]} />
                    })}

                    <p style={{ marginTop: "4%", fontSize: "1.4vmax" }}>Product characteristics :</p>
                    {characteristicsKeys.length !== 0 && characteristicsKeys.map((key) => {
                        return <ProductMainSchema onInputChange={changeProductField} classNameForInput="input-field" key={key} value={key} />
                    })}
                    <input type="submit" value="Add product" />
                </form>
            </div>
            {errorMessage !== "" && <p className="error-message">{errorMessage}</p>}
        </div>
    );
}