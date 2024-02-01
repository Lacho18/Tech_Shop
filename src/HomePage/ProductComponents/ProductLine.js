import { useEffect, useState } from "react";
import ProductBox from "./ProductBox";
import "./ProductLine.css";

export default function ProductLine(props) {
    const [allProducts, setAllProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function insideUseEffect() {
            try {
                let response = await fetch(`http://localhost:5000/product/${props.productType}`, {
                    method: "GET",
                    headers: {
                        'Content-type': 'application/json'
                    }
                });

                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }

                let responseData = await response.json();
                setAllProducts(responseData);
                setLoading(false);  
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }

        insideUseEffect();
    }, [props.productType]);

    return (
        <div className="product-line">
            {loading ? (
                <p>Loading...</p>
            ) : (
                allProducts.length !== 0 && allProducts.map(indexValue => {
                    return <ProductBox data={indexValue} key={indexValue.id} />;
                })
            )}
        </div>
    );
}