import React from "react";
import "./MenuFilter.css";

const MenuFilter = ((props) => {

    function mouseOverHandler(value) {
        props.showMenus(value);
    }

    return(
        <div className="menu-filter">
            <ul>
                <li onMouseOver={() => {mouseOverHandler("Computers and laptops")}}>
                    💻 Computers and laptops
                </li>
                <li onMouseOver={() => {mouseOverHandler("Phones and tablets")}}>
                    📱 Phones and tablets
                </li>
                <li onMouseOver={() => {mouseOverHandler("Components and peripherals")}}>
                    🖱 Components and peripherals
                </li>
                <li onMouseOver={() => {mouseOverHandler("TV, photo and video")}}>
                    📺 TV, photo and video
                </li>
            </ul>
        </div>
    );
});

export default MenuFilter;