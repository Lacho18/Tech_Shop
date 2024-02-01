import { useState } from 'react';
import { Routes, Route, Link, useParams } from 'react-router-dom';

export default function ProductsRoute() {
    let { type } = useParams();

    async function buttonsClickHandler() {
        //Takes the products from the database with the given type
    
        let response = await fetch(`http://localhost:5000/product/${encodeURIComponent(type)}`, { 
            method: "GET",
            headers: {
                'Content-type': 'application/json'
            }
        });
    
        let responseData = await response.json();
    
        console.log(responseData);
    }

    return (
        <div className='admin-products'>
            <nav>
                <Link to="laptop" onClick={buttonsClickHandler}>Laptops</Link>
                <Link to="computer">Computers</Link>
                <Link to="phone">Phones</Link>
                <Link to="tablet">Tablets</Link>
                <Link to="mause">Mouses</Link>
                <Link to="monitor">Monitors</Link>
                <Link to="disk">Disks</Link>
                <Link to="TV">TV</Link>
                <Link to="cameras">Cameras</Link>
            </nav>

            <Link className='add-product' to="/admin/create">Add product +</Link>
        </div>
    );
}

