import { Link, NavLink, Route, Routes, useNavigate, useParams } from "react-router-dom";
import NewComment from "./NewComment";
import CurrentComments from "./CurrentComments";
import "./MainComments.css";
import { useEffect, useState } from "react";

export default function MainCommentsComponent(props) {
    const navigate = useNavigate();
    const { type, id, value } = useParams();
    const [urlData, setUrlData] = useState({
        type: "",
        id: 0,
        value: ""
    });
    const [product, setProduct] = useState({});
    const [productChanged, setProductChanged] = useState(true);

    if ((type && id) && (urlData.id === 0)) {
        setUrlData(oldData => {
            return { ...oldData, type: type, id: id, value: value };
        })
    }

    useEffect(() => {
        console.log("Kashkaval");
        async function getProduct() {
            const response = await fetch(`http://localhost:5000/product/single/${urlData.id}/${urlData.type}`, {
                method: "GET",
                headers: {
                    'Content-type': 'application/json'
                }
            });

            let responseData = await response.json();
            setProduct(responseData);

            if(urlData.value === "new") {
                navigate("/comments/:type/:id/:value/newComment");
            }
            else {
                navigate("/comments/:type/:id/:value/currentComments");
            }
        }

        getProduct();
    }, [productChanged]);

    function onProductChange() {
        setProductChanged(oldData => !oldData);
    }

    function backToProduct() {
        navigate(`/shop/${product.type}s/${product.id}/${product.type}`);
    }

    return (
        <div>
            <nav className="nav-comments">
                <button id="backButton" onClick={backToProduct}>{"<--"}</button>
                <div>
                    {props.isLogged ? <NavLink to="/comments/:type/:id/:value/newComment" className="nav-link">Type new comment</NavLink>
                                    : <p style={{color: "gray"}}>To add comments log in <Link to="/login">here</Link></p>}
                    
                </div>
                <div style={{right : "0"}}>
                    <NavLink to="/comments/:type/:id/:value/currentComments" className="nav-link">See current comments</NavLink>
                </div>
            </nav>
            <Routes>
                <Route path="/newComment" element={<NewComment {...product} userID={props.id} onCommitment={onProductChange}/>} />
                <Route path="/currentComments" element={<CurrentComments user={props.username} comments={product.comments} productType={product.type} productID={product.id} />} />
            </Routes>
        </div>
    );
}