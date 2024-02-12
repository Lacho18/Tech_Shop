import UserImage from "../Images/UserImage1.png";
import Cart from "../Images/Cart1.png";
import Menu from "../Images/menuIcon1.jpg";
import MenuFilter from "./ShopPage/MenuFilter";
import SideMenu from "./ShopPage/SideMenu";
import UserMenu from "./ShopPage/UserMenu";
import componentsOfSideMenu from "./ShopPage/sideBarComponents";
import "./HeaderStyle.css";
import { useState } from "react";
import { Link } from "react-router-dom";

let sideMenuBody = [];

export default function Header(props) {
    const [showMenu, setShowMenu] = useState(false);
    const [sideMenu, setSideMenu] = useState("");
    const [userMenu, setUserMenu] = useState(false);

    //Shows the menu buttons or hide them if they are already shown. It is called by clicking the menu button of the Header component
    function menuClickHandler() {
        setShowMenu(prevValue => !prevValue);
    }

    //Shows the help menus with different options of requests
    function showHelpMenus(menuType) {
        setSideMenu(menuType)
        sideMenuSeter(menuType)
    }

    //Set the text for the side menu. Uses a data written on a document with name sideBarComponent
    function sideMenuSeter(kind) {
        if (sideMenuBody.length > 0) {
            sideMenuBody.length = 0;
        }
        switch (kind) {
            case "Computers and laptops":
                sideMenuBody.push(componentsOfSideMenu[0]);
                sideMenuBody.push(componentsOfSideMenu[1]);
                break;
            case "Phones and tablets":
                sideMenuBody.push(componentsOfSideMenu[2]);
                sideMenuBody.push(componentsOfSideMenu[3]);
                break;
            case "Components and peripherals":
                sideMenuBody.push(componentsOfSideMenu[4]);
                sideMenuBody.push(componentsOfSideMenu[5]);
                sideMenuBody.push(componentsOfSideMenu[6]);
                break;
            case "TV, photo and video":
                sideMenuBody.push(componentsOfSideMenu[7]);
                sideMenuBody.push(componentsOfSideMenu[8]);
                break;

            default: console.log("Error");
                break;
        }
    }
   
    //Hides the side menu after a selection
    function onSelectedLink() {
        setShowMenu(false);
        setSideMenu("");
    }

    function setUserToNull() {
        props.setUserToNull();
    }

    console.log(userMenu);

    return(
        <div className="header-div">
            <button onClick={menuClickHandler}><img src={Menu} /></button>
            <input type="text" placeholder="🔍 Search" />
            {props.box !== undefined ? props.box.length !== 0 ? <div className="products-on-card"><p>{props.box.length}</p></div> : <div></div> : <div></div>}
            {props.isLogged ? <button className="card-button"><Link to="/card"><img src={Cart} /></Link></button> 
                            : <button className="card-button"><img src={Cart} /></button>}
            {props.isLogged && <p style={{fontSize : "1.4vmax"}}>Welcome {props.username}</p>}
            <img src={UserImage} onClick={() => {props.username ? setUserMenu(oldDate => !oldDate) : console.log("No user")}}/>

            {showMenu && <MenuFilter showMenus={showHelpMenus}/>}
            {sideMenu && <SideMenu onSelection={onSelectedLink} sideMenu={sideMenuBody}/>}
            {userMenu && <UserMenu user={props} setUserToNull={setUserToNull}/>}
        </div>
    );
}
