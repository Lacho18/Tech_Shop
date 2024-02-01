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

export default function ShopPage(props) {
    //const [showMenu, setShowMenu] = useState(false);
    //const [sideMenu, setSideMenu] = useState("");

    //props.userInfo is a object containing the logged user information
    //console.log(props.userInfo);

    //sends selected product to App.js
    function toCard(product) {
        props.addToCard(product);
    }

    return (
        <div className="shop-main-div">

            <Routes>
                <Route path="/laptops">
                    <Route index element={<ProductLine productType="laptop"/>} />
                    <Route path=":id/:type" element={<SpecificProduct {...props.userInfo} toCard={toCard}/>} />
                </Route>
                <Route path="/computers" element={<ProductLine productType="computer"/>} />
                <Route path="/phones" element={<ProductLine productType="phone"/>} />
                <Route path="/tablets" element={<ProductLine productType="tablets"/>} />
                <Route path="/mouses" element={<ProductLine productType="mouse"/>} />
                <Route path="/monitors" element={<ProductLine productType="monitor"/>} />
                <Route path="/disks" element={<ProductLine productType="disk"/>} />
                <Route path="/TV" element={<ProductLine productType="TV"/>} />
                <Route path="/cameras" element={<ProductLine productType="camera"/>} />   
            </Routes>

            <header className="header" style={{position: "fixed"}}>
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