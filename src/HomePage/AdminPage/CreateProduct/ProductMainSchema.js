import { useState } from "react";
import structure from "./MainStructure";
import "./ProductMainSchema.css";

//let array = [];

export default function ProductMainCreation({type, array, pushToArray}) {
    let newProduct = {
        type: type,
        brand: "",
        model: "",
        titleImage: "",
        images: [],
        characteristics: {},
        warranty: 0,
        comments: [],
        price: 0,
        available: 0,
        buyed: 0
    }

    //Change the specific field of the object that has been writen in the input field
    /*function setDataForProduct(key, event) {
        event.preventDefault();

        setProduct(prevValue => {
            if (prevValue.hasOwnProperty(key)) {
                return { ...prevValue, [key]: event.target.value };
            } else {
                console.error(`Invalid property name: ${key}`);
                return prevValue;
            }
        })

        console.log(product);
    }*/

    function addElement(value) {
        pushToArray(value);
    }

    function setProductWithoutState(key, event) {
        event.preventDefault();

        if(newProduct.hasOwnProperty(key)) {
            newProduct = {...newProduct, [key] : event.target.value}
        }
        else {
            //console.error(`Invalid property name: ${key}`);
            newProduct.characteristics = {...newProduct.characteristics, [key] : event.target.value}
        }

        //console.log(newProduct);
    }

    //Sends the product data to the server
    async function submitHandler(e) {
        console.log("BEFORE THE FETCH");
        console.log(newProduct);
        e.preventDefault();

        
        let response = await fetch("http://localhost:5000/product/null", {
            method: "POST",
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(newProduct)
        });

        let responseData = await response.json();
    }

    //Set all input fields and labels with a given json structure
    function SetMainFields(givenStructure) {
        if (array.length == 0) {
            for (const key in givenStructure) {
                let fieldType = typeof structure[key];
                let input = <div>
                    <label htmlFor={key}>Enter product <span style={{ color: "#990000", fontWeight: "bold" }}>{key}</span></label>
                    <input type={fieldType === "string" ? "text" : "number"} name={key} placeholder={`Type ${key}`} onChange={(event) => { setProductWithoutState(key, event) }} />
                </div>

                //array.push(input);
                addElement(input);
            }
        }
        else {
            //if (!isEditing) {
                //array.length = 0;
           // }
        }
    }

        //Get the structure for the characteristics by given type of the product
        async function GetCharacteristicFunction(productType) {
            let response = await fetch(`http://localhost:5000/characteristics/${productType}`, {
                method: "GET",
                headers: {
                    'Content-type': 'application/json'
                }
            });

            let responseData = await response.json();
            newProduct.characteristics = responseData;
            return responseData;
        }

        async function SetFields() {
            let characteristicsStructure = await GetCharacteristicFunction(type);
            let newStructure = { ...structure, ...characteristicsStructure };
            SetMainFields(newStructure);
        }

        console.log(newProduct);
        console.log(array);
        SetFields();
        console.log(array);

        //GetCharacteristicFunction(type);

        return (
            <div className="product-inputs">
                <form className="product-form" onSubmit={submitHandler}>
                    {array.map(indexValue => indexValue)}
                    <input type="submit" />
                </form>
            </div>
        );
    }