import { useEffect, useState } from "react";
import ProductBox from "./ProductBox";
import "./ProductLine.css";
import { useParams } from "react-router-dom";

export default function ProductLine(props) {
    const [allProducts, setAllProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    const { requestType } = useParams();

    console.log(requestType);

    useEffect(() => {
        async function insideUseEffect() {
            let data = {
                productType: props.productType,
                requestType: requestType
            }
            try {
                let response = await fetch(`http://localhost:5000/product/?data=${encodeURIComponent(JSON.stringify(data))}`, {
                    method: "GET",
                    headers: {
                        'Authorization': `${localStorage.getItem('token')}`,
                        'Content-type': 'application/json'
                    }
                });

                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }

                let responseData = await response.json();
                if (props.isAuthorized) {
                    responseData.sort((a, b) => {
                        return a.available - b.available;
                    })
                }
                console.log(responseData);
                setAllProducts(responseData);
                console.log("Tyka");
                setLoading(false);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }
        if (props.searchRegex === "" || props.searchRegex === null) {
            insideUseEffect();
        }
        else {
            searchBarHandler();
        }
    }, [props.productType, props.searchRegex, requestType]);

    function deleteHandler(deletedObject) {
        setAllProducts(oldData => oldData.filter(indexValue => indexValue.id !== deletedObject))
    }

    //Filters the products by their brand written in the search input field on Header component
    function searchBarHandler() {
        if (props.searchRegex !== "") {
            const regex = new RegExp(props.searchRegex, 'i');

            const fileteredProducts = allProducts.filter(product => {
                return regex.test(product.brand);
            });

            setAllProducts(fileteredProducts);
        }
    }

    return (
        <div className="product-line">
            {loading ? (
                <p>Loading...</p>
            ) : (
                allProducts.length !== 0 && allProducts.map(indexValue => {
                    return <ProductBox data={indexValue} key={indexValue.id} isAuthorized={props.isAuthorized} onDelete={props.isAuthorized ? deleteHandler : null} />;
                })
            )}
        </div>
    );
}