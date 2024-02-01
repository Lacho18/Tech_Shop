import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import "./SpecProductComponents/SpecificProduct.css";
import "./SpecProductComponents/SpecificProductRightSide.css";
import ImageSlider from "./SpecProductComponents/ImageSlider";
import CurrencyComponent from "./SpecProductComponents/CurrencyComponent";
import CharComponent from "./SpecProductComponents/CharcComponent";

export default function SpecificProduct(props) {
    const navigate = useNavigate();
    const { id, type } = useParams();
    const [productData, setProductData] = useState({});
    const [loading, setLoading] = useState(false);
    //const [currentValute, setCurrentValute] = useState({});

    useEffect(() => {
        async function getSpecificProduct() {
            const response = await fetch(`http://localhost:5000/product/single/${id}/${type}`, {
                method: "GET",
                headers: {
                    'Content-type': 'application/json'
                }
            });

            let responseData = await response.json();
            console.log(responseData);
            setProductData(responseData);
            setLoading(true);
        }

        getSpecificProduct();
    }, [])

    //sends selected product to ShopPage.js
    function addToCard() {
        props.toCard(productData);
    }

    function createComment() {
        navigate(`/comments/${productData.type}/${productData.id}/new`);
    }

    function seeComments() {
        navigate(`/comments/${productData.type}/${productData.id}/current}`);
    }

    console.log(props);

    if (!loading) {
        return (<div>Loading......</div>);
    }
    else {
        return (
            <div className="spec-product-main-div">
                <div className="left-side">
                    <p className="spec-product-title">{`${productData.brand} ${productData.model}`}</p>
                    <button id="goBackButton">➞</button>
                    <div className="image-slider">
                        <ImageSlider images={productData.images} />
                    </div>
                    <div className="currency-div">
                        <CurrencyComponent price={productData.price} allCurrencies={productData.currency} />
                    </div>
                </div>
                <div className="right-side">
                    <CharComponent characteristics={productData.characteristics} />
                    <p id="warranty">{`Warranty : ${productData.warranty}`}</p>
                    {props.isLogged ?
                        <div className="buttons-on-product">
                            <button onClick={seeComments}>See comments</button>
                            <button onClick={createComment}>Add comments</button>
                            <button onClick={addToCard}>Add to box</button>
                        </div>
                        :
                        <div className="buttons-on-product">
                            <p style={{color: "#595959"}}>To purchase a product or add comments to it please log in <Link to="/login">here</Link></p>
                            <button onClick={seeComments}>See comments</button>
                        </div>
                    }

                </div>
            </div>
        );
    }
}