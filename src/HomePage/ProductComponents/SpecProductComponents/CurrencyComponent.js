import { useState } from "react";

//A component that change the price of the product by selected currency

export default function CurrencyComponent(props) {
    const [currentCurrency, setCurrentCurrency] = useState({ price: props.price, ...props.allCurrencies[0] });

    function changePrice(event) {
        let selectedPrice = event.target.value;
        let current = props.allCurrencies.find(indexValue => indexValue.currency === selectedPrice);


        setCurrentCurrency(oldObject => {
            let newPrice = props.price / current.coefficient;
            let newObject = {
                price: newPrice.toFixed(2),
                currency: current.currency,
                symbol: current.symbol,
                coefficient: current.coefficient
            };
            return newObject;
        })
    }

    return (
        <div className="price-div">
            <p>Price: <span>{currentCurrency.price} {currentCurrency.symbol}</span></p>
            <select value={currentCurrency.currency} onChange={changePrice}>
                {props.allCurrencies.map(indexValue => {
                    return <option key={indexValue.currency}>{indexValue.currency}</option>
                })}
            </select>
        </div>
    );
}