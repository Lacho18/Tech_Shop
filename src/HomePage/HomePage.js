import { Link } from 'react-router-dom';
import Logo from "../Images/Logo1.png";
import "./HomePageStyle.css";
import "./LoginComponents/FormStyle.css";

export default function HomePage(props) {
    let styleObject = {
        webkitBackgroundClip : "text" ,
        backgroundClip : "text", 
        color: "transparent"
    }

    return (
        <div className='main-div'>
            <img id='logoImage' src={Logo} />
            <p id='title'>Welcome to <span>Cyber shop</span></p>
            <nav className='nav-item'>
                <ul>
                    <li style={{background : "linear-gradient(to right, #ffcc00, #ff9933)", ...styleObject}}>
                        <Link to="/shop/*">Go to the shop</Link>
                    </li>
                    <li style={{background : "linear-gradient(to right, #e62e00, #b32400)", ...styleObject}}>
                        <Link to="/login">Log in</Link>
                    </li>
                    <li style={{background : "linear-gradient(to right, #6699ff, #4d4dff)", ...styleObject}}>
                    <Link to="/create">Sign up</Link>
                    </li>
                </ul>
            </nav>
           
        </div>
    );
}