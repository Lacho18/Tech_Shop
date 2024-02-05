import { useState } from "react";
import Header from "../Header";
import MenuFilter from "./MenuFilter";
import SideMenu from "./SideMenu";
import componentsOfSideMenu from "./sideBarComponents";
import SpecificProduct from "../ProductComponents/SpecificProduct";
import { Routes, Route } from 'react-router-dom';
import ProductLine from "../ProductComponents/ProductLine";
import "./ShopPage.css";

let sideMenuBody = [];
const allTypes = ["laptop", "computer", "phone", "tablet", "monitor", "disk", "TV", "camera"];

export default function ShopPage(props) {
    //sends selected product to App.js
    function toCard(product) {
        props.addToCard(product);
    }

    return (
        <div className="shop-main-div">

            <Routes>
                {allTypes.map(type => {
                    return (
                        <Route path={`${type}s`}>
                            <Route index element={<ProductLine productType={type} />} />
                            <Route path=":id/:type" element={<SpecificProduct {...props.userInfo} toCard={toCard} />} />
                        </Route>
                    );
                })}
            </Routes>

            <header className="header" style={{ position: "fixed" }}>
                <Header {...props.userInfo} />
            </header>
            <main className="main">
                {/*showMenu && <MenuFilter showMenus={showHelpMenus} />*/}
                {/*sideMenu && <SideMenu onSelection={onSelectedLink} sideMenu={sideMenuBody} />*/}
            </main>
            <footer className="footer">

            </footer>
        </div>
    );
}