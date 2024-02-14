import { useEffect, useState } from "react";
import ProductBox from "./ProductBox";
import "./ProductLine.css";

export default function ProductLine(props) {
    const [allProducts, setAllProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function insideUseEffect() {
            try {
                let response = await fetch(`http://localhost:5000/product/?type=${encodeURIComponent(props.productType)}`, {
                    method: "GET",
                    headers: {
                        'Content-type': 'application/json'
                    }
                });

                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }

                let responseData = await response.json();
                if(props.isAuthorized) {
                    responseData.sort((a, b) => {
                        return a.available - b.available;
                    })
                }
                setAllProducts(responseData);
                setLoading(false);  
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }
        if(props.searchRegex === "") {
            insideUseEffect();
        }
        else {
            searchBarHandler();
        }
    }, [props.productType, props.searchRegex]);

    function deleteHandler(deletedObject) {
        setAllProducts(oldData => oldData.filter(indexValue => indexValue.id !== deletedObject))
    }

    //Filters the products by their brand written in the search input field on Header component
    function searchBarHandler() {
        console.log(props.searchRegex);
        if(props.searchRegex !== "") {
            const regex = new RegExp(props.searchRegex, 'i');

            const fileteredProducts = allProducts.filter(product => {
                return regex.test(product.brand);
            });

            setAllProducts(fileteredProducts);
        }
    }

    //searchBarHandler();

    return (
        <div className="product-line">
            {loading ? (
                <p>Loading...</p>
            ) : (
                allProducts.length !== 0 && allProducts.map(indexValue => {
                    return <ProductBox data={indexValue} key={indexValue.id} isAuthorized={props.isAuthorized}  onDelete={props.isAuthorized ? deleteHandler : null}/>;
                })
            )}
        </div>
    );
}